import "@/app/kinetic.css";
import CalendlyButton from "@/components/CalendlyButton";
import ScrollReveal from "@/components/ScrollReveal";
import KineticNav from "@/components/kinetic/KineticNav";
import KineticFooter from "@/components/kinetic/KineticFooter";
import ParticleField from "@/components/kinetic/ParticleField";
import SpringHeadline from "@/components/kinetic/SpringHeadline";
import TiltCard from "@/components/kinetic/TiltCard";
import FramedImage from "@/components/kinetic/FramedImage";

export default function AboutPage() {
  return (
    <div className="kinetic">
      <div className="grain" aria-hidden />
      <div id="kscrim" aria-hidden />
      <ParticleField scope="hero" />
      <ScrollReveal />
      <KineticNav active="/about" />

      <main>
        <header className="hero container" style={{ minHeight: "62vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "8rem", paddingBottom: "3rem", position: "relative", zIndex: 3 }}>
          <div className="eyebrow">About · Dan Hoeller</div>
          <SpringHeadline lead="Beyond the" emphasis="resume." />
          <p className="body" style={{ marginTop: "2rem" }}>There&apos;s more to life than work, of course. I&apos;m lucky to have an incredible family, I love learning by doing, and I&apos;ve been an athlete my whole life &mdash; competitive swimming, cycling, and Ironman racing.</p>
        </header>

        <section className="chapter container" id="family">
          <div className="ch-tag"><span className="idx">01 /</span> What Matters Most</div>
          <div className="split">
            <FramedImage src="/images/family-sketch.webp" alt="Family sketch" width={800} height={533} ratio="3/2" className="frame--wide" />
            <div>
              <h2 className="sec-title" data-reveal>The home team.</h2>
              <p className="body" data-reveal>Along with my amazing wife, we wrangle three knuckleheads every day. It&apos;s been a joy to watch them grow &mdash; we still can&apos;t believe the oldest will be in college soon. Not pictured: our two dogs, a mini goldendoodle and a sheepadoodle. With only dudes and doodles in the house, my wife is a saint.</p>
            </div>
          </div>
        </section>

        <section className="chapter container" id="building">
          <div className="ch-tag"><span className="idx">02 /</span> Learning AI by Building</div>
          <h2 className="sec-title" data-reveal>I didn&apos;t take the course. <b>I built the thing.</b></h2>
          <p className="body" data-reveal>Instead of certifications, I chose to learn AI by building. Without writing code, I&apos;ve developed this website and the projects below &mdash; asking questions, making changes, fixing mistakes, always learning. Along the way I&apos;ve built a sharp sense for where the AI hype is justified, and where it isn&apos;t.</p>
          <div className="badges" data-reveal>
            <span>Claude Code</span><span>GitHub</span><span>Netlify</span><span>Supabase</span><span>Cloudflare</span><span>Google OAuth</span><span>n8n</span><span>Zapier</span><span>APIs</span>
          </div>
          <div className="cards cards-3">
            <TiltCard><h3>RacePrep</h3><p>A triathlon training app built to scratch my own itch for better visibility into swim, bike, and run training beyond Strava.</p><div className="stack"><span>Next.js</span><span>Supabase</span><span>TypeScript</span></div><a className="link" href="https://raceprep.kineticbrandpartners.com/" target="_blank" rel="noopener noreferrer">View Live &uarr;</a></TiltCard>
            <TiltCard><h3>Job Tracker</h3><p>Job hunting isn&apos;t about applying more &mdash; it&apos;s about networking smarter and tracking your actions. The job seeker&apos;s CRM.</p><div className="stack"><span>Next.js</span><span>Supabase</span><span>OAuth</span><span>n8n</span></div><a className="link" href="https://job-tracker.kineticbrandpartners.com/" target="_blank" rel="noopener noreferrer">View Live &uarr;</a></TiltCard>
            <TiltCard><h3>SaaS Metrics Calculator</h3><p>A dashboard for measuring key SaaS KPIs and seeing how they respond to assumptions. Shows leaders what actually matters.</p><div className="stack"><span>Next.js</span><span>TypeScript</span><span>Netlify</span></div><a className="link" href="https://saas-metrics-calculator.netlify.app/" target="_blank" rel="noopener noreferrer">View Live &uarr;</a></TiltCard>
          </div>
        </section>

        <section className="chapter container" id="athletics">
          <div className="ch-tag"><span className="idx">03 /</span> The Athletic Journey</div>
          <p className="body" data-reveal style={{ marginBottom: "3rem" }}>I&apos;ve been an athlete all my life &mdash; it taught me commitment, grit, teamwork, and time management. From walking onto the college swim team and becoming a four-year letterman and co-captain, to road and MTB cycling, to Ironman racing, I&apos;ve always been drawn to an active life.</p>
          <div className="split rev" style={{ marginBottom: "3.5rem" }}>
            <div>
              <h2 className="sec-title" data-reveal>Triathlon.</h2>
              <p className="body" data-reveal>My brother and college buddies were racing and having a blast &mdash; FOMO is a hell of a motivator. There&apos;s nothing like a Half or Full Ironman on the calendar to focus your training.</p>
            </div>
            <FramedImage src="/images/Ironman-sketch.webp" alt="Ironman" width={533} height={800} ratio="2/3" />
          </div>
          <div className="split">
            <FramedImage src="/images/Clemson-swimming-sketch.webp" alt="Collegiate swimming" width={533} height={800} ratio="2/3" />
            <div>
              <h2 className="sec-title" data-reveal>Collegiate swimming.</h2>
              <p className="body" data-reveal>I started on a summer swim team around age 6 and swam through college. I learned first-hand that the kids with determination often beat those with natural talent &mdash; the only way I made it as far as I did. The sport gave me lifelong friends, a strong work ethic, and a love for the water.</p>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="halo" aria-hidden />
          <div className="container">
            <SpringHeadline as="h2" lead="Let's" emphasis="connect." />
            <div style={{ display: "flex", gap: "1.4rem", alignItems: "center", justifyContent: "center", marginTop: "2.4rem", flexWrap: "wrap" }}>
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
