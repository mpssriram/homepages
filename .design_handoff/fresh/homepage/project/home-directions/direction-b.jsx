// Direction B — "Telemetry" — mission console
// Same cockpit hero (preserved), but everything below is a denser terminal/HUD layout.
// Signature scroll moment is a GSAP-pinned horizontal pan through programs.

const B_NAV = ["Home", "Community", "Projects", "Events", "Team", "Challenges"];

const B_PROGRAMS = [
  { id: "build_nights", title: "Build Nights", cmd: "$ run --program build_nights", desc: "Small teams. Fast experiments. Show & tell.", meta: ["Biweekly · Wed 7PM", "Lab A2-201", "Open to all"], next: "Wed 18 Jun" },
  { id: "open_source", title: "Open Source", cmd: "$ run --program open_source", desc: "Real tools the campus uses. PR reviews that sharpen everyone.", meta: ["Ongoing", "11 active repos", "47 open issues"], next: "Triage · Fri" },
  { id: "launchpad", title: "Launchpad", cmd: "$ run --program launchpad", desc: "Prototype → test → ship demo. Six-week student-led cohorts.", meta: ["Cohort 04 · open", "12 builds in flight", "6 weeks remaining"], next: "Apply by 30 Jun" },
  { id: "challenges", title: "Challenges", cmd: "$ run --program challenges", desc: "Weekly puzzles, monthly themed builds, public leaderboard.", meta: ["This week: Streams", "Solved · 42 / 184", "Top 3 published"], next: "New puzzle Sun" },
  { id: "speaker_sessions", title: "Speaker Sessions", cmd: "$ run --program speakers", desc: "Alumni & industry walking through real systems they've shipped.", meta: ["Monthly", "Open to campus", "Recorded & posted"], next: "21 Jun · Anjali R." },
];

const B_COMMITS = [
  { repo: "mandibus", branch: "main", msg: "Add gantry-mode departures, fix Mandi-Kullu polyline", author: "@aarav", time: "12m" },
  { repo: "pulse", branch: "review/queue-v2", msg: "Surface stale PRs > 7 days in the dashboard", author: "@neha", time: "1h" },
  { repo: "stagedoor", branch: "main", msg: "Wire RSVP -> Discord webhook, ship event reminder cron", author: "@vikram", time: "3h" },
  { repo: "ledger", branch: "feat/exports", msg: "CSV export for cohort tracking sheet", author: "@priya", time: "5h" },
  { repo: "site", branch: "main", msg: "Redesign home — direction Telemetry, pin scroll programs", author: "@kabir", time: "1d" },
];

const B_MEMBERS = ["AR","NK","VS","PD","KM","SJ","RM","TH","AN","BV","MJ","DK","RS","SR","NS","KJ"];

// shared
function BBrand({ size = 12 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--mono)", fontWeight: 700, fontSize: size, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--red)", boxShadow: "0 0 10px rgba(255,59,107,0.85)" }}></span>
      DEV CELL
    </div>
  );
}

function BAnno({ lib = "motion", children, style }) {
  const cls = lib === "gsap" ? "anno-gsap" : lib === "bits" ? "anno-bits" : lib === "css" ? "anno-css" : "anno-motion";
  return <span className={`anno ${cls}`} style={style}>{children}</span>;
}

function TerminalHeader({ host = "devcell", path = "/", led = "green" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid var(--line)", background: "rgba(2,4,7,0.6)", fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.05em" }}>
      <span style={{ display: "flex", gap: 5 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: led === "red" ? "var(--red)" : led === "amber" ? "var(--amber)" : "var(--green)", boxShadow: `0 0 6px currentColor`, color: led === "red" ? "var(--red)" : led === "amber" ? "var(--amber)" : "var(--green)" }}></span>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(228,244,251,0.18)" }}></span>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(228,244,251,0.18)" }}></span>
      </span>
      <span>{host}@cell <span style={{ color: "var(--faint)" }}>~</span> {path}</span>
    </div>
  );
}

