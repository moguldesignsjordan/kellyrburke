import { useState, useEffect, useRef } from "react";

// ─── Design Tokens ───
const THEME = {
  colors: {
    navy: "#0f172a",       // Darker, richer navy
    navyLight: "#1e3a8a",
    primary: "#dc2626",    // Bold Red
    primaryDark: "#991b1b",
    cream: "#fbfaf8",      // Warm off-white paper tone
    white: "#ffffff",
    slate100: "#f1f5f9",
    slate300: "#cbd5e1",
    slate600: "#475569",
    slate800: "#1e293b",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    glow: "0 0 20px rgba(220, 38, 38, 0.35)",
  }
};

// ─── Utilities ───
function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, y = 24, className = "", style = {} }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Icons ───
const Icons = {
  check: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  shield: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  users: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  trending: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  star: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  menu: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  x: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  chevronRight: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
};

// ─── Components ───

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItemStyle = {
    fontFamily: "'Inter', sans-serif", // Changed font
    fontSize: "0.9rem",
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: scrolled ? THEME.colors.navy : "rgba(255,255,255,0.9)",
    textDecoration: "none",
    padding: "8px 16px",
    transition: "all 0.2s ease"
  };

  return (
    <>
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.05)" : "1px solid rgba(255,255,255,0.08)",
      padding: scrolled ? "12px 0" : "24px 0",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Logo Area */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img 
            src="/VoteKRb.png" 
            alt="Kelly R. Burke Logo" 
            style={{ 
              height: 99, // Increased size from 48 to 72
              objectFit: "contain",
            }} 
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {["Meet Kelly", "Priorities", "Get Involved"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} 
               style={navItemStyle}
               onMouseEnter={(e) => e.target.style.opacity = "0.7"}
               onMouseLeave={(e) => e.target.style.opacity = "1"}
            >
              {item}
            </a>
          ))}
          <button style={{
            background: THEME.colors.primary,
            color: "white", border: "none", padding: "10px 24px",
            borderRadius: 50, fontFamily: "'Inter', sans-serif", // Changed font
            fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em",
            textTransform: "uppercase", cursor: "pointer", marginLeft: 16,
            boxShadow: scrolled ? THEME.shadows.md : "none",
            transition: "transform 0.2s"
          }}
          onMouseEnter={e => e.target.style.transform = "translateY(-1px)"}
          onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            Donate
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="visible-mobile" 
          onClick={() => setMobileMenu(!mobileMenu)}
          style={{ background: "none", border: "none", color: scrolled ? THEME.colors.navy : "white", cursor: "pointer" }}
        >
          {mobileMenu ? Icons.x : Icons.menu}
        </button>
      </div>
    </nav>
    
    {/* Mobile Drawer */}
    {mobileMenu && (
      <div style={{
        position: "fixed", inset: 0, background: THEME.colors.navy, zIndex: 999,
        padding: "100px 24px", display: "flex", flexDirection: "column", gap: 24,
        animation: "fadeIn 0.2s ease-out"
      }}>
        {["Meet Kelly", "Priorities", "Get Involved", "Donate"].map(item => (
          <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} 
             onClick={() => setMobileMenu(false)}
             style={{ 
               color: "white", fontSize: "1.5rem", fontFamily: "'Montserrat', sans-serif", // Changed font
               textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 12
             }}>
            {item}
          </a>
        ))}
      </div>
    )}

    <style>{`
      @media (max-width: 768px) {
        .hidden-mobile { display: none !important; }
      }
      @media (min-width: 769px) {
        .visible-mobile { display: none !important; }
      }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    `}</style>
    </>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header style={{
      position: "relative", minHeight: "100vh",
      background: `linear-gradient(135deg, ${THEME.colors.navy} 0%, #1e3a8a 60%, #172554 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", paddingTop: 60
    }}>
      {/* Background Texture & Effects */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.4, backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.1%22/%3E%3C/svg%3E')" }}></div>
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "50vw", height: "50vw", background: THEME.colors.primary, filter: "blur(180px)", opacity: 0.15, borderRadius: "50%" }}></div>
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: "40vw", height: "40vw", background: "white", filter: "blur(150px)", opacity: 0.05, borderRadius: "50%" }}></div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1000, textAlign: "center", padding: 24 }}>
        
        {/* Animated Badge */}
        <div style={{ 
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100,
          padding: "8px 20px", marginBottom: 32,
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
        }}>
          <span style={{ color: THEME.colors.primary }}>{Icons.star}</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, color: "white", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Election Day: May 2, 2026
          </span>
          <span style={{ color: THEME.colors.primary }}>{Icons.star}</span>
        </div>

        <h1 style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 400, // Changed font
          fontSize: "clamp(3rem, 6vw, 5.5rem)", lineHeight: 1.05,
          color: "white", margin: "0 0 24px", letterSpacing: "-0.02em",
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s"
        }}>
          Leadership That <br/>
          <span style={{ 
            background: `linear-gradient(to right, #fff 0%, #cbd5e1 100%)`, 
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            Listens & Delivers.
          </span>
        </h1>

        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", // Changed font
          color: "rgba(255,255,255,0.8)", maxWidth: 650, margin: "0 auto 48px", lineHeight: 1.6,
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s"
        }}>
          Kelly R. Burke is a small business owner, father, and community advocate fighting for safer neighborhoods and stronger families in District 3.
        </p>

        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s"
        }}>
          <button style={{
            background: THEME.colors.primary, color: "white",
            padding: "18px 42px", borderRadius: 8, border: "none",
            fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem", // Changed font
            textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer",
            boxShadow: THEME.shadows.glow, transition: "transform 0.2s"
          }}
          onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
          onMouseLeave={e => e.target.style.transform = "translateY(0)"}
          >
            Join the Campaign
          </button>
          
          <button style={{
            background: "transparent", color: "white",
            padding: "18px 42px", borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.3)",
            fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1rem", // Changed font
            textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer",
            transition: "background 0.2s"
          }}
          onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.1)"}
          onMouseLeave={e => e.target.style.background = "transparent"}
          >
            Our Platform
          </button>
        </div>
      </div>

      {/* Curved Divider */}
      <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 80, overflow: "hidden" }}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <path fill={THEME.colors.cream} fillOpacity="1" d="M0,192L80,186.7C160,181,320,171,480,181.3C640,192,800,224,960,218.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </header>
  );
}

