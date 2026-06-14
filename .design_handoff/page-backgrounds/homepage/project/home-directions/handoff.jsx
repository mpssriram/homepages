// Handoff sheet — animation annotations per direction, per component.
// 1280 × 1100, static panel.

const HANDOFF_A = [
  { region: "Nav (sticky pill)", lib: "Motion", note: "useScroll → background/border opacity tween at threshold 60px. Active link underline = layoutId shared across links." },
  { region: "Hero — EXISTING cockpit", lib: "GSAP (existing)", note: "Preserve current CockpitCanvasSequence (ScrollTrigger pin + scrub). Do NOT layer competing HTML chrome on top. CTA + scroll cue fade in on sequence end via Motion `useInView` of the hero's `<canvas>`." },
  { region: "Transition strip · stats", lib: "Motion", note: "When hero exits viewport, run a 600ms ease-out stagger to fade the strip up. Counter numerals via useMotionValue + useTransform (300ms ramp), not React Bits — keeps the strip quiet." },
  { region: "Section eyebrows", lib: "Motion", note: "`whileInView` opacity+translateY 14→0, 350ms, ease-out. Single shot per session." },
  { region: "About headline", lib: "Motion", note: "Split heading by word, stagger 60ms, mask-clip reveal. ~700ms total. once: true." },
  { region: "Program cards", lib: "Motion", note: "Container `whileInView` stagger 120ms; each card `whileHover` translateY -3px + border tint 200ms." },
  { region: "Recent work feature", lib: "Motion", note: "Image parallax via `useScroll` on its container — translateY ±20px max. Hover lifts the badge row only." },
  { region: "Ways-in list rows", lib: "Motion", note: "`whileHover` padding-left 0→18px + background-position sweep; 200ms ease-out. AnimatePresence on nothing — these are static rows." },
  { region: "Join CTA button", lib: "React Bits", note: "ShinyText effect on the label only. Disable if prefers-reduced-motion." },
  { region: "Page background glow", lib: "Motion", note: "Use IntersectionObserver per section → animate CSS vars --glow-h / --glow-a on body. Per page accent color (Home = red/cyan)." },
];

const HANDOFF_B = [
  { region: "Top utility strip", lib: "Motion / CSS", note: "LED pulse via CSS `@keyframes pulse` (no JS). Time/uplink count via React state + small interval — keeps it feeling live." },
  { region: "Hero — EXISTING cockpit", lib: "GSAP (existing)", note: "Same: preserve CockpitCanvasSequence. After scrub completes, Motion stagger types in the BOOT 0001 lines bottom-left (char by char, 25ms/ch). Instrument readout right ticks in (counter ramp via Motion useMotionValue)." },
  { region: "Status HUD bar", lib: "Motion", note: "Cells fade-up `whileInView` 80ms stagger. Numeric values animated with useMotionValue → useTransform, 600ms ease." },
  { region: "Terminal block (About)", lib: "Motion + CSS", note: "Caret blink: CSS `@keyframes blink 1.2s steps(2,start) infinite`. The `$ whoami` lines type in via Motion staggered char fade (once: true)." },
  { region: "Programs — HORIZONTAL PIN ★", lib: "GSAP ScrollTrigger", note: "Pin the section for ~5x viewport height. tween x: -(scrollWidth - viewport) with scrub: 1. Channel index counter updates via onUpdate callback. The progress bar between CH 01 / CH 05 widens with the scroll. Active card border tints red." },
  { region: "Commit feed", lib: "Motion", note: "Each row `whileInView` fade-up + clip-path inset reveal — feels like git lines flushing in. 60ms stagger. Restore-on-exit disabled (once: true)." },
  { region: "Roster tiles", lib: "React Bits Magnet + Motion", note: "Tiles use React Bits' Magnet at low strength (8px). On hover, current focus + handle slide in over the initials with backdrop-blur." },
  { region: "Join form", lib: "Motion + 21st.dev", note: "Form scaffolded from 21st.dev shadcn form block, re-tokened. Field focus ring via Motion `whileFocus` border-color + box-shadow. Caret in name field is CSS blink." },
  { region: "Join section bg", lib: "React Bits Particles", note: "Sparse red particles, low count (≤60), only in this section. Pause when not in view (IntersectionObserver). Disable on prefers-reduced-motion." },
  { region: "Footer status", lib: "CSS", note: "LED pulse only — no JS." },
];

