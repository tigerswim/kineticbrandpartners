import "@/app/kinetic.css";
import Image from "next/image";
import CalendlyButton from "@/components/CalendlyButton";
import ScrollReveal from "@/components/ScrollReveal";
import KineticNav from "@/components/kinetic/KineticNav";
import KineticFooter from "@/components/kinetic/KineticFooter";
import ParticleField from "@/components/kinetic/ParticleField";
import SpringHeadline from "@/components/kinetic/SpringHeadline";
import VideoFrame from "@/components/kinetic/VideoFrame";
import CountUp from "@/components/kinetic/CountUp";

export const metadata = {
  title: "Work - Kinetic Brand Partners",
  description:
    "Award-winning marketing campaigns and creative work by Dan Hoeller",
};

export default function WorkPage() {
  return (
    <div className="kinetic">
      <div className="grain" aria-hidden />
      <div id="kscrim" aria-hidden />
      <ParticleField scope="hero" />
      <ScrollReveal />
      <KineticNav active="/work" />

      <main>
        <header
          className="hero container"
          style={{
            minHeight: "58vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: "8rem",
            paddingBottom: "3rem",
            position: "relative",
            zIndex: 3,
          }}
        >
          <div className="eyebrow">Selected Work</div>
          <SpringHeadline lead="Making an impact on the" emphasis="business." />
          <p className="body" style={{ marginTop: "2rem" }}>
            From Clio-winning creative to data-driven digital campaigns &mdash; a
            selection of marketing work that delivered measurable impact and
            cultural resonance.
          </p>
        </header>

        {/* 01 #FlipTheTurf */}
        <section className="chapter container" id="ftt">
          <div className="ch-tag">
            <span className="idx">01 /</span> Central Garden &amp; Pet · Pennington Grass Seed
          </div>
          <h2 className="case-title" data-reveal>#FlipTheTurf</h2>
          <p className="case-meta" data-reveal>
            Provocative sports campaign · 2&times; Clio Sports Award winner
          </p>
          <p className="body" data-reveal>
            <strong>The Challenge:</strong> Grass seed is the ultimate
            low-involvement purchase. Yet artificial turf was driving a surge in
            player injuries, and Pennington had no natural platform to enter the
            national sports conversation.
          </p>
          <p className="body" data-reveal>
            <strong>The Approach:</strong> Partner with NFL star Von Miller on a
            deliberately provocative anti-turf campaign designed to get banned by
            the league &mdash; turning the NFL&apos;s censorship into free media
            and a grassroots movement.
          </p>
          <div className="media-grid two" data-reveal>
            <VideoFrame
              src="/videos/FTT-banned-ad.mp4"
              poster="/videos/FTT-banned-ad-poster.webp"
              label="Banned Ad"
            />
            <VideoFrame
              src="/videos/FTT-summary-video.mp4"
              poster="/videos/FTT-summary-video-poster.webp"
              label="Campaign Summary"
            />
          </div>
          <div className="case-slide" data-reveal>
            <Image
              src="/videos/FTT-summary-slide.webp"
              alt="FlipTheTurf campaign results summary"
              width={640}
              height={454}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <div className="results" data-reveal>
            <div className="results-title">The Impact</div>
            <div className="res-grid">
              <div>
                <CountUp value={3.95} suffix="B" />
                <div className="res-lbl">Media impressions</div>
              </div>
              <div>
                <CountUp value={31} suffix="K+" />
                <div className="res-lbl">Petition signatures</div>
              </div>
              <div>
                <CountUp plain="2×" />
                <div className="res-lbl">Clio Award winner</div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 Full Season */}
        <section className="chapter container" id="fullseason">
          <div className="ch-tag">
            <span className="idx">02 /</span> Central Garden &amp; Pet · Product Innovation
          </div>
          <h2 className="case-title" data-reveal>
            Pennington Full Season Fertilizer
          </h2>
          <p className="case-meta" data-reveal>
            Insight-led product innovation &amp; GTM
          </p>
          <p className="body" data-reveal>
            <strong>The Insight:</strong> Millennial homeowners didn&apos;t
            understand &mdash; and didn&apos;t want to commit to &mdash; the
            traditional 4-step fertilizer program. The complexity was a barrier
            to purchase.
          </p>
          <p className="body" data-reveal>
            <strong>The Approach:</strong> Defined and developed Full Season, a
            one-application-per-season fertilizer. Led cross-functional
            development and GTM, won Walmart distribution; their data showed it
            indexed higher with Millennials than the competition.
          </p>
          <div className="media-grid two" data-reveal>
            <VideoFrame
              src="/videos/GFANA_Hero30_MP4.mp4"
              poster="/videos/GFANA_Hero30_MP4-poster.webp"
              label="Brand Campaign :30"
            />
            <VideoFrame
              src="/videos/GFANA_FERT15.mp4"
              poster="/videos/GFANA_GARDEN15-poster.webp"
              label="Full Season :15"
            />
          </div>
          <div className="results" data-reveal>
            <div className="results-title">The Impact</div>
            <div className="res-grid">
              <div>
                <CountUp value={8.2} suffix="%" />
                <div className="res-lbl">Brand growth &mdash; 4&times; the category rate</div>
              </div>
              <div>
                <CountUp plain="#1" />
                <div className="res-lbl">
                  Millennial appeal vs. competition (Walmart data)
                </div>
              </div>
              <div>
                <CountUp plain="Multi-SKU" />
                <div className="res-lbl">Platform expansion enabled</div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 Johnson's Baby */}
        <section className="chapter container" id="jnj">
          <div className="ch-tag">
            <span className="idx">03 /</span> Johnson &amp; Johnson · Baby Care
          </div>
          <h2 className="case-title" data-reveal>Johnson&apos;s Baby</h2>
          <p className="case-meta" data-reveal>
            Emotional brand equity at Olympic scale
          </p>
          <p className="body" data-reveal>
            <strong>The Challenge:</strong> In a commoditized baby-care aisle,
            Johnson&apos;s Baby needed to reinforce its emotional equity.
          </p>
          <p className="body" data-reveal>
            <strong>The Approach:</strong> Two paths. Drive reach with
            &ldquo;Thanks, Mom,&rdquo; an Olympic campaign where athletes thanked
            their mothers &mdash; so compelling that Debbie Phelps <em>asked</em>{" "}
            to participate. And reinforce the mother-baby bond through emotional
            print and digital activations.
          </p>
          <div className="jnj-row" data-reveal>
            <div className="jnj-tm">
              <VideoFrame
                src="/videos/Thanks-Mom-Cullen.2.mp4#t=4"
                poster="/videos/Thanks-Mom-Cullen-poster.jpg"
                label="Thanks Mom — Cullen"
                ratio="auto"
              />
              <VideoFrame
                src="/videos/Thanks-Mom-Debbie.mp4"
                poster="/videos/Thanks-Mom-Debbie-poster.jpg"
                label="Thanks Mom — Debbie"
                ratio="auto"
              />
            </div>
            <div className="jnj-tall">
              <div className="cap">Gold Shampoo</div>
              <div className="imgwrap">
                <Image
                  src="/images/Gold-shampoo.webp"
                  alt="Johnson's Baby Gold Shampoo campaign"
                  width={400}
                  height={534}
                />
              </div>
            </div>
            <div className="jnj-tall">
              <div className="cap">Pink Lotion</div>
              <div className="imgwrap">
                <Image
                  src="/images/Pink-lotion.webp"
                  alt="Johnson's Baby Pink Lotion campaign"
                  width={510}
                  height={661}
                />
              </div>
            </div>
          </div>
          <div className="results" data-reveal>
            <div className="results-title">The Impact</div>
            <div className="res-grid">
              <div>
                <CountUp value={400} prefix="$" suffix="MM" />
                <div className="res-lbl">Portfolio P&amp;L</div>
              </div>
              <div>
                <CountUp value={9.8} suffix="%" />
                <div className="res-lbl">Sales growth</div>
              </div>
              <div>
                <CountUp value={290} suffix="MM" />
                <div className="res-lbl">Impressions</div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="halo" aria-hidden />
          <div className="container">
            <SpringHeadline as="h2" lead="Let's create something" emphasis="amazing." />
            <div className="contact-cta">
              <CalendlyButton className="btn">
                Get In Touch <span>&rarr;</span>
              </CalendlyButton>
              <a className="link" href="mailto:letstalk@kineticbrandpartners.com">
                letstalk@kineticbrandpartners.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <KineticFooter />
    </div>
  );
}
