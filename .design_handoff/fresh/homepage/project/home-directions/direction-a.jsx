// Direction A — "Signal" — editorial cockpit
// Desktop: 1440 wide. Mobile: 390 wide. Heights set on the artboard.
// Each component renders the entire long-page mock.

const A_NAV = ["Home", "Community", "Projects", "Events", "Team", "Challenges"];

const A_PROGRAMS = [
  { n: "01", title: "Build Nights", desc: "Small teams, fast experiments. A room full of people who would rather ship than speculate. Every other Wednesday.", meta: "BIWEEKLY · 7PM" },
  { n: "02", title: "Open Source", desc: "Useful tools and thoughtful contributions. The kind of code review that makes everyone sharper.", meta: "ONGOING · 11 REPOS" },
  { n: "03", title: "Launchpad", desc: "A clear runway for student ideas. Prototype, test, iterate, demo — and take the next step.", meta: "COHORT 04 · OPEN" },
];

const A_WAYS = [
  { n: "01", title: "Community", desc: "Understand what Dev Cell is and how students learn here.", cta: "Read the manifesto" },
  { n: "02", title: "Team", desc: "Meet the students and mentors running sessions, reviews, and labs.", cta: "Meet the team" },
  { n: "03", title: "Events", desc: "Build nights, workshops, open labs, hackathons, speaker sessions.", cta: "See the schedule" },
  { n: "04", title: "Projects", desc: "Websites, tools, dashboards, and open-source builds by students.", cta: "Browse the shipyard" },
  { n: "05", title: "Challenges", desc: "Weekly puzzles, monthly themed builds, public leaderboard.", cta: "Try this week's" },
];

// ───────── shared bits ─────────
function Brand({ size = 12 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--mono)", fontWeight: 700, fontSize: size, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 10px rgba(139,234,255,0.9)" }}></span>
      DEV CELL
    </div>
  );
}

function CornerBrackets({ inset = 18, color = "rgba(139,234,255,0.5)", size = 22 }) {
  const arm = { position: "absolute", width: size, height: size, borderColor: color, borderStyle: "solid", borderWidth: 0 };
  return (
    <React.Fragment>
      <span style={{ ...arm, top: inset, left: inset, borderTopWidth: 1, borderLeftWidth: 1 }}></span>
      <span style={{ ...arm, top: inset, right: inset, borderTopWidth: 1, borderRightWidth: 1 }}></span>
      <span style={{ ...arm, bottom: inset, left: inset, borderBottomWidth: 1, borderLeftWidth: 1 }}></span>
      <span style={{ ...arm, bottom: inset, right: inset, borderBottomWidth: 1, borderRightWidth: 1 }}></span>
    </React.Fragment>
  );
}

function Anno({ lib = "motion", children, style }) {
  const cls = lib === "gsap" ? "anno-gsap" : lib === "bits" ? "anno-bits" : lib === "css" ? "anno-css" : "anno-motion";
  return <span className={`anno ${cls}`} style={style}>{children}</span>;
}

