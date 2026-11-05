import React from "react";

const links = {
  email: "mailto:arpanmandal035@gmail.com",
  github: "https://github.com/arpanmandal035-sketch",
  instagram: "https://www.instagram.com/heartless._.arpan/",
  linkedin: "https://www.linkedin.com/in/arpan-mandal-5b417a418/",
  whatsapp: "https://wa.me/919002605307",
};

export default function App() {
  return (
    <main>
      <style>{`
        :root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #050711; color: #f3f5ff; font-synthesis: none; text-rendering: optimizeLegibility; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; min-width: 320px; }
        a { color: inherit; }
        .shell { width: min(1080px, calc(100% - 40px)); margin: auto; }
        header { height: 78px; display:flex; align-items:center; justify-content:space-between; border-bottom: 1px solid #ffffff14; }
        .brand { font-weight: 800; letter-spacing: -.04em; text-decoration:none; font-size:20px; }
        .brand span { color:#64e8ff; }
        nav { display:flex; gap:26px; color:#b8bfd1; font-size:14px; }
        nav a { text-decoration:none; }
        nav a:hover, .text-link:hover { color:#64e8ff; }
        .hero { min-height: 630px; display:grid; align-content:center; padding:90px 0; position:relative; }
        .hero:before { content:""; position:absolute; width:460px; height:460px; border-radius:50%; background:#5b4dff25; filter:blur(100px); right:4%; top:18%; pointer-events:none; }
        .eyebrow { color:#64e8ff; text-transform:uppercase; letter-spacing:.18em; font-size:12px; font-weight:700; }
        h1 { max-width:850px; margin:22px 0; font-size:clamp(48px, 8vw, 86px); line-height:.99; letter-spacing:-.07em; }
        h1 span { color:#64e8ff; }
        .intro { max-width:610px; color:#aeb5c8; font-size:18px; line-height:1.75; }
        .actions { display:flex; flex-wrap:wrap; gap:14px; margin-top:28px; }
        .button { border:1px solid #ffffff25; border-radius:999px; padding:13px 20px; text-decoration:none; font-size:14px; font-weight:700; transition:.2s; }
        .button.primary { color:#041018; background:#64e8ff; border-color:#64e8ff; }
        .button:hover { transform:translateY(-2px); }
        section { padding:82px 0; border-top:1px solid #ffffff14; }
        .section-title { font-size:12px; color:#64e8ff; letter-spacing:.18em; text-transform:uppercase; font-weight:700; }
        h2 { font-size:clamp(32px,5vw,48px); letter-spacing:-.05em; margin:14px 0 20px; }
        .about { max-width:740px; font-size:18px; color:#aeb5c8; line-height:1.8; }
        .cards { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:30px; }
        .card { background:linear-gradient(145deg,#101528,#090c17); border:1px solid #ffffff16; border-radius:18px; padding:25px; min-height:170px; }
        .card h3 { margin:0 0 12px; font-size:20px; }
        .card p { color:#aeb5c8; line-height:1.7; margin:0; }
        .contact { display:flex; flex-wrap:wrap; gap:20px; margin-top:26px; }
        .text-link { color:#d9deed; text-decoration:none; border-bottom:1px solid #64e8ff70; padding-bottom:4px; }
        footer { padding:28px 0 40px; color:#858da3; font-size:13px; border-top:1px solid #ffffff14; }
        @media(max-width:680px) { .shell { width:min(100% - 32px,1080px); } nav { gap:14px; font-size:12px; } nav a:nth-child(2) { display:none; } .hero { min-height:560px; } .intro { font-size:16px; } section { padding:64px 0; } .cards { grid-template-columns:1fr; } }
      `}</style>
      <div className="shell">
        <header>
          <a className="brand" href="#home">ARPAN<span>.</span></a>
          <nav aria-label="Main navigation">
            <a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a>
          </nav>
        </header>
        <section id="home" className="hero" style={{ borderTop: 0 }}>
          <div className="eyebrow">AI Developer · Web Developer · Video Editor</div>
          <h1>Ideas into<br /><span>digital reality.</span></h1>
          <p className="intro">I’m Arpan Mandal. I build useful AI-powered experiences, modern websites, and creative video that help ideas make an impact.</p>
          <div className="actions">
            <a className="button primary" href={links.email}>Let’s work together ↗</a>
            <a className="button" href="#services">Explore what I do ↓</a>
          </div>
        </section>
        <section id="about">
          <div className="section-title">A little about me</div>
          <h2>Curious by nature.<br />Creative by design.</h2>
          <p className="about">I bring technology and creativity together—from experimenting with generative AI to crafting clean web experiences and editing engaging videos. I enjoy turning a rough idea into something people can use and remember.</p>
        </section>
        <section id="services">
          <div className="section-title">What I do</div>
          <h2>Ways I can help</h2>
          <div className="cards">
            <article className="card"><h3>AI & automation</h3><p>Practical AI-powered tools and workflows built around real needs.</p></article>
            <article className="card"><h3>Web development</h3><p>Responsive, modern websites with a clear visual identity and smooth experience.</p></article>
            <article className="card"><h3>Video & design</h3><p>Short-form video editing, visual content, and thoughtful digital design.</p></article>
          </div>
        </section>
        <section id="contact">
          <div className="section-title">Have a project in mind?</div>
          <h2>Let’s make it happen.</h2>
          <p className="about">Tell me what you’re working on. I’d love to hear about it.</p>
          <div className="contact">
            <a className="text-link" href={links.email}>Email</a>
            <a className="text-link" href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="text-link" href={links.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a className="text-link" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="text-link" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>
        <footer>© {new Date().getFullYear()} Arpan Mandal · Made with care.</footer>
      </div>
    </main>
  );
}
