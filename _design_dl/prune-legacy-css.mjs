// One-off tool: prune dead rules from src/legacy.css.
// Keeps any rule that references a class actually used in src/**/*.tsx,
// plus global rules (no class selector) and @keyframes/@font-face/:root.
// Drops rules whose every class selector is unused (the migrated-away page layouts).
import postcss from "postcss";
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const CSS = join(ROOT, "src/legacy.css");

// --- collect all class tokens referenced in TSX ---
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (p.endsWith(".tsx") || p.endsWith(".ts")) out.push(p);
  }
  return out;
}
const tsxSource = walk(join(ROOT, "src"))
  .map((f) => readFileSync(f, "utf8"))
  .join("\n");

// classes defined in legacy.css
const cssText = readFileSync(CSS, "utf8");
const definedClasses = new Set(
  [...cssText.matchAll(/\.(-?[_a-zA-Z][_a-zA-Z0-9-]*)/g)].map((m) => m[1]),
);

// which of those are referenced in TSX (whole-token match)
const liveClasses = new Set();
for (const cls of definedClasses) {
  const re = new RegExp(`(^|[^a-zA-Z0-9_-])${cls}([^a-zA-Z0-9_-]|$)`);
  if (re.test(tsxSource)) liveClasses.add(cls);
}

// structural class tokens = classes that gate matching, i.e. NOT inside :not(...).
// Tokens inside :not() don't make a part depend on a dead element, so we ignore them.
function structuralTokens(part) {
  const withoutNot = part.replace(/:not\([^)]*\)/g, " ");
  return [...withoutNot.matchAll(/\.(-?[_a-zA-Z][_a-zA-Z0-9-]*)/g)].map((m) => m[1]);
}

// A selector part is live if it has no structural class tokens (element/global rule)
// or every structural class token is referenced in TSX.
function partIsLive(part) {
  const tokens = structuralTokens(part);
  if (tokens.length === 0) return true;
  return tokens.every((t) => liveClasses.has(t));
}

// Keep a rule if any comma-part is live; rewrite selector to just the live parts.
function pruneRule(rule) {
  const parts = rule.selector.split(",").map((p) => p.trim()).filter(Boolean);
  const liveParts = parts.filter(partIsLive);
  if (liveParts.length === 0) return false; // drop whole rule
  if (liveParts.length !== parts.length) rule.selector = liveParts.join(",\n");
  return true;
}

const root = postcss.parse(cssText);
let dropped = 0;
let kept = 0;

function handleRule(rule) {
  if (pruneRule(rule)) kept++;
  else {
    rule.remove();
    dropped++;
  }
}

root.walkAtRules((at) => {
  if (at.name === "media" || at.name === "supports") {
    at.walkRules((r) => {
      if (r.parent === at) handleRule(r);
    });
    if (at.nodes && at.nodes.length === 0) at.remove();
  }
  // keep @keyframes / @font-face / :root / others untouched
});

root.walkRules((rule) => {
  const pName = rule.parent && rule.parent.type === "atrule" ? rule.parent.name : null;
  if (pName === "media" || pName === "supports" || pName === "keyframes") return;
  handleRule(rule);
});

const out = root.toString();
writeFileSync(join(ROOT, "_design_dl/legacy.pruned.css"), out, "utf8");

console.log("live classes referenced in TSX:", liveClasses.size, "/", definedClasses.size);
console.log("top-level rules kept:", kept, " dropped:", dropped);
console.log("bytes:", cssText.length, "->", out.length);
console.log("lines:", cssText.split("\n").length, "->", out.split("\n").length);

// verify every live class still has at least one rule in output
const missing = [...liveClasses].filter(
  (c) => !new RegExp(`\\.${c.replace(/[-]/g, "\\-")}(?![_a-zA-Z0-9-])`).test(out),
);
console.log("live classes MISSING from pruned output:", missing.length ? missing.join(", ") : "(none)");
