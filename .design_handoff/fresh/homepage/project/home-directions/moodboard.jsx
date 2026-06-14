// Moodboard — research panel + animation toolkit
// Sized: 1280 × 1500. Static design frame.
const { useState } = React;

const REFS = [
  {
    cat: "Cinematic dark",
    note: "Editorial cockpit / pinned-scroll cinematic",
    items: [
      { name: "Apple — AirPods Max", what: "Pinned scroll micro-stories. Type set against full-bleed product. One signature scroll moment, not ten.", steal: "Quiet authority. Letterspacing + scale shifts as anchors." },
      { name: "Linear — releases", what: "Dark editorial type. Numbers and timestamps in mono as structural ornament.", steal: "Mono labels carry the hacker tone, sans-body carries the read." },
      { name: "Vercel — Ship 2024", what: "Section-per-payload, ambient color shifts behind content, no decorative chrome under copy.", steal: "Color-per-page ambient glow — exactly what the brief calls for." },
    ],
  },
  {
    cat: "HUD / sci-fi UI",
    note: "Telemetry, brackets, corners, readouts",
    items: [
      { name: "Bungie — Destiny patch notes", what: "Heads-up corner brackets, glyph clusters, mono callouts.", steal: "Brackets as structure, not decoration. Used only at section edges." },
      { name: "BLDG WLF / Active Theory", what: "Stage-lit hero with telemetry rail. Bold horizontal scroll moments.", steal: "Horizontal pin as the ONE scroll signature — proposed in Direction B." },
      { name: "FWA gallery — sci-fi UI", what: "Sparse density. Black space treated as a material, not absence.", steal: "Negative space is the asset. Don't fill it with chrome." },
    ],
  },
  {
    cat: "Developer / terminal craft",
    note: "Hacker tone without the costume",
    items: [
      { name: "Railway / Resend / Vercel docs", what: "Terminal-window cards, mono command lines as headlines.", steal: "Command-line as section header in Direction B." },
      { name: "react-bits.dev — text effects", what: "Decrypt, glitch, shiny, type-on. Used at the right place once.", steal: "Decrypt for stat numbers, type-on for boot sequence. Restraint." },
      { name: "21st.dev — shadcn blocks", what: "Standard nav, footer, form patterns done well so we don't rebuild basics.", steal: "Use directly for nav, footer, form fields in Join page." },
    ],
  },
];

const PRINCIPLES = [
  { n: "01", title: "Black is the asset", body: "Treat negative space as a material. No texture beneath body text — never the grid mesh, never the diagonal streaks. Ambient glow lives behind chrome, not under copy." },
  { n: "02", title: "One signature scroll per page", body: "Direction A: cockpit pulls back to expose a wider HUD. Direction B: pinned horizontal scroll through programs. Everywhere else, motion is small and fast." },
  { n: "03", title: "Mono is a label, not a paragraph", body: "Eyebrows, timestamps, metadata, button text — mono. Headings — Rajdhani condensed caps. Body copy — clean sans, IBM Plex. Every pair passes WCAG AA." },
  { n: "04", title: "Color = navigation", body: "Cyan + red are the brand axis. Each page gets ONE accent glow: Team red, Events blue, Projects magenta, Challenges amber, Community cyan, Join red. Glow sits behind/around content, never under." },
  { n: "05", title: "One primary CTA per page", body: "Demote the rest to ghost or text. Kill the repeated 'Ready to build…' blocks — there's exactly one Join CTA in the whole site." },
  { n: "06", title: "Real content shapes", body: "Team = member cards. Events = dated timeline. Projects = stack/status cards. Challenges = leaderboard. Index lists where a card grid would be filler." },
];

const TOOLKIT = [
  {
    lib: "GSAP + ScrollTrigger",
    tag: "anno-gsap",
    use: "Scroll-driven sequences, pinning, parallax, scrubbed timelines.",
    where: "Cockpit canvas image-sequence (both directions). Horizontal pinned program scroller (B). Hero text scrub.",
    rule: "Reserve for the ONE signature moment per page. Everything else uses Motion."
  },
  {
    lib: "Motion (motion.dev)",
    tag: "anno-motion",
    use: "whileInView reveals, layout transitions, hover/gesture micro-interactions, page transitions.",
    where: "Section reveals, card lifts, stat counters, button hover, nav transitions, route changes.",
    rule: "Must respect prefers-reduced-motion (useReducedMotion). 250–500ms ease-out, no infinite loops on content."
  },
  {
    lib: "React Bits",
    tag: "anno-bits",
    use: "Drop-in animated text/background effects.",
    where: "DecryptedText for headline reveal & stat numbers. ShinyText sparingly on the primary CTA. Particles only on Join hero.",
    rule: "Existing project already wraps these. Pick one effect per page; never stack."
  },
  {
    lib: "21st.dev / shadcn",
    tag: "anno-css",
    use: "Standard patterns — nav, form, footer, tabs, dialogs.",
    where: "Sticky nav shell, footer columns, Join application form, Events filter tabs.",
    rule: "Use blocks as scaffolding; restyle to the cyberpunk tokens. Don't ship default shadcn dark."
  },
];