const GLOBAL_RULES = [
  "Respect `prefers-reduced-motion`: Motion exposes useReducedMotion(); use it to disable all entrance animations + scroll-linked motion. Cockpit sequence is the one exception — substitute a static last-frame poster.",
  "Once-per-session: every `whileInView` uses `once: true`. Re-running reveals on every scroll-back is noise.",
  "GSAP ScrollTrigger lives in ONE place per page (the hero or the signature). Don't sprinkle pins across sections.",
  "No infinite loops on body content. Allowed loops: LED pulse, caret blink, ambient backdrop shifts (≥6s).",
  "Color tokens are the source of truth (shared.css). Per-page accent shifts the `--glow-*` vars only.",
  "Every animation has a 200–600ms budget. If something feels slow, it's broken, not 'cinematic'.",
];

function Handoff() {
  return (
    <div className="mock-frame" style={{ padding: "44px 56px", overflow: "hidden" }}>
      <div className="mock-bg"></div>
      <div className="mock-stage" style={{ display: "grid", gap: 26 }}>
        <header style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: 24, paddingBottom: 20, borderBottom: "1px solid var(--line)" }}>
          <div>
            <div className="dc-eyebrow" style={{ marginBottom: 12 }}>STEP 03 · ANIMATION HANDOFF</div>
            <h1 style={{ fontSize: 52, lineHeight: 0.94 }}>Per-component <span style={{ color: "var(--cyan)" }}>animation notes</span>.</h1>
            <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, maxWidth: 760 }}>Every animation in both directions, mapped to a library. Engineering can implement straight from this without guessing intent.</p>
          </div>
          <span className="dc-pill"><span className="dot"></span> READY FOR CLAUDE CODE</span>
        </header>

        {/* Two columns: A and B */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {[
            { name: "DIRECTION A — SIGNAL", color: "var(--cyan)", rows: HANDOFF_A },
            { name: "DIRECTION B — TELEMETRY", color: "var(--red)", rows: HANDOFF_B },
          ].map((dir) => (
            <div key={dir.name} style={{ border: "1px solid var(--line)", background: "rgba(6,14,21,0.4)" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.22em", color: dir.color, textTransform: "uppercase" }}>{dir.name}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--muted)", letterSpacing: "0.18em" }}>{dir.rows.length} REGIONS</span>
              </div>
              {dir.rows.map((r, i) => {
                const libCls = r.lib.startsWith("GSAP") ? "anno-gsap" : r.lib.startsWith("React Bits") ? "anno-bits" : r.lib.includes("CSS") ? "anno-css" : "anno-motion";
                return (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 130px 1fr", gap: 14, padding: "14px 18px", borderBottom: i === dir.rows.length - 1 ? "0" : "1px solid var(--line-soft)", alignItems: "start" }}>
                    <span style={{ fontFamily: "var(--display)", fontSize: 14, fontWeight: 600, color: "var(--ink)", letterSpacing: "0.01em" }}>{r.region}</span>
                    <span className={`anno ${libCls}`} style={{ position: "static", alignSelf: "start" }}>{r.lib}</span>
                    <span style={{ fontSize: 12.5, lineHeight: 1.6, color: "var(--dim)" }}>{r.note}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Global rules */}
        <section>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
            <span className="dc-eyebrow" style={{ color: "var(--pink)" }}>GLOBAL · RULES OF MOTION</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.16em" }}>OBEY BEFORE SHIPPING ANYTHING</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {GLOBAL_RULES.map((r, i) => (
              <div key={i} style={{ padding: "14px 16px", border: "1px solid var(--line)", background: "rgba(6,14,21,0.4)", display: "grid", gridTemplateColumns: "24px 1fr", gap: 12, alignItems: "start" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--pink)", letterSpacing: "0.18em" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 12.5, lineHeight: 1.65, color: "var(--dim)" }}>{r}</span>
              </div>
            ))}
          </div>
        </section>

        {/* What's next */}
        <footer style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, paddingTop: 18, borderTop: "1px solid var(--line)" }}>
          <div style={{ padding: "18px 20px", border: "1px solid var(--line-soft)" }}>
            <span className="dc-eyebrow">NEXT</span>
            <h3 style={{ marginTop: 8, fontSize: 22, fontWeight: 600 }}>Pick a direction.</h3>
            <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65 }}>Once locked, I'll propagate to Community, Team, Events, Projects, Challenges, Join — desktop + mobile each — and a tokens/components sheet that drops cleanly into the existing codebase.</p>
          </div>
          <div style={{ padding: "18px 20px", border: "1px solid var(--line-soft)" }}>
            <span className="dc-eyebrow">DOES NOT GET REDESIGNED</span>
            <h3 style={{ marginTop: 8, fontSize: 22, fontWeight: 600 }}>The cockpit sequence.</h3>
            <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65 }}>Stays as-is. Both directions are designed to flow OUT of it without competing chrome.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

window.Handoff = Handoff;
