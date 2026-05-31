import "@/app/kinetic.css";
import CalendlyButton from "@/components/CalendlyButton";
import ScrollReveal from "@/components/ScrollReveal";
import KineticNav from "@/components/kinetic/KineticNav";
import KineticFooter from "@/components/kinetic/KineticFooter";
import ParticleField from "@/components/kinetic/ParticleField";
import SpringHeadline from "@/components/kinetic/SpringHeadline";
import TiltCard from "@/components/kinetic/TiltCard";
import FramedImage from "@/components/kinetic/FramedImage";
import CountUp from "@/components/kinetic/CountUp";

export default function Home() {
  return (
    <div className="kinetic">
      <div className="grain" aria-hidden />
      <div id="kscrim" aria-hidden />
      <ParticleField scope="page" />
      <ScrollReveal />
      <KineticNav active="/" />

      <main>
        <header className="hero container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "6rem", position: "relative", zIndex: 3 }}>
          <span className="eyebrow">Marketing Executive · Atlanta, GA</span>
          <SpringHeadline lead="Marketing in" emphasis="motion." />
          <p className="body" style={{ marginTop: "2rem" }}>15 years. Fortune 50 to Fortune 1000. I run full P&amp;Ls, build teams from scratch, and make work that wins awards and moves revenue.</p>
          <div style={{ display: "flex", gap: "1.4rem", alignItems: "center", marginTop: "2.4rem", flexWrap: "wrap" }}>
            <CalendlyButton className="btn">Schedule a Meeting <span>&rarr;</span></CalendlyButton>
            <a className="link" href="#story">Meet the operator &darr;</a>
            <a className="link" href="https://linkedin.com/in/danhoeller" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </header>

        <section className="chapter container" id="story" style={{ overflow: "hidden" }}>
          <div className="portrait-grid">
            <div className="portrait-inner">
              <div className="ch-tag"><span className="idx">01 /</span> The Operator</div>
              <p className="ch-quote" data-reveal>I hire well, stay in the work, and hold the team accountable to outcomes. Two Clio Awards and a <span className="em">$100MM+ P&amp;L</span> will tell you the approach works.</p>
            </div>
            <FramedImage src="/images/DJH-CGPT-Sketch.webp" alt="Dan Hoeller" width={533} height={800} ratio="2/3" parallax className="portrait-frame" />
          </div>
        </section>

        <section className="chapter container">
          <div className="split">
            <FramedImage src="/images/Ironman-sketch.webp" alt="Ironman" width={533} height={800} ratio="2/3" />
            <div>
              <div className="ch-tag"><span className="idx">02 /</span> How I Operate</div>
              <h2 className="sec-title" data-reveal>Endurance as an operating system.</h2>
              <p className="body" data-reveal>Four-year collegiate swim letterman, co-captain, and Ironman finisher. The same discipline that gets you through a 140.6 shows up in how I run a marketing org: long horizon, daily reps, no shortcuts. I lead like a player-coach &mdash; in the work, not above it.</p>
            </div>
          </div>
        </section>

        <section className="chapter container" id="work">
          <div className="ch-tag"><span className="idx">03 /</span> What I Bring</div>
          <h2 className="sec-title" data-reveal>Four disciplines, <b>one through-line:</b> connecting marketing investment to revenue.</h2>
          <div className="cards">
            <TiltCard><div className="num">01</div><h3>Leadership &amp; Scale</h3><p>Built and led a 25-person marketing org spanning Insights, Digital, Creative, Innovation, and Customer Marketing.</p></TiltCard>
            <TiltCard><div className="num">02</div><h3>P&amp;L Ownership</h3><p>Portfolios from $20MM to $100MM+, full responsibility from Gross Sales to EBIT.</p></TiltCard>
            <TiltCard><div className="num">03</div><h3>Data-Driven Marketing</h3><p>Marketing Mix Modeling, attribution frameworks, KPI dashboards. 25% efficiency gains.</p></TiltCard>
            <TiltCard><div className="num">04</div><h3>Creative Excellence</h3><p>Clio Award-winning campaigns. 3.95B impressions. 10-point brand awareness lifts.</p></TiltCard>
          </div>
        </section>

        <section className="chapter container">
          <div className="ch-tag"><span className="idx">04 /</span> The Impact</div>
          <div className="res-grid">
            <div data-reveal="scale" data-delay="1"><CountUp value={3.95} suffix="B" /><div className="res-lbl">Media impressions &mdash; #FlipTheTurf, 2&times; Clio winner</div></div>
            <div data-reveal="scale" data-delay="2"><CountUp value={8.2} suffix="%" /><div className="res-lbl">Brand growth &mdash; 4&times; the category rate</div></div>
            <div data-reveal="scale" data-delay="3"><CountUp plain="+25%" /><div className="res-lbl">Marketing efficiency via MMM &amp; attribution</div></div>
          </div>
        </section>

        <section className="chapter container" id="exp">
          <div className="ch-tag"><span className="idx">05 /</span> Where I&apos;ve Operated</div>
          <div className="exp-item" data-reveal data-delay="1"><span className="exp-yr">2013 &mdash; 2024</span><div><div className="exp-co">Central Garden &amp; Pet</div><div className="exp-role">SVP Marketing · 11 years</div><p className="exp-desc">Led marketing for the $1.5B Garden segment. Built and managed a 25-person team across brand development and marketing plans for a multi-brand portfolio.</p></div></div>
          <div className="exp-item" data-reveal data-delay="2"><span className="exp-yr">2006 &mdash; 2013</span><div><div className="exp-co">Johnson &amp; Johnson</div><div className="exp-role">Brand Management · 7 years</div><p className="exp-desc">Consumer and Medical Device divisions. Multiple brands, $80MM+ portfolio responsibility, award-winning campaigns.</p></div></div>
          <div className="exp-item exp-item--last" data-reveal data-delay="3"><span className="exp-yr">1999 &mdash; 2004</span><div><div className="exp-co">Manhattan Associates</div><div className="exp-role">Enterprise Tech · 5 years</div><p className="exp-desc">Supply chain software implementations for Fortune 500 clients. Built a foundation in technology, complex B2B sales cycles, and operational excellence.</p></div></div>
        </section>

        <section className="contact" id="contact">
          <div className="halo" aria-hidden />
          <div className="container">
            <SpringHeadline as="h2" lead="Let's set things" emphasis="in motion." />
            <div className="contact-cta">
              <CalendlyButton className="btn">Schedule 30 Min <span>&rarr;</span></CalendlyButton>
              <a className="link" href="mailto:letstalk@kineticbrandpartners.com">letstalk@kineticbrandpartners.com</a>
            </div>
          </div>
        </section>
      </main>

      <KineticFooter />
    </div>
  );
}