function Moodboard() {
  return (
    <div className="mock-frame" style={{ padding: "48px 56px", overflow: "hidden" }}>
      <div className="mock-bg"></div>
      <div className="mock-stage" style={{ position: "relative", display: "grid", gap: 36 }}>
        {/* Header strip */}
        <header style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: 24, paddingBottom: 24, borderBottom: "1px solid var(--line)" }}>
          <div>
            <div className="dc-eyebrow" style={{ marginBottom: 14 }}>STEP 01 · RESEARCH & DIRECTION</div>
            <h1 style={{ fontSize: 60, lineHeight: 1.02, textWrap: "balance" }}>
              Dev Cell Club <span style={{ color: "var(--cyan)" }}>/</span> redesign brief
            </h1>
            <p style={{ marginTop: 16, maxWidth: 760, fontSize: 15, lineHeight: 1.7 }}>
              Cyberpunk identity stays — cockpit hero, dark palette, condensed caps, mono accents.
              The brief is to keep the soul and lose the busy chrome under copy, fix contrast, give every page a real content shape, and propose <em style={{ color: "var(--cyan-soft)", fontStyle: "normal" }}>two</em> Home directions for review.
            </p>
          </div>
          <div style={{ display: "grid", gap: 6, justifyItems: "end" }}>
            <span className="dc-pill"><span className="dot"></span> MOODBOARD &nbsp;·&nbsp; STACK &nbsp;·&nbsp; PRINCIPLES</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.18em" }}>06.13.2026 · TRANSMISSION 0001</span>
          </div>
        </header>

        {/* References */}
        <section>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18 }}>
            <span className="dc-eyebrow" style={{ color: "var(--pink)" }}>01 · REFERENCES</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.16em" }}>WHAT TO STEAL, WHAT TO SKIP</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {REFS.map((c) => (
              <div key={c.cat} style={{ border: "1px solid var(--line)", background: "var(--panel)", padding: 18 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--cyan-soft)", textTransform: "uppercase" }}>{c.cat}</div>
                <h3 style={{ fontSize: 18, marginTop: 6, color: "var(--ink)", letterSpacing: "-0.01em" }}>{c.note}</h3>
                <ul style={{ listStyle: "none", margin: "14px 0 0", padding: 0, display: "grid", gap: 12 }}>
                  {c.items.map((it) => (
                    <li key={it.name} style={{ borderTop: "1px solid var(--line-soft)", paddingTop: 12 }}>
                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                        <span style={{ fontFamily: "var(--display)", fontSize: 15, fontWeight: 600, letterSpacing: "0.02em", lineHeight: 1.25, color: "var(--ink)" }}>{it.name}</span>
                      </div>
                      <p style={{ marginTop: 8, fontSize: 12.5, lineHeight: 1.55, color: "var(--dim)" }}>{it.what}</p>
                      <p style={{ marginTop: 6, fontSize: 11.5, lineHeight: 1.55, color: "var(--cyan-soft)", fontFamily: "var(--mono)", letterSpacing: "0.02em" }}>→ {it.steal}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18 }}>
            <span className="dc-eyebrow" style={{ color: "var(--pink)" }}>02 · DESIGN PRINCIPLES</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.16em" }}>BOTH DIRECTIONS OBEY THESE</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {PRINCIPLES.map((p) => (
              <div key={p.n} style={{ border: "1px solid var(--line)", background: "rgba(6,14,21,0.4)", padding: "16px 18px", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 16, width: 28, height: 2, background: "var(--cyan)", boxShadow: "0 0 8px rgba(139,234,255,0.6)" }}></div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--cyan-soft)", letterSpacing: "0.2em" }}>{p.n}</span>
                  <h3 style={{ fontSize: 17, color: "var(--ink)", letterSpacing: "0.01em" }}>{p.title}</h3>
                </div>
                <p style={{ marginTop: 8, fontSize: 12.5, lineHeight: 1.65, color: "var(--dim)" }}>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Animation toolkit */}
        <section>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18 }}>
            <span className="dc-eyebrow" style={{ color: "var(--pink)" }}>03 · ANIMATION TOOLKIT</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: "0.16em" }}>NOTHING IN THE DESIGN THAT CAN'T BE BUILT WITH THESE</span>
          </div>
          <div style={{ border: "1px solid var(--line)", background: "rgba(6,14,21,0.4)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1.4fr 1fr", padding: "10px 18px", borderBottom: "1px solid var(--line)", fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)" }}>
              <span>Library</span><span>Use for</span><span>Where in this design</span><span>Rule</span>
            </div>
            {TOOLKIT.map((t, i) => (
              <div key={t.lib} style={{ display: "grid", gridTemplateColumns: "180px 1fr 1.4fr 1fr", padding: "14px 18px", borderBottom: i === TOOLKIT.length - 1 ? "0" : "1px solid var(--line-soft)", alignItems: "start" }}>
                <span className={`anno ${t.tag}`} style={{ position: "static", alignSelf: "start", display: "inline-flex" }}>{t.lib}</span>
                <span style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--dim)" }}>{t.use}</span>
                <span style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--ink)" }}>{t.where}</span>
                <span style={{ fontSize: 12, lineHeight: 1.55, color: "var(--muted)", fontFamily: "var(--mono)" }}>{t.rule}</span>
              </div>
            ))}
          </div>
        </section>

        {/* The two directions in one sentence each */}
        <section>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ border: "1px solid var(--line)", padding: 22, background: "linear-gradient(135deg, rgba(8,30,46,0.5), rgba(5,11,18,0.8))", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 22, width: 60, height: 2, background: "var(--cyan)", boxShadow: "0 0 10px rgba(139,234,255,0.7)" }}></div>
              <div className="dc-eyebrow">DIRECTION A</div>
              <h2 style={{ fontSize: 40, marginTop: 8, lineHeight: 0.95 }}>Signal <span style={{ color: "var(--cyan)" }}>—</span> editorial cockpit</h2>
              <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7 }}>
                Refines Home v2. The cockpit becomes a quiet cinematic opener — full-bleed, condensed title, corner brackets. Scroll <em style={{ color: "var(--cyan-soft)", fontStyle: "normal" }}>pulls the camera back</em> to expose a wider HUD diagram of what the club ships. Below it: editorial split about-section, three program cards, an index list, one Join CTA. Sparse, breathing, premium.
              </p>
              <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                <span className="anno anno-gsap" style={{ position: "static" }}>GSAP · pinned cockpit pullback</span>
                <span className="anno anno-motion" style={{ position: "static" }}>Motion · whileInView reveals</span>
                <span className="anno anno-bits" style={{ position: "static" }}>React Bits · DecryptedText stats</span>
              </div>
            </div>
            <div style={{ border: "1px solid var(--line-red)", padding: 22, background: "linear-gradient(135deg, rgba(40,8,18,0.5), rgba(5,11,18,0.8))", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 22, width: 60, height: 2, background: "var(--red)", boxShadow: "0 0 10px rgba(255,59,107,0.7)" }}></div>
              <div className="dc-eyebrow" style={{ color: "var(--pink)" }}>DIRECTION B</div>
              <h2 style={{ fontSize: 40, marginTop: 8, lineHeight: 0.95 }}>Telemetry <span style={{ color: "var(--red)" }}>—</span> mission console</h2>
              <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7 }}>
                A bolder departure. Cockpit sits inside a mission-control chrome: telemetry rail left, comms rail right, headline as heads-up display. Boot sequence types in. Signature scroll moment is a <em style={{ color: "var(--pink)", fontStyle: "normal" }}>horizontal pin</em> through 5 programs like flipping console channels. Denser, mono-led, terminal-flavored.
              </p>
              <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                <span className="anno anno-gsap" style={{ position: "static" }}>GSAP · horizontal pin scroll</span>
                <span className="anno anno-motion" style={{ position: "static" }}>Motion · type-on boot, counters</span>
                <span className="anno anno-bits" style={{ position: "static" }}>React Bits · ShinyText, Particles</span>
              </div>
            </div>
          </div>
        </section>

        {/* footer line */}
        <footer style={{ display: "flex", justifyContent: "space-between", paddingTop: 18, borderTop: "1px solid var(--line)", fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          <span>DEV CELL CLUB · HOME REDESIGN</span>
          <span>STEP 01 / 03 · AWAITING PICK</span>
        </footer>
      </div>
    </div>
  );
}

window.Moodboard = Moodboard;