// ───────── DESKTOP ─────────
function DirectionA_Desktop() {
  return (
    <div className="mock-frame" style={{ fontSize: 14 }}>
      <div className="mock-bg"></div>
      <div className="mock-stage">

        {/* Sticky nav */}
        <div style={{ position: "absolute", top: 24, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 20 }}>
          <div style={{ width: 1180, height: 56, padding: "0 8px 0 22px", display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid rgba(139,234,255,0.18)", borderRadius: 16, background: "rgba(3,8,14,0.55)", backdropFilter: "blur(14px)" }}>
            <Brand size={11} />
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--mono)" }}>
              {A_NAV.map((n) => (
                <a key={n} style={{ padding: "8px 14px", fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: n === "Home" ? "#fff" : "var(--muted)", borderRadius: 10, background: n === "Home" ? "rgba(139,234,255,0.08)" : "transparent" }}>{n}</a>
              ))}
              <a style={{ marginLeft: 8, padding: "10px 18px", fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffe1e8", borderRadius: 10, background: "linear-gradient(180deg, rgba(255,59,107,0.28), rgba(255,59,107,0.12))", border: "1px solid rgba(255,59,107,0.4)" }}>Join</a>
            </div>
          </div>
        </div>

        {/* HERO — EXISTING cockpit scroll sequence (don't redesign — show end state) */}
        <section style={{ position: "relative", height: 820, overflow: "hidden" }} data-existing="cockpit-scroll-sequence">
          <Anno lib="gsap" style={{ top: 100, left: 30 }}>EXISTING · CockpitCanvasSequence · GSAP ScrollTrigger scrubs image-seq</Anno>
          <Anno lib="motion" style={{ top: 100, right: 30 }}>Motion · CTA + scroll-cue fade-in at sequence end</Anno>

          {/* Final frame of the cockpit sequence — title is part of the 3D scene */}
          <img src="assets/cockpit-01.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />

          {/* Soft floor vignette so the cockpit dashboard bleeds into the page */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, transparent 60%, rgba(2,4,7,0.55) 82%, var(--bg) 100%)" }}></div>

          {/* CTAs anchor to the bottom — fade in once the cockpit sequence settles. No competing HUD chrome (the cockpit IS the HUD). */}
          <div style={{ position: "absolute", left: 60, right: 60, bottom: 84, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
            <div style={{ display: "grid", gap: 12, maxWidth: 460 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.24em", color: "rgba(228,244,251,0.78)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 28, height: 1, background: "var(--cyan)", boxShadow: "0 0 8px rgba(139,234,255,0.6)" }}></span>
                Student developer club · IIT Mandi
              </span>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(228,244,251,0.86)", maxWidth: 420 }}>
                You've just landed. Below — what we run, what we ship, and how to get in the room.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="dc-btn dc-btn-ghost">See what we build</button>
              <button className="dc-btn dc-btn-primary">Join Dev Cell <span aria-hidden>→</span></button>
            </div>
          </div>

          {/* scroll cue */}
          <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", display: "grid", justifyItems: "center", gap: 6, fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.3em", color: "rgba(228,244,251,0.6)", textTransform: "uppercase" }}>
            <span>continue</span>
            <span style={{ width: 1, height: 22, background: "linear-gradient(180deg, var(--cyan), transparent)" }}></span>
          </div>
        </section>

        {/* TRANSITION — dashboards detach from cockpit into the page */}
        <section style={{ position: "relative", padding: "0 60px", marginTop: -1 }}>
          <Anno lib="gsap" style={{ top: 20, right: 30 }}>GSAP · cockpit dashboard readouts ease down into this strip</Anno>
          <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 32, padding: "26px 0", borderBottom: "1px solid var(--line)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", color: "var(--cyan-soft)", textTransform: "uppercase" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 8px var(--green)" }}></span>
              Transmission 0001 · live
            </span>
            <div style={{ display: "flex", gap: 36, justifyContent: "center", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase" }}>
              <span><span style={{ color: "var(--cyan)" }}>23</span> builds live</span>
              <span><span style={{ color: "var(--cyan)" }}>184</span> members</span>
              <span><span style={{ color: "var(--cyan)" }}>11</span> oss repos</span>
              <span><span style={{ color: "var(--cyan)" }}>4</span> launchpad cohorts</span>
            </div>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>
              Updated 03:42 IST
            </span>
          </div>
        </section>

        <div className="dc-seam"></div>

        {/* ABOUT — editorial split */}
        <section style={{ position: "relative", padding: "120px 60px" }}>
          <Anno lib="motion" style={{ top: 110, right: 30 }}>Motion · whileInView fade-up · stagger 60ms</Anno>
          <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 0.9fr", gap: 80, alignItems: "start" }}>
            <div>
              <span className="dc-eyebrow" style={{ color: "var(--pink)" }}>SECTION 02 · WHAT WE ARE</span>
              <h2 style={{ fontSize: 88, marginTop: 14, lineHeight: 0.94 }}>
                A small room of students who&nbsp;<span style={{ color: "var(--cyan)" }}>ship.</span>
              </h2>
            </div>
            <div style={{ display: "grid", gap: 18, paddingTop: 22 }}>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--dim)" }}>Dev Cell isn't a lecture series. It's a working club — build nights, code reviews, shared repos, and the kind of feedback that makes the next thing better than the last.</p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--dim)" }}>We pair beginners with builders, run themed sprints, ship open-source tools the campus actually uses, and send people out the other side knowing how the whole stack feels in their hands.</p>
              <div style={{ marginTop: 18, display: "grid", gap: 0, borderTop: "1px solid var(--line)" }}>
                {[
                  ["FOUNDED", "2021 · IIT Mandi"],
                  ["MEMBERS", "184 active · 312 alumni"],
                  ["SHIPPED THIS SEMESTER", "23 projects · 11 OSS releases"],
                  ["MEETS", "Wed 7PM · A2-201"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)" }}>{k}</span>
                    <span style={{ fontFamily: "var(--display)", fontSize: 16, fontWeight: 600, letterSpacing: "0.01em", color: "var(--ink)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="dc-seam"></div>

        {/* PROGRAMS — three card row */}
        <section style={{ position: "relative", padding: "120px 60px" }}>
          <Anno lib="motion" style={{ top: 110, right: 30 }}>Motion · whileHover lift -3px · whileInView stagger</Anno>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ maxWidth: 760 }}>
              <span className="dc-eyebrow" style={{ color: "var(--pink)" }}>SECTION 03 · WHAT WE RUN</span>
              <h2 style={{ fontSize: 64, marginTop: 12, lineHeight: 0.96 }}>Three programs, one loop:<br />build, review, <span style={{ color: "var(--cyan)" }}>ship again.</span></h2>
            </div>
            <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {A_PROGRAMS.map((p) => (
                <div key={p.n} style={{ position: "relative", padding: "28px 26px 30px", border: "1px solid var(--line)", background: "var(--panel)", minHeight: 280 }}>
                  <span style={{ position: "absolute", top: 0, left: 0, width: 40, height: 2, background: "var(--cyan)", boxShadow: "0 0 8px rgba(139,234,255,0.5)" }}></span>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.2em", color: "var(--cyan-soft)" }}>{p.n}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.18em", color: "var(--muted)" }}>{p.meta}</span>
                  </div>
                  <h3 style={{ marginTop: 14, fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em", textTransform: "uppercase" }}>{p.title}</h3>
                  <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.7, color: "var(--dim)" }}>{p.desc}</p>
                  <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cyan)" }}>How it runs <span>→</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="dc-seam"></div>

        {/* RECENT WORK — feature tile + 2 secondary */}
        <section style={{ position: "relative", padding: "120px 60px" }}>
          <Anno lib="motion" style={{ top: 110, right: 30 }}>Motion · whileInView parallax y</Anno>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingBottom: 18, borderBottom: "1px solid var(--line)" }}>
              <div>
                <span className="dc-eyebrow" style={{ color: "var(--pink)" }}>SECTION 04 · RECENT WORK</span>
                <h2 style={{ fontSize: 48, marginTop: 12, lineHeight: 0.96 }}>Shipped from the cell.</h2>
              </div>
              <a style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)" }}>All projects →</a>
            </div>

            <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 18 }}>
              {/* Feature */}
              <div style={{ border: "1px solid var(--line)", background: "linear-gradient(150deg, rgba(8,22,34,0.7), rgba(5,11,18,0.86))", padding: 22, position: "relative", overflow: "hidden" }}>
                <div style={{ height: 280, background: "linear-gradient(135deg, #0b2a3c, #0a1a28)", border: "1px solid var(--line-soft)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 40%, rgba(139,234,255,0.25), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,59,107,0.18), transparent 55%)" }}></div>
                  <div style={{ position: "absolute", inset: 16, border: "1px solid rgba(139,234,255,0.1)" }}></div>
                  <span style={{ position: "absolute", bottom: 16, left: 16, fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.2em" }}>PROJECT 011 · MANDIBUS.LIVE</span>
                </div>
                <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cyan-soft)", border: "1px solid var(--line)", padding: "4px 8px" }}>NEXT · TS · POSTGRES</span>
                  <span className="dc-status"><span className="led live"></span>LIVE</span>
                </div>
                <h3 style={{ marginTop: 14, fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em" }}>Mandibus — live bus tracker</h3>
                <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.75 }}>A real-time tracker for the campus shuttle, built by four students over a single Launchpad cohort. 2k+ weekly users, fully open source.</p>
                <a style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)" }}>Read the build log →</a>
              </div>

              {/* Two stacked secondary */}
              <div style={{ display: "grid", gap: 18 }}>
                {[
                  { title: "Pulse — review board", stack: "REACT · GO", status: "SHIPPED", desc: "PR review queue & lab-internal stats for the OSS program." },
                  { title: "Stagedoor — events", stack: "ASTRO · D1", status: "WIP", desc: "Self-serve event signup, replacing the spreadsheet of doom." },
                ].map((p) => (
                  <div key={p.title} style={{ border: "1px solid var(--line)", background: "var(--panel)", padding: 18, display: "grid", gridTemplateColumns: "120px 1fr", gap: 16 }}>
                    <div style={{ height: 100, background: "linear-gradient(135deg, #0d1f2b, #061018)", border: "1px solid var(--line-soft)", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle, rgba(139,234,255,0.2), transparent 60%)" }}></div>
                    </div>
                    <div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cyan-soft)" }}>{p.stack}</span>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.18em", color: p.status === "LIVE" ? "var(--red)" : p.status === "SHIPPED" ? "var(--green)" : "var(--amber)" }}>● {p.status}</span>
                      </div>
                      <h4 style={{ marginTop: 8, fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em" }}>{p.title}</h4>
                      <p style={{ marginTop: 6, fontSize: 12.5, lineHeight: 1.6, color: "var(--muted)" }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="dc-seam"></div>

        {/* WAYS IN — single index list */}
        <section style={{ position: "relative", padding: "120px 60px" }}>
          <Anno lib="motion" style={{ top: 110, right: 30 }}>Motion · whileHover · padding-left + bg sweep</Anno>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ maxWidth: 760 }}>
              <span className="dc-eyebrow" style={{ color: "var(--pink)" }}>SECTION 05 · WAYS IN</span>
              <h2 style={{ fontSize: 56, marginTop: 12, lineHeight: 0.96 }}>Pick a door.</h2>
            </div>
            <div style={{ marginTop: 32, borderTop: "1px solid var(--line)" }}>
              {A_WAYS.map((w) => (
                <div key={w.n} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 24, alignItems: "center", padding: "26px 8px", borderBottom: "1px solid var(--line)" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 14, letterSpacing: "0.2em", color: "var(--pink)" }}>{w.n}</span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
                    <h3 style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em" }}>{w.title}</h3>
                    <span style={{ fontSize: 13.5, color: "var(--dim)", maxWidth: 460, lineHeight: 1.55 }}>{w.desc}</span>
                  </div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cyan)" }}>{w.cta} →</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="dc-seam"></div>

        {/* JOIN CTA — single, final */}
        <section style={{ position: "relative", padding: "140px 60px" }}>
          <Anno lib="bits" style={{ top: 130, right: 30 }}>React Bits · ShinyText on primary button</Anno>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <span className="dc-pill" style={{ margin: "0 auto" }}><span className="dot"></span> COHORT 04 · INTAKE OPEN UNTIL 30 JUNE</span>
            <h2 style={{ marginTop: 22, fontSize: 84, lineHeight: 0.92 }}>If you'd rather <span style={{ color: "var(--red)" }}>build</span> than wait —</h2>
            <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.8, color: "var(--dim)" }}>One application. One short conversation. Then you're in the room on Wednesday with everyone else, shipping.</p>
            <div style={{ marginTop: 30, display: "flex", justifyContent: "center", gap: 12 }}>
              <button className="dc-btn dc-btn-primary">Start the application <span>→</span></button>
              <button className="dc-btn dc-btn-text">Read the manifesto first</button>
            </div>
          </div>
          {/* ambient red wash */}
          <div style={{ position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(ellipse 60rem 30rem at 50% 60%, rgba(255,59,107,0.13), transparent 60%)" }}></div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid var(--line)", padding: "40px 60px" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 32 }}>
            <div>
              <Brand size={11} />
              <p style={{ marginTop: 14, fontSize: 12.5, color: "var(--muted)", lineHeight: 1.6 }}>Student developer club at IIT Mandi. Build nights, open source, launchpad.</p>
            </div>
            {[["EXPLORE", ["Community", "Projects", "Events", "Team"]], ["PROGRAMS", ["Build Nights", "Open Source", "Launchpad", "Challenges"]], ["ELSEWHERE", ["GitHub", "Discord", "Instagram", "RSS"]]].map(([h, ls]) => (
              <div key={h}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.22em", color: "var(--cyan-soft)" }}>{h}</span>
                <ul style={{ marginTop: 14, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
                  {ls.map((l) => <li key={l} style={{ fontSize: 13, color: "var(--dim)" }}>{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 1180, margin: "40px auto 0", display: "flex", justifyContent: "space-between", paddingTop: 22, borderTop: "1px solid var(--line)", fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            <span>© 2026 Dev Cell Club</span>
            <span>Made on campus · Mandi</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

// ───────── MOBILE ─────────
function DirectionA_Mobile() {
  return (
    <div className="mock-frame" style={{ fontSize: 13 }}>
      <div className="mock-bg"></div>
      <div className="mock-stage">

        {/* mobile nav */}
        <div style={{ position: "absolute", top: 14, left: 14, right: 14, height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px 0 16px", border: "1px solid rgba(139,234,255,0.18)", borderRadius: 14, background: "rgba(3,8,14,0.7)", backdropFilter: "blur(14px)", zIndex: 20 }}>
          <Brand size={10} />
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <a style={{ padding: "8px 12px", fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffe1e8", borderRadius: 10, background: "linear-gradient(180deg, rgba(255,59,107,0.28), rgba(255,59,107,0.12))", border: "1px solid rgba(255,59,107,0.4)" }}>Join</a>
            <span style={{ width: 32, height: 32, display: "grid", placeItems: "center", border: "1px solid var(--line)", borderRadius: 10 }}>
              <span style={{ display: "grid", gap: 4 }}>
                <span style={{ width: 14, height: 1, background: "var(--cyan)" }}></span>
                <span style={{ width: 14, height: 1, background: "var(--cyan)" }}></span>
              </span>
            </span>
          </div>
        </div>

        {/* HERO mobile — EXISTING cockpit sequence */}
        <section style={{ position: "relative", height: 720, overflow: "hidden" }} data-existing="cockpit-scroll-sequence">
          <img src="assets/cockpit-01.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%" }} />
          {/* Soft floor vignette only — no chrome competes with the cockpit's own dashboards */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, transparent 58%, rgba(2,4,7,0.55) 80%, var(--bg) 100%)" }}></div>

          <div style={{ position: "absolute", left: 20, right: 20, bottom: 60, display: "grid", gap: 12 }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.24em", color: "rgba(228,244,251,0.78)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 18, height: 1, background: "var(--cyan)" }}></span>
              Student dev club · IIT Mandi
            </span>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(228,244,251,0.86)" }}>You've just landed. Below — what we run, what we ship, how to get in.</p>
            <button className="dc-btn dc-btn-primary" style={{ marginTop: 4, padding: "12px 18px", fontSize: 10 }}>Join Dev Cell <span>→</span></button>
          </div>

          <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.3em", color: "rgba(228,244,251,0.6)", textTransform: "uppercase" }}>continue ↓</div>
        </section>

        {/* TRANSITION strip mobile */}
        <section style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase" }}>
            <span style={{ color: "var(--cyan-soft)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 6px var(--green)" }}></span>
              Live
            </span>
            <span><span style={{ color: "var(--cyan)" }}>23</span> builds</span>
            <span><span style={{ color: "var(--cyan)" }}>184</span> members</span>
            <span><span style={{ color: "var(--cyan)" }}>11</span> repos</span>
          </div>
        </section>

        <div className="dc-seam"></div>

        {/* ABOUT mobile */}
        <section style={{ padding: "60px 20px" }}>
          <span className="dc-eyebrow" style={{ color: "var(--pink)", fontSize: 9.5 }}>02 · WHAT WE ARE</span>
          <h2 style={{ fontSize: 44, marginTop: 10, lineHeight: 0.94 }}>A small room of students who <span style={{ color: "var(--cyan)" }}>ship.</span></h2>
          <p style={{ marginTop: 18, fontSize: 14, lineHeight: 1.75, color: "var(--dim)" }}>Not a lecture series. A working club — build nights, code reviews, shared repos, and the kind of feedback that makes the next thing better.</p>
          <div style={{ marginTop: 22, borderTop: "1px solid var(--line)" }}>
            {[
              ["FOUNDED", "2021 · IIT Mandi"],
              ["MEMBERS", "184 active"],
              ["SHIPPED THIS SEM", "23 projects"],
              ["MEETS", "Wed 7PM · A2-201"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.2em", color: "var(--muted)" }}>{k}</span>
                <span style={{ fontFamily: "var(--display)", fontSize: 14, fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="dc-seam"></div>

        {/* PROGRAMS mobile (stacked) */}
        <section style={{ padding: "60px 20px" }}>
          <span className="dc-eyebrow" style={{ color: "var(--pink)", fontSize: 9.5 }}>03 · WHAT WE RUN</span>
          <h2 style={{ fontSize: 36, marginTop: 10, lineHeight: 0.96 }}>Three programs, one <span style={{ color: "var(--cyan)" }}>loop.</span></h2>
          <div style={{ marginTop: 22, display: "grid", gap: 12 }}>
            {A_PROGRAMS.map((p) => (
              <div key={p.n} style={{ padding: 18, border: "1px solid var(--line)", background: "var(--panel)", position: "relative" }}>
                <span style={{ position: "absolute", top: 0, left: 0, width: 28, height: 2, background: "var(--cyan)" }}></span>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.2em", color: "var(--cyan-soft)" }}>{p.n}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.18em", color: "var(--muted)" }}>{p.meta}</span>
                </div>
                <h3 style={{ marginTop: 10, fontSize: 24, fontWeight: 600 }}>{p.title}</h3>
                <p style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="dc-seam"></div>

        {/* INDEX mobile */}
        <section style={{ padding: "60px 20px" }}>
          <span className="dc-eyebrow" style={{ color: "var(--pink)", fontSize: 9.5 }}>04 · WAYS IN</span>
          <h2 style={{ fontSize: 36, marginTop: 10, lineHeight: 0.96 }}>Pick a door.</h2>
          <div style={{ marginTop: 22, borderTop: "1px solid var(--line)" }}>
            {A_WAYS.map((w) => (
              <div key={w.n} style={{ padding: "18px 0", borderBottom: "1px solid var(--line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--pink)", letterSpacing: "0.2em" }}>{w.n}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--cyan)", letterSpacing: "0.18em" }}>→</span>
                </div>
                <h3 style={{ marginTop: 6, fontSize: 26, fontWeight: 600 }}>{w.title}</h3>
                <p style={{ marginTop: 6, fontSize: 12.5, lineHeight: 1.6, color: "var(--dim)" }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* JOIN mobile */}
        <section style={{ padding: "80px 20px 60px", position: "relative", textAlign: "center" }}>
          <span className="dc-pill" style={{ margin: "0 auto" }}><span className="dot"></span> COHORT 04 OPEN</span>
          <h2 style={{ marginTop: 16, fontSize: 48, lineHeight: 0.92 }}>If you'd rather <span style={{ color: "var(--red)" }}>build.</span></h2>
          <p style={{ marginTop: 16, fontSize: 13.5, lineHeight: 1.7, color: "var(--dim)" }}>One application. One short conversation. Then you're in the room.</p>
          <button className="dc-btn dc-btn-primary" style={{ marginTop: 20, padding: "13px 18px", fontSize: 10 }}>Start the application <span>→</span></button>
          <div style={{ position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(ellipse 40rem 20rem at 50% 60%, rgba(255,59,107,0.15), transparent 60%)" }}></div>
        </section>

        <footer style={{ borderTop: "1px solid var(--line)", padding: "26px 20px", display: "grid", gap: 14 }}>
          <Brand size={10} />
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--muted)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            <span>© 2026 Dev Cell</span><span>Mandi</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

window.DirectionA_Desktop = DirectionA_Desktop;
window.DirectionA_Mobile = DirectionA_Mobile;