function StatsBar() {
  const stats = [
    { num: "25+", label: "Years Resident" },
    { num: "3", label: "Small Businesses Helped" },
    { num: "100%", label: "Committed to You" },
  ];

  return (
    <section style={{ background: THEME.colors.cream, padding: "0 24px 80px" }}>
      <div style={{ 
        maxWidth: 1000, margin: "-40px auto 0", 
        background: "white", borderRadius: 16, 
        boxShadow: THEME.shadows.xl, padding: "40px",
        position: "relative", zIndex: 20,
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 32, textAlign: "center"
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{ borderRight: i !== stats.length - 1 ? "1px solid #eee" : "none" }} className="stat-item">
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: "3rem", color: THEME.colors.primary, lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: THEME.colors.slate600, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 8 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width: 768px){ .stat-item { border-right: none !important; border-bottom: 1px solid #eee; padding-bottom: 24px; } .stat-item:last-child { border-bottom: none; padding-bottom: 0; } }`}</style>
    </section>
  );
}

function About() {
  return (
    <section id="meet-kelly" style={{ background: THEME.colors.cream, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="grid-stack">
        
        {/* Text Side */}
        <Reveal>
          <span style={{ fontFamily: "'Inter', sans-serif", color: THEME.colors.primary, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.85rem" }}>About the Candidate</span>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: THEME.colors.navy, lineHeight: 1.1, margin: "16px 0 32px" }}>
            A Voice for <br/>Our Community
          </h2>
          <div style={{ height: 4, width: 80, background: THEME.colors.primary, marginBottom: 32 }}></div>
          
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", lineHeight: 1.8, color: THEME.colors.slate600, marginBottom: 24 }}>
            As a grassroots small business owner and devoted father, I see the challenges our district faces every day. From traffic safety near our schools to the need for sustainable local growth, the issues aren't just political—they are personal.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", lineHeight: 1.8, color: THEME.colors.slate600, marginBottom: 32 }}>
            I am running to bring common-sense leadership back to City Hall. I believe in listening before acting and ensuring every tax dollar is spent with purpose.
          </p>
          
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 60, height: 60, background: THEME.colors.navy, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "1.5rem" }}>K</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: THEME.colors.navy }}>Kelly R. Burke</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: THEME.colors.slate600 }}>Candidate for District 3</div>
            </div>
          </div>
        </Reveal>

        {/* Image Side */}
        <Reveal delay={0.2} style={{ position: "relative" }}>
          <div style={{ 
            position: "relative", zIndex: 2, borderRadius: 20, overflow: "hidden", 
          }}>
            {/* Using a placeholder photo, but you can swap this to VoteKRb.png if it's a photo */}
            <div style={{ width: "100%", height: "100%", background: "#dedede", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: THEME.colors.slate600 }}>
              <img src="/kelly-burke.jpg" alt="Kelly Burke" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }} 
                   onError={(e) => {e.target.style.display='none';}} 
              />
            
            </div>
          </div>
      
        </Reveal>

      </div>
      <style>{`@media(max-width: 900px){ .grid-stack { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function PlatformCard({ icon, title, desc, delay }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        background: "white", padding: 32, borderRadius: 12,
        borderTop: `4px solid ${THEME.colors.primary}`,
        boxShadow: THEME.shadows.sm, height: "100%",
        display: "flex", flexDirection: "column",
        transition: "all 0.3s ease", cursor: "pointer"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = THEME.shadows.xl;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = THEME.shadows.sm;
      }}
      >
        <div style={{ 
          width: 50, height: 50, borderRadius: 12, background: THEME.colors.slate100, 
          color: THEME.colors.navy, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 
        }}>
          {icon}
        </div>
        <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: THEME.colors.navy, margin: "0 0 12px" }}>{title}</h3>
        <p style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.6, color: THEME.colors.slate600, flex: 1 }}>{desc}</p>
        <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, color: THEME.colors.primary, fontWeight: 700, fontSize: "0.9rem", fontFamily: "'Inter', sans-serif" }}>
          Read More {Icons.chevronRight}
        </div>
      </div>
    </Reveal>
  );
}

function Platform() {
  const points = [
    { icon: Icons.shield, title: "Safe Neighborhoods", desc: "Prioritizing first responders and community policing to keep our streets safe for everyone." },
    { icon: Icons.users, title: "Family Focused", desc: "Investing in parks, libraries, and youth programs to ensure our children have a bright future." },
    { icon: Icons.trending, title: "Smart Growth", desc: "Supporting small businesses while protecting the unique character of our historic districts." },
  ];

  return (
    <section id="priorities" style={{ padding: "100px 24px", background: "white" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "3rem", color: THEME.colors.navy, margin: "0 0 16px" }}>
              Priorities for District 3
            </h2>
            <p style={{ fontSize: "1.2rem", color: THEME.colors.slate600, lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
              We're focusing on the issues that actually affect your daily life. No fluff, just results.
            </p>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          {points.map((p, i) => <PlatformCard key={i} {...p} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="get-involved" style={{ background: THEME.colors.navy, color: "white", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      {/* Background decoration */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.05, backgroundImage: "radial-gradient(circle at 70% 20%, white 0%, transparent 60%)" }}></div>

      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="grid-stack">
        
        <Reveal>
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "3rem", margin: "0 0 24px" }}>Join the Movement</h2>
          <p style={{ fontSize: "1.2rem", opacity: 0.8, marginBottom: 40, lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
            This campaign is powered by people like you. Sign up to volunteer, request a yard sign, or just stay updated on the latest news.
          </p>
          
          <div style={{ display: "flex", gap: 24, marginBottom: 40, fontFamily: "'Inter', sans-serif" }}>
             <div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: THEME.colors.primary, fontFamily: "'Montserrat', sans-serif" }}>$0</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.6 }}>Corporate Money</div>
             </div>
             <div style={{ width: 1, background: "rgba(255,255,255,0.2)" }}></div>
             <div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: THEME.colors.primary, fontFamily: "'Montserrat', sans-serif" }}>100%</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.6 }}>Grassroots</div>
             </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: "'Inter', sans-serif" }}>
             <a href="mailto:KBURKEFORARLINGTON@GMAIL.COM" style={{ color: "white", textDecoration: "none", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>✉️</div>
                KBURKEFORARLINGTON@GMAIL.COM
             </a>
             <a href="tel:6825525592" style={{ color: "white", textDecoration: "none", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>📞</div>
                (682) 552-5592
             </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <form style={{ background: "white", padding: 40, borderRadius: 16, color: THEME.colors.navy, fontFamily: "'Inter', sans-serif" }}>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "1.8rem", margin: "0 0 24px" }}>Let's stay in touch</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input type="text" placeholder="Full Name" style={{ width: "100%", padding: "16px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "1rem", outline: "none", background: "#f8fafc", fontFamily: "inherit" }} />
              <input type="email" placeholder="Email Address" style={{ width: "100%", padding: "16px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: "1rem", outline: "none", background: "#f8fafc", fontFamily: "inherit" }} />
              <div style={{ display: "flex", gap: 12 }}>
                 <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", color: THEME.colors.slate600 }}>
                    <input type="checkbox" /> I want a yard sign
                 </label>
                 <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", color: THEME.colors.slate600 }}>
                    <input type="checkbox" /> I can volunteer
                 </label>
              </div>
              <button style={{ background: THEME.colors.primary, color: "white", border: "none", padding: "16px", borderRadius: 8, fontWeight: 700, fontSize: "1rem", cursor: "pointer", marginTop: 8, fontFamily: "inherit" }}>
                Sign Me Up
              </button>
            </div>
          </form>
        </Reveal>

      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#020617", color: "rgba(255,255,255,0.4)", padding: "60px 24px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40 }}>
        <div>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "white" }}>KELLY R. BURKE</span>
          <p style={{ marginTop: 12, maxWidth: 300, lineHeight: 1.5, fontSize: "0.9rem" }}>
            Paid for by the Kelly Burke for Arlington Campaign.<br/>
            © 2026 All Rights Reserved.
          </p>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
           {/* Socials Placeholder */}
           {['Facebook', 'Twitter', 'Instagram'].map(s => (
             <a key={s} href="#" style={{ color: "white", textDecoration: "none", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{s}</a>
           ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ───
export default function KellyBurkeCampaignEnhanced() {
  return (
    <>
      <style>{`
        /* Updated Google Fonts Import for Montserrat and Inter */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; background: ${THEME.colors.cream}; }
        
        /* Utility for input focus */
        input:focus { border-color: ${THEME.colors.primary} !important; background: white !important; }
      `}</style>
      <div style={{ overflowX: "hidden" }}>
        <Navbar />
        <Hero />
        <StatsBar />
        <About />
        <Platform />
        <Contact />
        <Footer />
      </div>
    </>
  );
}