// ───────── DESKTOP ─────────
function DirectionB_Desktop() {
  return (
    <div className="mock-frame" style={{ fontSize: 14 }}>
      <div className="mock-bg"></div>
      <div className="mock-stage">

        {/* Top utility strip — pre-nav. Mono telemetry */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 28, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", background: "rgba(2,4,7,0.85)", borderBottom: "1px solid var(--line)", fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase", zIndex: 25 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--green)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 6px var(--green)" }}></span>
              SYSTEMS NOMINAL
            </span>
            <span>UPLINK 184 ONLINE</span>
            <span>SECTOR · IIT MANDI · 31.78°N 76.99°E</span>
          </span>
          <span style={{ display: "flex", gap: 18 }}>
            <span>BUILDS 23 LIVE</span>
            <span style={{ color: "var(--cyan-soft)" }}>03:42 IST</span>
          </span>
        </div>

        {/* Nav strip */}
        <div style={{ position: "absolute", top: 28, left: 0, right: 0, height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", background: "rgba(2,4,7,0.7)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--line)", zIndex: 24 }}>
          <BBrand size={11} />
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--mono)" }}>
            {B_NAV.map((n) => (
              <a key={n} style={{ padding: "8px 14px", fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: n === "Home" ? "var(--ink)" : "var(--muted)", borderBottom: n === "Home" ? "1px solid var(--red)" : "1px solid transparent" }}>{n}</a>
            ))}
          </div>
          <a style={{ padding: "10px 18px", fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffe1e8", background: "linear-gradient(180deg, rgba(255,59,107,0.28), rgba(255,59,107,0.12))", border: "1px solid rgba(255,59,107,0.4)" }}>Initiate / Join</a>
        </div>

        {/* HERO — EXISTING cockpit sequence */}
        <section style={{ position: "relative", height: 820, paddingTop: 84, overflow: "hidden" }} data-existing="cockpit-scroll-sequence">
          <BAnno lib="gsap" style={{ top: 100, left: 30 }}>EXISTING · CockpitCanvasSequence · ScrollTrigger scrub</BAnno>
          <BAnno lib="motion" style={{ top: 100, right: 30 }}>Motion · type-on boot footer once cockpit settles</BAnno>

          <img src="assets/cockpit-01.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, transparent 50%, rgba(2,4,7,0.45) 75%, var(--bg) 100%)" }}></div>

          {/* Bottom boot-sequence rail — looks unbolted from the cockpit dashboard */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "24px 24px 30px", background: "linear-gradient(180deg, transparent, rgba(2,4,7,0.85) 50%)" }}>
            <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr 1fr", gap: 24, alignItems: "end" }}>
              <div style={{ display: "grid", gap: 8 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.24em", color: "var(--cyan-soft)", textTransform: "uppercase" }}>// BOOT 0001</span>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, lineHeight: 1.65, color: "rgba(228,244,251,0.78)" }}>
                  <div><span style={{ color: "var(--green)" }}>✓</span> Cabin pressurized</div>
                  <div><span style={{ color: "var(--green)" }}>✓</span> Telemetry uplinked</div>
                  <div><span style={{ color: "var(--green)" }}>✓</span> Members synced &nbsp;<span style={{ color: "var(--cyan)" }}>184/184</span></div>
                  <div><span style={{ color: "var(--red)" }}>●</span> <span style={{ color: "var(--ink)" }}>Awaiting operator input_<span style={{ animation: "" }}></span></span></div>
                </div>
              </div>
              <div style={{ display: "grid", gap: 6, justifyItems: "center", textAlign: "center" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.3em", color: "var(--faint)", textTransform: "uppercase" }}>OPERATOR HANDOFF</span>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="dc-btn dc-btn-primary">Initiate / Join <span>→</span></button>
                  <button className="dc-btn dc-btn-ghost">Tour the cell</button>
                </div>
                <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.24em", color: "var(--muted)", marginTop: 4 }}>↓ SCROLL TO ENGAGE PROGRAMS</span>
              </div>
              <div style={{ display: "grid", gap: 8, justifyItems: "end", textAlign: "right" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.24em", color: "var(--cyan-soft)", textTransform: "uppercase" }}>// INSTRUMENTS</span>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, lineHeight: 1.65, color: "rgba(228,244,251,0.78)" }}>
                  <div>ALT &nbsp;<span style={{ color: "var(--cyan)" }}>14,302 m</span></div>
                  <div>HDG &nbsp;<span style={{ color: "var(--cyan)" }}>087°</span></div>
                  <div>VEL &nbsp;<span style={{ color: "var(--cyan)" }}>+0.42 c</span></div>
                  <div>CRG &nbsp;<span style={{ color: "var(--red)" }}>23 builds in hold</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SYSTEM STATUS bar — HUD telemetry */}
        <section style={{ padding: "40px 24px", borderBottom: "1px solid var(--line)", position: "relative" }}>
          <BAnno lib="motion" style={{ top: -10, right: 30 }}>Motion · counters via useMotionValue + useTransform</BAnno>
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "auto repeat(5, 1fr)", gap: 0, border: "1px solid var(--line)" }}>
            <div style={{ padding: "18px 22px", borderRight: "1px solid var(--line)", display: "grid", gap: 4 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.24em", color: "var(--faint)", textTransform: "uppercase" }}>SYSTEM</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 13, letterSpacing: "0.18em", color: "var(--cyan)", textTransform: "uppercase" }}>CELL.STATUS</span>
            </div>
            {[
              { k: "ACTIVE BUILDS", v: "23", led: "live" },
              { k: "MEMBERS ONLINE", v: "47 / 184", led: "ok" },
              { k: "OPEN ISSUES", v: "47", led: "amber" },
              { k: "OSS REPOS", v: "11", led: "ok" },
              { k: "NEXT BUILD NIGHT", v: "Wed · 7PM", led: "ok" },
            ].map((m, i) => (
              <div key={i} style={{ padding: "18px 22px", borderRight: i < 4 ? "1px solid var(--line)" : "0", display: "grid", gap: 4, position: "relative" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.22em", color: "var(--muted)", textTransform: "uppercase" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: m.led === "live" ? "var(--red)" : m.led === "amber" ? "var(--amber)" : "var(--green)", boxShadow: "0 0 6px currentColor", color: m.led === "live" ? "var(--red)" : m.led === "amber" ? "var(--amber)" : "var(--green)" }}></span>
                  {m.k}
                </span>
                <span style={{ fontFamily: "var(--display)", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>{m.v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT — terminal block */}
        <section style={{ position: "relative", padding: "100px 24px" }}>
          <BAnno lib="motion" style={{ top: 90, right: 30 }}>Motion · whileInView · staggered char-split (small)</BAnno>
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "0.9fr 1.4fr", gap: 80, alignItems: "start" }}>
            <div>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.24em", color: "var(--cyan-soft)", textTransform: "uppercase" }}>// CELL.README</span>
              <h2 style={{ marginTop: 14, fontSize: 64, lineHeight: 0.94 }}>What this <span style={{ color: "var(--red)" }}>cell</span> actually is.</h2>
              <div style={{ marginTop: 22, padding: "12px 16px", border: "1px solid var(--line)", background: "rgba(2,4,7,0.6)", fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--cyan-soft)", letterSpacing: "0.02em" }}>
                <div><span style={{ color: "var(--muted)" }}>$</span> whoami</div>
                <div style={{ color: "var(--ink)" }}>dev_cell_club</div>
                <div><span style={{ color: "var(--muted)" }}>$</span> cat /etc/mission</div>
                <div style={{ color: "var(--dim)", lineHeight: 1.7 }}>
                  &gt; Curious students building real software together.<br />
                  &gt; Practical sessions. Shared projects. The momentum to keep going.
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gap: 22 }}>
              <p style={{ fontSize: 16, lineHeight: 1.8 }}>Dev Cell isn't a lecture series. It's a working club — build nights, code reviews, shared repos, and the kind of feedback that makes the next thing better than the last.</p>
              <p style={{ fontSize: 16, lineHeight: 1.8 }}>We pair beginners with builders, run themed sprints, ship open-source tools the campus actually uses, and send people out the other side knowing how a whole stack feels in their hands.</p>
              {/* HUD specs panel */}
              <div style={{ marginTop: 6, border: "1px solid var(--line)", background: "rgba(6,14,21,0.5)" }}>
                <TerminalHeader path="~/cell/specs" />
                <div style={{ padding: "18px 20px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22, fontFamily: "var(--mono)" }}>
                  {[
                    ["EST", "2021"],
                    ["MEMBERS", "184 / 312"],
                    ["SHIPPED", "23 / sem"],
                    ["MEETS", "Wed 7PM"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--muted)" }}>{k}</div>
                      <div style={{ marginTop: 6, fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, color: "var(--cyan)" }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="dc-seam"></div>

        {/* PROGRAMS — SIGNATURE: pinned horizontal scroll */}
        <section style={{ position: "relative", padding: "100px 0 80px" }}>
          <BAnno lib="gsap" style={{ top: 88, right: 30 }}>★ SIGNATURE · GSAP ScrollTrigger pin · scrub x · sticky 5x viewport</BAnno>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingBottom: 22, borderBottom: "1px solid var(--line)" }}>
              <div>
                <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.24em", color: "var(--pink)", textTransform: "uppercase" }}>// CELL.PROGRAMS</span>
                <h2 style={{ marginTop: 12, fontSize: 56, lineHeight: 0.96 }}>Five channels. <span style={{ color: "var(--red)" }}>Scroll to flip.</span></h2>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>
                <span>CH 01</span>
                <div style={{ width: 100, height: 2, background: "var(--line)", position: "relative", overflow: "hidden" }}>
                  <span style={{ position: "absolute", left: 0, top: 0, width: 22, height: "100%", background: "var(--red)" }}></span>
                </div>
                <span>CH 05</span>
              </div>
            </div>
          </div>

          {/* horizontal rail */}
          <div style={{ marginTop: 32, padding: "0 24px", overflow: "hidden" }}>
            <div style={{ display: "flex", gap: 16, transform: "translateX(-180px)" }}>
              {B_PROGRAMS.map((p, i) => (
                <div key={p.id} style={{ flex: "0 0 480px", border: i === 1 ? "1px solid var(--red)" : "1px solid var(--line)", background: i === 1 ? "linear-gradient(160deg, rgba(40,8,18,0.55), rgba(5,11,18,0.85))" : "var(--panel)", boxShadow: i === 1 ? "inset 0 0 30px rgba(255,59,107,0.18), 0 0 28px rgba(255,59,107,0.12)" : "none" }}>
                  <TerminalHeader path={`~/programs/${p.id}`} led={i === 1 ? "red" : "green"} />
                  <div style={{ padding: "22px 24px 26px", display: "grid", gap: 12 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--cyan-soft)", letterSpacing: "0.05em" }}>{p.cmd}</span>
                    <h3 style={{ fontSize: 42, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 0.95 }}>{p.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--dim)" }}>{p.desc}</p>
                    <div style={{ marginTop: 6, display: "grid", gap: 6, fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)" }}>
                      {p.meta.map((m) => <span key={m}>&gt; {m}</span>)}
                    </div>
                    <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--cyan-soft)", textTransform: "uppercase" }}>NEXT · {p.next}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em", color: i === 1 ? "var(--pink)" : "var(--cyan)", textTransform: "uppercase" }}>./open →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="dc-seam"></div>

        {/* COMMITS feed + ROSTER preview */}
        <section style={{ padding: "100px 24px", position: "relative" }}>
          <BAnno lib="motion" style={{ top: 90, right: 30 }}>Motion · whileInView fade-up stagger 40ms</BAnno>
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 0.8fr", gap: 32, alignItems: "start" }}>
            {/* commits */}
            <div style={{ border: "1px solid var(--line)", background: "rgba(6,14,21,0.55)" }}>
              <TerminalHeader path="~/cell/commits --tail 5" />
              <div style={{ padding: "8px 0" }}>
                {B_COMMITS.map((c, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "20px 1fr auto", gap: 16, padding: "16px 22px", borderBottom: i === B_COMMITS.length - 1 ? "0" : "1px solid var(--line-soft)", alignItems: "baseline", fontFamily: "var(--mono)" }}>
                    <span style={{ color: "var(--cyan-soft)" }}>●</span>
                    <div style={{ display: "grid", gap: 4 }}>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>
                        <span style={{ color: "var(--cyan)" }}>{c.repo}</span>
                        <span style={{ color: "var(--faint)" }}> / </span>
                        <span style={{ color: "var(--pink)" }}>{c.branch}</span>
                      </div>
                      <div style={{ fontSize: 13.5, color: "var(--ink)", letterSpacing: "0.01em" }}>{c.msg}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{c.author}</div>
                    </div>
                    <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--faint)", textTransform: "uppercase" }}>{c.time} AGO</span>
                  </div>
                ))}
              </div>
            </div>

            {/* roster */}
            <div>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.24em", color: "var(--pink)", textTransform: "uppercase" }}>// CELL.ROSTER · 184 / 184</span>
              <h3 style={{ marginTop: 12, fontSize: 36, fontWeight: 700, lineHeight: 0.96 }}>Operators on duty.</h3>
              <p style={{ marginTop: 12, fontSize: 13.5, lineHeight: 1.65, color: "var(--dim)" }}>Builders, mentors, organisers. Hover any tile for handle and current focus.</p>
              <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                {B_MEMBERS.map((m, i) => (
                  <div key={i} style={{ aspectRatio: "1 / 1", border: "1px solid var(--line)", background: i % 5 === 0 ? "linear-gradient(135deg, #122a3a, #04121c)" : "linear-gradient(135deg, #0c1c28, #04101a)", display: "grid", placeItems: "center", position: "relative", overflow: "hidden" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", color: i === 1 ? "var(--cyan)" : "var(--dim)" }}>{m}</span>
                    {i === 1 && <span style={{ position: "absolute", top: 4, right: 4, width: 5, height: 5, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 4px var(--green)" }}></span>}
                  </div>
                ))}
              </div>
              <a style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)" }}>./full_roster →</a>
            </div>
          </div>
        </section>

        <div className="dc-seam"></div>

        {/* JOIN — split panel: form preview + what you get */}
        <section style={{ padding: "120px 24px", position: "relative" }}>
          <BAnno lib="bits" style={{ top: 100, right: 30 }}>React Bits · Particles bg only in this section</BAnno>
          <BAnno lib="motion" style={{ top: 100, left: 30 }}>Motion · field focus rings (whileFocus)</BAnno>
          <div style={{ position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(ellipse 60rem 30rem at 50% 40%, rgba(255,59,107,0.12), transparent 65%)" }}></div>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.24em", color: "var(--pink)", textTransform: "uppercase" }}>// CELL.JOIN</span>
              <h2 style={{ marginTop: 14, fontSize: 80, lineHeight: 0.92 }}>Request <span style={{ color: "var(--red)" }}>boarding</span>.</h2>
              <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.7, color: "var(--dim)", maxWidth: 540, margin: "16px auto 0" }}>Cohort 04 intake open until 30 Jun. One short application. One conversation. Then you're in.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.9fr", gap: 18 }}>
              <div style={{ border: "1px solid var(--line)", background: "rgba(6,14,21,0.65)" }}>
                <TerminalHeader path="~/cell/apply --new" led="red" />
                <div style={{ padding: "26px 28px", display: "grid", gap: 18 }}>
                  {[
                    ["NAME", "Your full name"],
                    ["EMAIL", "you@iitmandi.ac.in"],
                    ["INTEREST", "Pick a program ↓"],
                    ["LINK (optional)", "github / project / portfolio"],
                  ].map(([k, ph], i) => (
                    <div key={k} style={{ display: "grid", gap: 6 }}>
                      <label style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.22em", color: "var(--cyan-soft)", textTransform: "uppercase" }}>{k}</label>
                      <div style={{ padding: "12px 14px", border: "1px solid var(--line)", background: "rgba(2,4,7,0.6)", fontFamily: "var(--mono)", fontSize: 13, color: i === 0 ? "var(--ink)" : "var(--faint)" }}>{i === 0 ? "Aarav ▍" : ph}</div>
                    </div>
                  ))}
                  <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Step 1 / 3</span>
                    <button className="dc-btn dc-btn-primary">Initiate <span>→</span></button>
                  </div>
                </div>
              </div>

              {/* what you get */}
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { k: "01 / Build nights", v: "A seat at the table every Wednesday." },
                  { k: "02 / Mentor pairing", v: "Get paired with a builder in your stack." },
                  { k: "03 / Repo access", v: "Push to real, used, open-source tools." },
                  { k: "04 / Cohort runway", v: "Six weeks to take an idea from sketch to demo." },
                ].map((it) => (
                  <div key={it.k} style={{ padding: "16px 18px", border: "1px solid var(--line)", background: "rgba(6,14,21,0.5)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.22em", color: "var(--cyan-soft)", textTransform: "uppercase" }}>{it.k}</div>
                      <div style={{ marginTop: 6, fontSize: 15, color: "var(--ink)" }}>{it.v}</div>
                    </div>
                    <span style={{ color: "var(--cyan)" }}>→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid var(--line)", padding: "40px 24px", background: "rgba(2,4,7,0.85)" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 32 }}>
            <div>
              <BBrand size={11} />
              <p style={{ marginTop: 14, fontSize: 12.5, color: "var(--muted)", lineHeight: 1.6 }}>Student developer club at IIT Mandi. Mission control for build nights, OSS, launchpad.</p>
              <div style={{ marginTop: 14, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--green)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 6px var(--green)" }}></span>
                SYSTEMS NOMINAL
              </div>
            </div>
            {[["EXPLORE", ["Community", "Projects", "Events", "Team"]], ["PROGRAMS", ["Build Nights", "Open Source", "Launchpad", "Challenges"]], ["CHANNELS", ["GitHub", "Discord", "Instagram", "RSS"]]].map(([h, ls]) => (
              <div key={h}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: "0.22em", color: "var(--cyan-soft)" }}>{h}</span>
                <ul style={{ marginTop: 14, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
                  {ls.map((l) => <li key={l} style={{ fontSize: 13, color: "var(--dim)" }}>{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 1320, margin: "40px auto 0", display: "flex", justifyContent: "space-between", paddingTop: 22, borderTop: "1px solid var(--line)", fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            <span>© 2026 Dev Cell Club</span>
            <span>UPLINK 184 / 184 · 03:42 IST</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

// ───────── MOBILE ─────────
function DirectionB_Mobile() {
  return (
    <div className="mock-frame" style={{ fontSize: 13 }}>
      <div className="mock-bg"></div>
      <div className="mock-stage">

        {/* utility strip */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 22, padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,4,7,0.9)", borderBottom: "1px solid var(--line)", fontFamily: "var(--mono)", fontSize: 8.5, letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase", zIndex: 25 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--green)" }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 4px var(--green)" }}></span>
            NOMINAL
          </span>
          <span>184 UPLINK</span>
          <span style={{ color: "var(--cyan-soft)" }}>03:42</span>
        </div>

        {/* nav */}
        <div style={{ position: "absolute", top: 22, left: 0, right: 0, height: 48, padding: "0 12px 0 18px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,4,7,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--line)", zIndex: 24 }}>
          <BBrand size={10} />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <a style={{ padding: "8px 12px", fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffe1e8", background: "linear-gradient(180deg, rgba(255,59,107,0.28), rgba(255,59,107,0.12))", border: "1px solid rgba(255,59,107,0.4)" }}>Join</a>
            <span style={{ width: 30, height: 30, display: "grid", placeItems: "center", border: "1px solid var(--line)" }}>
              <span style={{ display: "grid", gap: 3 }}>
                <span style={{ width: 14, height: 1, background: "var(--cyan)" }}></span>
                <span style={{ width: 14, height: 1, background: "var(--cyan)" }}></span>
              </span>
            </span>
          </div>
        </div>

        {/* HERO mobile — cockpit + boot rail */}
        <section style={{ position: "relative", height: 740, paddingTop: 70, overflow: "hidden" }} data-existing="cockpit-scroll-sequence">
          <img src="assets/cockpit-01.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, transparent 50%, rgba(2,4,7,0.55) 78%, var(--bg) 100%)" }}></div>

          <div style={{ position: "absolute", left: 16, right: 16, bottom: 18, display: "grid", gap: 14 }}>
            <div style={{ display: "grid", gap: 4 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.24em", color: "var(--cyan-soft)", textTransform: "uppercase" }}>// BOOT 0001</span>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10.5, lineHeight: 1.6, color: "rgba(228,244,251,0.85)" }}>
                <div><span style={{ color: "var(--green)" }}>✓</span> Cabin pressurized</div>
                <div><span style={{ color: "var(--green)" }}>✓</span> 184/184 synced</div>
                <div><span style={{ color: "var(--red)" }}>●</span> Awaiting operator_</div>
              </div>
            </div>
            <button className="dc-btn dc-btn-primary" style={{ padding: "12px 16px", fontSize: 10 }}>Initiate / Join <span>→</span></button>
          </div>
        </section>

        {/* status bar mobile */}
        <section style={{ padding: "16px 12px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--line)" }}>
            {[
              { k: "BUILDS", v: "23", led: "red" },
              { k: "ONLINE", v: "47", led: "ok" },
              { k: "REPOS", v: "11", led: "ok" },
              { k: "ISSUES", v: "47", led: "amber" },
            ].map((m, i) => (
              <div key={i} style={{ padding: "10px 8px", borderRight: i < 3 ? "1px solid var(--line)" : "0", display: "grid", gap: 4, textAlign: "center" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4, fontFamily: "var(--mono)", fontSize: 8.5, letterSpacing: "0.22em", color: "var(--muted)" }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: m.led === "red" ? "var(--red)" : m.led === "amber" ? "var(--amber)" : "var(--green)" }}></span>
                  {m.k}
                </span>
                <span style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 700, color: "var(--cyan)" }}>{m.v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* About terminal mobile */}
        <section style={{ padding: "50px 16px" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.24em", color: "var(--cyan-soft)", textTransform: "uppercase" }}>// CELL.README</span>
          <h2 style={{ marginTop: 8, fontSize: 38, lineHeight: 0.94 }}>What this <span style={{ color: "var(--red)" }}>cell</span> is.</h2>
          <p style={{ marginTop: 14, fontSize: 13.5, lineHeight: 1.7, color: "var(--dim)" }}>Not a lecture series. A working club — build nights, code reviews, shared repos, and the kind of feedback that makes the next thing better.</p>
          <div style={{ marginTop: 18, border: "1px solid var(--line)" }}>
            <TerminalHeader path="~/cell/specs" />
            <div style={{ padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["EST","2021"],["MEMBERS","184"],["SHIPPED","23/sem"],["MEETS","Wed 7PM"]].map(([k,v]) => (
                <div key={k}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.22em", color: "var(--muted)", textTransform: "uppercase" }}>{k}</div>
                  <div style={{ marginTop: 4, fontFamily: "var(--display)", fontSize: 22, fontWeight: 700, color: "var(--cyan)" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="dc-seam"></div>

        {/* Programs — horizontal swipe (preview 1.5 cards) */}
        <section style={{ padding: "50px 0 40px" }}>
          <div style={{ padding: "0 16px" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.24em", color: "var(--pink)", textTransform: "uppercase" }}>// CELL.PROGRAMS</span>
            <h2 style={{ marginTop: 8, fontSize: 36, lineHeight: 0.96 }}>Five channels. <span style={{ color: "var(--red)" }}>Swipe.</span></h2>
          </div>
          <div style={{ marginTop: 20, padding: "0 16px", overflow: "hidden" }}>
            <div style={{ display: "flex", gap: 12, transform: "translateX(0)" }}>
              {B_PROGRAMS.slice(0, 3).map((p, i) => (
                <div key={p.id} style={{ flex: "0 0 280px", border: i === 0 ? "1px solid var(--red)" : "1px solid var(--line)", background: i === 0 ? "linear-gradient(160deg, rgba(40,8,18,0.55), rgba(5,11,18,0.85))" : "var(--panel)" }}>
                  <TerminalHeader path={`~/programs/${p.id}`} led={i === 0 ? "red" : "green"} />
                  <div style={{ padding: "16px 18px", display: "grid", gap: 10 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--cyan-soft)" }}>{p.cmd}</span>
                    <h3 style={{ fontSize: 26, fontWeight: 700, lineHeight: 0.96 }}>{p.title}</h3>
                    <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--dim)" }}>{p.desc}</p>
                    <div style={{ marginTop: 4, fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)" }}>NEXT · {p.next}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="dc-seam"></div>

        {/* Commits mobile */}
        <section style={{ padding: "50px 16px" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.24em", color: "var(--pink)", textTransform: "uppercase" }}>// CELL.COMMITS</span>
          <h3 style={{ marginTop: 8, fontSize: 28, fontWeight: 700 }}>Latest from the repos.</h3>
          <div style={{ marginTop: 18, border: "1px solid var(--line)" }}>
            <TerminalHeader path="~/cell/commits" />
            {B_COMMITS.slice(0, 4).map((c, i) => (
              <div key={i} style={{ padding: "12px 14px", borderBottom: i === 3 ? "0" : "1px solid var(--line-soft)", fontFamily: "var(--mono)", display: "grid", gap: 4 }}>
                <div style={{ fontSize: 10.5, color: "var(--muted)" }}>
                  <span style={{ color: "var(--cyan)" }}>{c.repo}</span> / <span style={{ color: "var(--pink)" }}>{c.branch}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--ink)" }}>{c.msg}</div>
                <div style={{ fontSize: 10, color: "var(--muted)" }}>{c.author} · {c.time} ago</div>
              </div>
            ))}
          </div>
        </section>

        {/* Join mobile */}
        <section style={{ padding: "70px 16px 50px", position: "relative", textAlign: "center" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: -1, background: "radial-gradient(ellipse 30rem 20rem at 50% 50%, rgba(255,59,107,0.13), transparent 65%)" }}></div>
          <span style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.24em", color: "var(--pink)", textTransform: "uppercase" }}>// CELL.JOIN</span>
          <h2 style={{ marginTop: 10, fontSize: 46, lineHeight: 0.92 }}>Request <span style={{ color: "var(--red)" }}>boarding</span>.</h2>
          <p style={{ marginTop: 14, fontSize: 13, lineHeight: 1.7, color: "var(--dim)" }}>Cohort 04 intake until 30 Jun.</p>
          <div style={{ marginTop: 22, border: "1px solid var(--line)", textAlign: "left" }}>
            <TerminalHeader path="~/cell/apply" led="red" />
            <div style={{ padding: "16px 16px", display: "grid", gap: 12 }}>
              {[["NAME", "Aarav ▍"], ["EMAIL", "you@iitmandi.ac.in"], ["INTEREST", "Pick a program ↓"]].map(([k, ph], i) => (
                <div key={k} style={{ display: "grid", gap: 4 }}>
                  <label style={{ fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.22em", color: "var(--cyan-soft)" }}>{k}</label>
                  <div style={{ padding: "10px 12px", border: "1px solid var(--line)", background: "rgba(2,4,7,0.6)", fontFamily: "var(--mono)", fontSize: 12, color: i === 0 ? "var(--ink)" : "var(--faint)" }}>{ph}</div>
                </div>
              ))}
              <button className="dc-btn dc-btn-primary" style={{ marginTop: 6, padding: "12px 14px", fontSize: 10, justifyContent: "center" }}>Initiate <span>→</span></button>
            </div>
          </div>
        </section>

        <footer style={{ borderTop: "1px solid var(--line)", padding: "22px 16px", display: "grid", gap: 12, background: "rgba(2,4,7,0.85)" }}>
          <BBrand size={10} />
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 9.5, color: "var(--muted)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            <span>© 2026 Dev Cell</span>
            <span style={{ color: "var(--green)" }}>● Nominal</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

window.DirectionB_Desktop = DirectionB_Desktop;
window.DirectionB_Mobile = DirectionB_Mobile;
