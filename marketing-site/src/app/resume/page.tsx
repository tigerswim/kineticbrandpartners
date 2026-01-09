// Resume page - Full professional resume with PDF download
// Uses shared Kinetic Design System

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientMesh from "@/components/GradientMesh";
import "../../styles/kinetic-design-system.css";
import "../../styles/resume.css";

export const metadata: Metadata = {
  title: 'Resume | Dan Hoeller | Kinetic Brand Partners',
  description: 'Professional resume - P&L-focused marketing executive with 15+ years of experience driving growth, brand transformation, and digital innovation.',
};

export default function Resume() {
  return (
    <div className="kinetic-page">
      <GradientMesh />
      <Header />

      <main>
        {/* Hero */}
        <section className="resume-hero">
          <div className="kinetic-container">
            <p className="resume-hero-eyebrow">Resume</p>
            <h1 className="resume-hero-title">Dan Hoeller</h1>
            <p className="resume-hero-subtitle">
              Atlanta, GA · <a href="https://linkedin.com/in/danhoeller" target="_blank" rel="noopener noreferrer">linkedin.com/in/danhoeller</a>
            </p>
            <div className="resume-hero-cta">
              <a
                href="/Dan-Hoeller-Resume.pdf"
                download
                className="kinetic-btn kinetic-btn--primary"
              >
                Download Resume PDF
              </a>
              <Link href="/#contact" className="kinetic-btn kinetic-btn--secondary">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="kinetic-section kinetic-section--alt">
          <div className="kinetic-container">
            <h2 className="kinetic-section-title">Executive Summary</h2>
            <p className="resume-summary">
              P&amp;L-focused marketing executive with 15+ years of experience driving growth, brand transformation, and digital innovation for top brands in the CPG and Lawn &amp; Garden industries. Strong track record in creating award-winning campaigns that leverage data-driven insights and creative storytelling to deliver sales growth. Strengths include setting strategic vision, bringing a holistic business perspective to decision-making, championing the consumer, and building and leading successful teams with a player-coach management style.
            </p>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="kinetic-section">
          <div className="kinetic-container">
            <h2 className="kinetic-section-title">Core Competencies</h2>
            <div className="competencies-grid">
              <div className="kinetic-card">
                <h3 className="kinetic-card-title">Strategic Perspective</h3>
                <p className="kinetic-card-text">
                  Strategic Planning | Marketing Strategy | GTM (B2B2C, Omnichannel, DTC) | Innovation
                </p>
              </div>
              <div className="kinetic-card">
                <h3 className="kinetic-card-title">Financial Management &amp; Performance</h3>
                <p className="kinetic-card-text">
                  P&amp;L Management | Revenue &amp; Margin Growth | Pricing | Scenario Planning
                </p>
              </div>
              <div className="kinetic-card">
                <h3 className="kinetic-card-title">Brand &amp; Marketing Execution</h3>
                <p className="kinetic-card-text">
                  Brand Architecture &amp; Visual Identity | Performance Marketing | Marketing Insights | Creative Development | Digital Transformation | MarTech Stack | Agency Selection &amp; Management
                </p>
              </div>
              <div className="kinetic-card">
                <h3 className="kinetic-card-title">Leadership &amp; Team Development</h3>
                <p className="kinetic-card-text">
                  Cross-functional Leadership | Change Management | Servant Leadership
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="kinetic-section kinetic-section--alt">
          <div className="kinetic-container">
            <h2 className="kinetic-section-title">Professional Experience</h2>

            {/* Central Garden & Pet */}
            <div className="resume-exp-company">
              <div className="resume-exp-logo">
                <svg
                  viewBox="0 0 453.29 164.44"
                  width={190}
                  height={69}
                  aria-label="Central Garden & Pet"
                  role="img"
                >
                  <path fill="#006e43" d="M188.19,108.36h4.45v4a7.31,7.31,0,0,1-3.3.62c-3.77,0-6.24-2.22-6.24-5.48s2.45-5.43,6.22-5.43a10.07,10.07,0,0,1,4.26,1l.15-1.58a10,10,0,0,0-4.39-1c-4.81,0-8,2.85-8,7s3.21,7,8,7a9.85,9.85,0,0,0,4.85-1.13v-6.53h-6.07Z"/>
                  <path fill="#006e43" d="M206.88,100.67l-5.65,13.65H203l1.26-3.17h7.21l1.27,3.17h1.74l-5.64-13.65Zm-2.1,9.06,3.07-7.33,3.07,7.33Z"/>
                  <path fill="#006e43" d="M232.68,105.38c0-3.23-2.2-4.71-4.77-4.71h-6v13.65h1.66V110h4.34l3.44,4.28h2.08l-3.76-4.57A4.43,4.43,0,0,0,232.68,105.38Zm-5,3.16h-4.18v-6.36h4.18a3,3,0,0,1,3.26,3.21A3.09,3.09,0,0,1,227.72,108.54Z"/>
                  <path fill="#006e43" d="M246.72,100.67h-5.59v13.65h5.57c4.57,0,6.91-2.63,6.91-6.82C253.61,103.47,251.28,100.67,246.72,100.67Zm-.10,12.13h-3.83V102.18h3.83c3.53,0,5.3,2,5.3,5.32S250.15,112.8,246.62,112.8Z"/>
                  <polygon fill="#006e43" points="263.59 108.06 270.67 108.06 270.67 106.55 263.59 106.55 263.59 102.17 271.72 102.17 271.72 100.67 261.93 100.67 261.93 114.32 271.93 114.32 271.93 112.82 263.59 112.82 263.59 108.06"/>
                  <polygon fill="#006e43" points="290.9 111.86 281.62 100.67 279.88 100.67 279.88 114.32 281.55 114.32 281.55 103.17 290.82 114.32 292.56 114.32 292.56 100.67 290.9 100.67 290.9 111.86"/>
                  <path fill="#006e43" d="M323,106.9h-1.53a6.48,6.48,0,0,1-.9,4l-4.44-4.19c-1-1-1.58-1.6-1.58-2.81s1.27-2,2.86-2a7.06,7.06,0,0,1,2.9.63l.2-1.46a8.24,8.24,0,0,0-3.12-.62c-2.49,0-4.47,1.25-4.47,3.46a4,4,0,0,0,1.18,2.78,4.4,4.4,0,0,0-2.6,3.72c0,2.43,2.13,4.1,5.1,4.1a5.86,5.86,0,0,0,4.08-1.5l1.38,1.3h2.23l-2.56-2.44A7.91,7.91,0,0,0,323,106.9ZM316.57,113c-2,0-3.48-1.06-3.48-2.62a3,3,0,0,1,1.82-2.71l4.63,4.26A4.16,4.16,0,0,1,316.57,113Z"/>
                  <path fill="#006e43" d="M348.12,100.67h-6v13.65h1.66V110h4.38a4.54,4.54,0,0,0,4.76-4.66A4.41,4.41,0,0,0,348.12,100.67Zm-.19,7.87h-4.19v-6.36h4.19a3,3,0,0,1,3.25,3.21A3.08,3.08,0,0,1,347.93,108.54Z"/>
                  <polygon fill="#006e43" points="362.4 108.06 369.48 108.06 369.48 106.55 362.4 106.55 362.4 102.17 370.54 102.17 370.54 100.67 360.75 100.67 360.75 114.32 370.75 114.32 370.75 112.82 362.4 112.82 362.4 108.06"/>
                  <polygon fill="#006e43" points="377.68 102.21 382.25 102.21 382.25 114.32 383.9 114.32 383.9 102.21 388.47 102.21 388.47 100.67 377.68 100.67 377.68 102.21"/>
                  <polygon fill="#006e43" points="227.33 82.19 210.19 82.19 210.19 74.8 223.6 74.8 223.6 68.02 210.19 68.02 210.19 61.03 226.65 61.03 225.39 54.36 202.18 54.36 202.18 88.87 226.06 88.87 227.33 82.19"/>
                  <polygon fill="#006e43" points="263.87 54.36 256 54.36 256 76.45 241.81 54.36 233.68 54.36 233.68 88.87 241.55 88.87 241.55 66.78 255.64 88.87 263.87 88.87 263.87 54.36"/>
                  <polygon fill="#006e43" points="270.14 54.36 268.97 61.03 279.16 61.03 279.16 88.87 288 88.87 288 61.03 298.51 61.03 297.11 54.36 270.14 54.36"/>
                  <polygon fill="#006e43" points="388.8 82.19 388.8 54.36 380.78 54.36 380.78 88.87 403.9 88.87 405.17 82.19 388.8 82.19"/>
                  <path fill="#006e43" d="M193.57,87.52V79.71a16.94,16.94,0,0,1-9.66,2.79c-5.75,0-11.18-3.51-11.18-10.86,0-6.83,4.66-10.92,11.38-10.92,6.06,0,9.26,2.33,9.46,2.48v-8a28.32,28.32,0,0,0-9.25-1.42c-12.21,0-19.66,8.17-19.66,18.62,0,11.28,8.74,17.13,18.78,17.13A24.55,24.55,0,0,0,193.57,87.52Z"/>
                  <path fill="#006e43" d="M360.92,54.36h-7.79l-8,21.57h-4.28l-2.48,6.7h4.29l-2.3,6.24h7.92l2.17-6.21h12.88l2.17,6.21h8.13Zm-8.11,21.57,4.08-11.69L361,75.93Z"/>
                  <path fill="#006e43" d="M326.1,75.83A12.29,12.29,0,0,0,328,75c3.35-1.88,5-5,5-9.44,0-11.2-10.93-11.2-12.93-11.2H304V88.87h8V76.76h5.43l7.67,12.11h9.52Zm-3.8-5.74H312V61H322.3l3,4.53Z"/>
                  <path fill="#006e43" d="M51.09,116.33h4V73.18a51.63,51.63,0,0,0-4,43.15Z"/>
                  <path fill="#006e43" d="M60.31,65.77v50.56h7V58.94A51.64,51.64,0,0,0,60.31,65.77Z"/>
                  <path fill="#006e43" d="M106,70.56l4.72-3.14L151.12,94.2a52.05,52.05,0,0,0-1.82-9.57L117.06,63.24l4.73-3.13L146,76.17a51.84,51.84,0,0,0-17.31-19.84l-.29-.2a52.43,52.43,0,0,0-5.23-3.05c-.65-.33-1.3-.65-2-.95L79.46,79.83V73.56l35.79-23.74a52,52,0,0,0-9.56-2L79.46,65.2V58.93L96.62,47.55A51.35,51.35,0,0,0,73.36,54.7l-.86.52v61.11h7V88.19L99.74,74.74,120,88.19v28.14h7V92.81l5.22,3.46v20.06h7V100.9l5.22,3.46v12h4a51.28,51.28,0,0,0,2.11-7.92,52.72,52.72,0,0,0,.82-7.81Z"/>
                  <rect fill="#006e43" x="95.37" y="98.22" width="8.71" height="18.1"/>
                </svg>
              </div>
              <div className="resume-exp-content">
                <div className="resume-exp-header">
                  <h3 className="resume-company-name">Central Garden &amp; Pet</h3>
                  <p className="resume-company-years">2013–2024 · Atlanta, GA</p>
                  <p className="resume-company-desc">
                    $3B+ manufacturer + distributor of lawn, garden, and pet supplies; Member of Central Leadership Council and managed 25 people across Insights, Innovation, Digital, Creative, Customer Marketing, and Customer Care.
                  </p>
                </div>

                {/* Role 1 */}
                <div className="resume-role">
                  <h4 className="resume-role-title">Senior Vice President of Marketing: Garden Segment</h4>
                  <p className="resume-role-years">Nov 2019 – Oct 2024</p>
                  <ul className="resume-role-bullets">
                    <li><strong>Brand Transformation:</strong> Grew the $250MM Pennington lawn and garden brand 8.2% in 2024, 4x the category growth rate, by leading comprehensive brand transformation initiatives, including improved positioning, visual identity, and product development.</li>
                    <li><strong>Award-Winning Creative:</strong> Created and led the #FlipTheTurf campaign that generated 3.95 billion media impressions, won two Clio Sports Awards, and helped boost brand awareness by 10 points.</li>
                    <li><strong>New Product Launches:</strong> Developed a multi-year innovation pipeline that consistently launched $20MM+ in sustainable, category-leading solutions annually.</li>
                    <li><strong>Digital Transformation:</strong> Led cross-functional teams to build top-tier Product Detail Pages using Salsify and Vizit, earning retailer "Best in Class" recognition and driving higher conversion rates.</li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div className="resume-role">
                  <h4 className="resume-role-title">Vice President of Marketing: Garden Segment</h4>
                  <p className="resume-role-years">Nov 2017 – Nov 2019</p>
                  <ul className="resume-role-bullets">
                    <li><strong>Revenue Growth:</strong> Secured $7MM in incremental revenue with The Home Depot through executive-level partnership negotiations.</li>
                    <li><strong>Marketing Effectiveness:</strong> Guided teams using Marketing Mix Modeling (MMM) and real-time KPI dashboards, delivering a 25% increase in efficiency.</li>
                    <li><strong>Partnership Expansion:</strong> Expanded MLB partnership to 9 teams, driving in-store traffic and amplifying promotional impact.</li>
                  </ul>
                </div>

                {/* Role 3 */}
                <div className="resume-role">
                  <h4 className="resume-role-title">Senior Director / Director of Marketing: Grass Seed Business Unit</h4>
                  <p className="resume-role-years">Apr 2013 – Nov 2017</p>
                  <ul className="resume-role-bullets">
                    <li><strong>Financial Performance:</strong> Delivered 98.8% EBIT growth in 2016 and an additional 12% in 2017 through margin-accretive new product launches and strategic price optimization.</li>
                    <li><strong>Product Innovation:</strong> Upgraded and launched best-in-category grass repair product, driving sales +36.7% at +840bp higher margins in 2016.</li>
                    <li><strong>Digital Transformation:</strong> Relaunched the Pennington brand website, increasing sessions by 295% and tested DTC with Shopify.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Johnson & Johnson */}
            <div className="resume-exp-company">
              <div className="resume-exp-logo">
                <svg
                  viewBox="0 0 1000 181.354"
                  width={180}
                  height={32}
                  aria-label="Johnson & Johnson"
                  role="img"
                >
                  <g transform="matrix(2.5252523,0,0,2.5252523,-946.16986,-1244.8008)">
                    <g fill="#d51900" fillRule="evenodd" transform="matrix(3.3220133,0,0,3.3220133,374.68251,490.3022)">
                      <g transform="translate(-137,-447)">
                        <g transform="translate(137,447)">
                          <path d="m 43.252689,8.6221987 c 0,-0.1962914 0.13351,-0.3011921 0.301192,-0.3011921 0.283708,0 0.712053,0.3011921 0.953642,0.9035762 -0.08662,0 -0.216953,0.026225 -0.304371,0.026225 -0.516556,0 -0.950463,-0.245563 -0.950463,-0.6286093 z m -31.252451,0 c 0,-0.1962914 0.127947,-0.3011921 0.302782,-0.3011921 0.276556,0 0.687417,0.3011921 0.925828,0.9035762 -0.797881,0 -1.22861,-0.1724503 -1.22861,-0.6023841 z M 18.028053,5.509351 c 0,-3.2225166 0.627814,-3.7176159 0.822516,-3.7176159 0.346491,0 0.387815,0.2161589 0.387815,1.4519205 0,1.2699338 -0.541192,2.9316557 -1.210331,3.8439735 z M 39.97057,8.6865695 c -0.371921,0.5181457 -0.673113,1.2540398 -0.673113,2.2021195 0,1.815894 1.035497,3.549139 3.047682,3.549139 1.945431,0 3.308344,-1.536954 3.308344,-3.680265 0,-0.622252 -0.02384,-0.70808 -0.06437,-0.9663577 0.452185,-0.1970861 0.842384,-0.4982781 1.14596,-0.7390728 0.258278,-0.194702 0.451391,-0.3035762 0.605563,-0.3035762 0.193907,0 0.27894,0.1517881 0.27894,0.4323179 l 0,4.2405298 c 0,0.690596 0.218543,1.016424 0.756557,1.016424 0.495894,0 0.844768,-0.34808 1.03788,-0.758146 0.715232,-1.491655 1.750729,-3.48 2.202914,-4.2349668 0.108874,-0.173245 0.197086,-0.3059602 0.259073,-0.3059602 0.08662,0 0.131126,0.06596 0.131126,0.3456953 l 0,3.3758937 c 0,0.949669 0.433907,1.577484 1.381192,1.577484 0.996556,0 1.490861,-0.954437 2.361854,-2.423841 0.04133,-0.08821 0.0596,-0.150994 0.0596,-0.213775 0,-0.194702 -0.168477,-0.305166 -0.342517,-0.305166 -0.196291,0 -0.304371,0.196292 -0.951258,0.90755 -0.131126,0.135099 -0.258278,0.322649 -0.498278,0.322649 -0.08583,0 -0.151788,-0.104106 -0.151788,-0.236026 l 0,-3.7843713 c 0,-1.0164239 -0.45457,-1.4264901 -1.037881,-1.4264901 -0.474437,0 -0.865431,0.194702 -1.275497,0.8002649 -0.735099,1.0831788 -1.491655,2.6193375 -1.900927,3.3933775 -0.04609,0.0906 -0.108079,0.219338 -0.150199,0.219338 -0.0453,0 -0.06437,-0.06676 -0.06437,-0.219338 l 0,-2.7671523 c 0,-0.7978808 -0.216159,-1.4264901 -1.060928,-1.4264901 -0.886887,0 -1.339867,0.6063576 -1.988344,1.0593378 -0.410861,0.3059602 -0.777219,0.5197351 -1.056954,0.6492715 -0.434702,-1.1022517 -1.233377,-1.6609272 -1.903311,-1.6442384 -0.672318,0.023046 -1.14755,0.4362914 -1.14755,1.1284768 0,0.7096689 0.434702,1.2039735 1.01563,1.424106 0.322649,0.1295367 0.626225,0.1541717 1.060927,0.1541717 0.130331,0 0.259073,0 0.342516,-0.02463 0.04609,0.215364 0.02543,0.522119 0.02543,0.75894 0,1.060927 -0.62702,2.117086 -1.792848,2.117086 -1.21351,0 -1.923973,-1.167417 -1.923973,-2.50649 0,-1.0172184 0.301192,-1.8588078 0.794702,-2.4405297 0.19947,-0.2177483 0.348079,-0.3496689 0.348079,-0.5491391 0,-0.1009271 -0.148609,-0.1263576 -0.279735,-0.1263576 -0.823311,0 -1.728477,0.3687417 -2.353907,0.6913907 -0.825696,0.4331126 -1.796027,1.1491391 -2.597086,1.8619868 -0.38861,-0.8670199 -0.863842,-1.6235762 -1.103047,-2.2092715 -0.08583,-0.2376159 -0.148609,-0.5133775 -0.321854,-0.5133775 -0.153377,0 -0.220133,0.1509934 -0.325828,0.4490066 -0.387814,1.146755 -2.464371,4.5003973 -2.918146,4.9541723 -0.04291,0.06199 -0.105695,0.130331 -0.126357,0.130331 -0.04689,0 -0.07152,-0.02146 -0.07152,-0.153377 l 0,-3.7843713 c 0,-1.0164239 -0.410067,-1.4264901 -0.967947,-1.4264901 -0.477616,0 -0.886888,0.194702 -1.275497,0.8002649 -0.712053,1.0831788 -1.580662,2.6614575 -1.989934,3.4378805 -0.06596,0.13351 -0.131126,0.174835 -0.153377,0.174835 -0.02146,0 -0.03894,-0.08583 -0.03894,-0.219338 l 0,-2.7671523 c 0,-1.0164239 -0.41245,-1.4264901 -0.975099,-1.4264901 -0.476821,0 -0.928212,0.1772186 -1.297748,0.8002649 -0.905961,1.5369537 -2.418279,3.8932455 -2.699603,4.2794705 -0.04371,0.06676 -0.08742,0.110463 -0.130331,0.131126 -0.04291,0 -0.06755,-0.04212 -0.06755,-0.149404 l 0,-3.6349673 c 0,-1.0164239 -0.410066,-1.4264901 -0.968742,-1.4264901 -0.779602,0 -1.209536,0.7168212 -1.493245,1.1682119 -0.390993,0.6270199 -0.907549,1.4717881 -1.316821,2.2513905 -0.282119,0.521325 -0.521324,0.993378 -0.608742,0.993378 -0.04132,0 -0.04132,-0.196292 -0.04132,-0.562649 l 0,-2.8958943 c 1.359735,-1.5162914 2.203709,-3.3735099 2.203709,-5.4055629 0,-1.1698013 -0.516557,-1.8150994 -1.314438,-1.8150994 -1.494834,0 -2.637615,2.3356292 -2.637615,5.1003974 l 0,2.2482119 C 15.586733,8.7938593 14.937461,9.00525 14.136401,9.1618063 13.72713,7.9538593 12.860905,7.3260447 12.171898,7.3427335 c -0.668344,0.023046 -1.14596,0.4362914 -1.14596,1.1284768 0,1.1443709 1.124503,1.6196027 2.116291,1.6196027 l 0.281325,0 c 0.04212,0.217748 0.04212,0.456159 0.04212,0.69298 0,1.060927 -0.626225,2.117086 -1.790464,2.117086 -1.209536,0 -1.9247679,-1.167417 -1.9247679,-2.50649 0,-1.0172184 0.2996029,-1.8588078 0.7970859,-2.4405297 0.196292,-0.2177483 0.348874,-0.4124503 0.348874,-0.5491391 0,-0.1009271 -0.152582,-0.1263576 -0.283708,-0.1263576 -0.8209274,0 -2.6344373,1.1070199 -4.7976161,3.2686094 C 5.6235497,8.8169007 5.4058013,7.1289536 5.4058013,5.4855099 c 0,-1.8365563 0.3631788,-3.3965563 0.4498013,-3.8463576 0.043709,-0.2789404 0.070728,-0.4545695 0.070728,-0.5817218 0,-0.17403977 -0.092185,-0.26304639 -0.3250331,-0.26304639 -1.7531126,0 -5.6010595894,2.79019869 -5.6010595894,6.96238409 0,2.9586758 1.0831787894,4.3867548 2.9602648894,6.2241058 -1.1396026,1.838146 -2.05350992,4.020398 -2.05350992,5.966623 0,1.402649 0.32741722,2.465165 1.36211922,2.465165 2.1623841,0 3.7819867,-4.494039 3.7819867,-7.82543 0,-0.993378 -0.039735,-1.989139 -0.1247682,-2.981722 C 6.7234172,10.757563 7.956,9.6155762 8.2563974,9.5074967 8.1276556,9.9620662 8.0410331,10.438887 8.0410331,10.888689 c 0,1.815894 1.0394702,3.549139 3.0476819,3.549139 1.883444,0 3.30755,-1.536954 3.30755,-3.680265 0,-0.276556 -0.02225,-0.517351 -0.04133,-0.7756292 0.688212,-0.1295365 1.32159,-0.306755 1.924769,-0.6683444 l 0,4.3446356 c 0,0.55947 0.386225,0.779603 0.754172,0.779603 0.499867,0 0.75894,-0.34808 1.122914,-1.143576 0.30596,-0.651656 1.124503,-2.141722 1.621192,-3.030994 0.391788,-0.6937746 0.607947,-1.1443706 0.781987,-1.1443706 0.04053,0 0.08662,0.1056954 0.08662,0.3655629 l 0,3.6977487 c 0,0.994967 0.51894,1.255629 0.967947,1.255629 0.432318,0 0.715232,-0.237616 0.996556,-0.627815 1.125298,-1.601324 2.315762,-3.501457 2.787815,-4.3255627 0.08742,-0.1478145 0.194702,-0.2598675 0.282119,-0.2598675 0.08424,0 0.127947,0.046887 0.127947,0.3242384 l 0,3.8725828 c 0,0.690596 0.216159,1.016424 0.75894,1.016424 0.494305,0 0.817749,-0.34808 1.010861,-0.758146 0.718411,-1.491655 1.77457,-3.460132 2.230729,-4.2349668 0.105695,-0.173245 0.214569,-0.3258278 0.27894,-0.3258278 0.0898,0 0.109669,0.1056954 0.109669,0.3886093 l 0,3.6747023 c 0,0.994967 0.518941,1.255629 0.975894,1.255629 0.6,0 0.993378,-0.434702 1.381987,-0.929801 0.708874,-0.933775 1.74755,-2.591524 2.375364,-3.6556296 0.217749,0.3472846 0.45298,0.7589406 0.650861,1.2119206 -0.519735,0.62702 -1.03947,1.338278 -1.03947,2.09404 0,0.801059 0.561854,1.27947 1.14596,1.27947 0.992583,0 1.899338,-0.954437 1.899338,-2.270464 0,-0.517351 -0.148609,-1.059337 -0.341722,-1.576688 0.881325,-0.8670204 1.942252,-1.7101992 2.724238,-1.9041065 z M 4.3647417,13.399152 c 0.1748345,1.144371 0.3266225,2.271259 0.3266225,3.155762 0,2.071788 -0.6898013,4.49404 -1.8794702,4.474172 -0.4593377,0 -0.8455629,-0.459338 -0.8646357,-1.254834 -0.043709,-2.591524 1.1880794,-4.797616 2.4174834,-6.3751 z M 35.924742,11.925775 c 0.131125,0.37192 0.197086,0.672318 0.197086,0.975099 0,0.34649 -0.130331,0.69298 -0.369537,0.69298 -0.170066,0 -0.343311,-0.194702 -0.343311,-0.498278 0,-0.325033 0.279735,-0.843973 0.515762,-1.169801 z M 5.1451391,1.616106 c 0,0.1319205 -0.3027815,0.7350993 -0.6905961,1.8174834 -0.4108609,1.1221192 -0.802649,2.7202649 -0.802649,4.6450331 0,1.1459603 0.2837087,2.6614575 0.5229139,4.1952315 l -0.6921854,0.93298 C 2.3787815,11.862993 1.6881854,10.352265 1.6881854,7.7567682 c 0,-3.6739073 2.2259603,-6.2225165 3.3695364,-6.2225165 0.068344,0 0.087417,0.019073 0.087417,0.081854 z"/>
                          <path d="m 106.64956,8.6221987 c 0,-0.1962914 0.12636,-0.3011921 0.3012,-0.3011921 0.27894,0 0.71205,0.3011921 0.94887,0.9035762 -0.0842,0 -0.21378,0.026225 -0.30437,0.026225 -0.51417,0 -0.9457,-0.245563 -0.9457,-0.6286093 z m -31.258805,0 c 0,-0.1962914 0.131921,-0.3011921 0.302781,-0.3011921 0.281325,0 0.696159,0.3011921 0.929007,0.9035762 -0.79947,0 -1.231788,-0.1724503 -1.231788,-0.6023841 z M 81.422543,5.509351 c 0,-3.2225166 0.623841,-3.7176159 0.820927,-3.7176159 0.344901,0 0.38861,0.2161589 0.38861,1.4519205 0,1.2699338 -0.541987,2.9316557 -1.209537,3.8439735 z m -13.659338,7.889801 c 0.167682,1.144371 0.325033,2.271259 0.325033,3.155762 0,2.071788 -0.690596,4.49404 -1.882649,4.474172 -0.45298,0 -0.842384,-0.459338 -0.863841,-1.254834 -0.0445,-2.591524 1.189669,-4.797616 2.421457,-6.3751 z m 31.559206,-1.473377 c 0.131125,0.37192 0.193112,0.672318 0.193112,0.975099 0,0.34649 -0.129536,0.69298 -0.367152,0.69298 -0.170861,0 -0.348874,-0.194702 -0.348874,-0.498278 0,-0.325033 0.283708,-0.843973 0.522914,-1.169801 z M 68.537245,1.616106 c 0,0.1319205 -0.299603,0.7350993 -0.691391,1.8174834 -0.407682,1.1221192 -0.79947,2.7202649 -0.79947,4.6450331 0,1.1459603 0.288477,2.6614575 0.524503,4.1952315 l -0.693774,0.93298 c -1.100663,-1.343841 -1.796027,-2.854569 -1.796027,-5.4500658 0,-3.6739073 2.230729,-6.2225165 3.374305,-6.2225165 0.06278,0 0.08185,0.019073 0.08185,0.081854 z m -3.603973,10.808742 c 0.386225,0.51894 0.863046,1.015629 1.4249,1.556026 -1.146755,1.838146 -2.05351,4.020398 -2.05351,5.966623 0,1.402649 0.326623,2.465165 1.364504,2.465165 2.159205,0 3.778808,-4.494039 3.778808,-7.82543 0,-0.993378 -0.04212,-1.989139 -0.128742,-2.981722 0.801059,-0.847947 2.028874,-1.9899338 2.335629,-2.0980133 -0.130331,0.4545695 -0.220132,0.9313903 -0.220132,1.3811923 0,1.815894 1.038675,3.549139 3.05086,3.549139 1.878676,0 3.305166,-1.536954 3.305166,-3.680265 0,-0.276556 -0.01987,-0.517351 -0.04371,-0.7756292 0.692981,-0.1295365 1.323974,-0.306755 1.925563,-0.6683444 l 0,4.3446356 c 0,0.55947 0.38702,0.779603 0.751788,0.779603 0.503841,0 0.762914,-0.34808 1.128477,-1.143576 0.301192,-0.651656 1.124504,-2.141722 1.622782,-3.030994 0.387814,-0.6937746 0.603973,-1.1443706 0.781192,-1.1443706 0.04053,0 0.08106,0.1056954 0.08106,0.3655629 l 0,3.6977487 c 0,0.994967 0.517351,1.255629 0.971921,1.255629 0.433907,0 0.712053,-0.237616 0.99894,-0.627815 1.12053,-1.601324 2.310994,-3.501457 2.785431,-4.3255627 0.08662,-0.1478145 0.196291,-0.2598675 0.279735,-0.2598675 0.08424,0 0.13192,0.046887 0.13192,0.3242384 l 0,3.8725828 c 0,0.690596 0.213775,1.016424 0.753378,1.016424 0.497483,0 0.821722,-0.34808 1.018013,-0.758146 0.713642,-1.491655 1.772186,-3.460132 2.224371,-4.2349668 0.110463,-0.173245 0.217748,-0.3258278 0.285298,-0.3258278 0.08424,0 0.108079,0.1056954 0.108079,0.3886093 l 0,3.6747023 c 0,0.994967 0.514173,1.255629 0.967153,1.255629 0.609536,0 0.99894,-0.434702 1.385165,-0.929801 0.712848,-0.933775 1.753113,-2.591524 2.379338,-3.6556296 0.213775,0.3472846 0.454569,0.7589406 0.650861,1.2119206 -0.524503,0.62702 -1.037881,1.338278 -1.037881,2.09404 0,0.801059 0.555497,1.27947 1.143576,1.27947 0.992585,0 1.899335,-0.954437 1.899335,-2.270464 0,-0.517351 -0.1502,-1.059337 -0.3449,-1.576688 0.8853,-0.8670204 1.94543,-1.7101992 2.72345,-1.9041065 -0.36716,0.5181457 -0.66994,1.2540398 -0.66994,2.2021195 0,1.815894 1.03868,3.549139 3.04927,3.549139 1.94543,0 3.30358,-1.536954 3.30358,-3.680265 0,-0.622252 -0.0199,-0.70808 -0.0604,-0.9663577 0.44901,-0.1970861 0.8408,-0.4982781 1.14676,-0.7390728 0.25351,-0.194702 0.45218,-0.3035762 0.60079,-0.3035762 0.1955,0 0.28689,0.1517881 0.28689,0.4323179 l 0,4.2405298 c 0,0.690596 0.21298,1.016424 0.75338,1.016424 0.4951,0 0.84318,-0.34808 1.03867,-0.758146 0.70888,-1.491655 1.74835,-3.48 2.20053,-4.2349668 0.10808,-0.173245 0.19629,-0.3059602 0.26146,-0.3059602 0.0882,0 0.13033,0.06596 0.13033,0.3456953 l 0,3.3758937 c 0,0.949669 0.42834,1.577484 1.38199,1.577484 0.99735,0 1.49324,-0.954437 2.35947,-2.423841 0.0405,-0.08821 0.0612,-0.150994 0.0612,-0.213775 0,-0.194702 -0.17325,-0.305166 -0.3449,-0.305166 -0.19311,0 -0.30358,0.196292 -0.95046,0.90755 -0.12795,0.135099 -0.25987,0.322649 -0.49669,0.322649 -0.089,0 -0.1502,-0.104106 -0.1502,-0.236026 l 0,-3.7843713 c 0,-1.0164239 -0.45934,-1.4264901 -1.04265,-1.4264901 -0.47285,0 -0.85987,0.194702 -1.27232,0.8002649 -0.73669,1.0831788 -1.49086,2.6193375 -1.89854,3.3933775 -0.0469,0.0906 -0.10967,0.219338 -0.15576,0.219338 -0.0461,0 -0.0628,-0.06676 -0.0628,-0.219338 l 0,-2.7671523 c 0,-0.7978808 -0.21615,-1.4264901 -1.05933,-1.4264901 -0.88848,0 -1.33987,0.6063576 -1.98755,1.0593378 -0.41484,0.3059602 -0.7796,0.5197351 -1.06331,0.6492715 -0.42835,-1.1022517 -1.231,-1.6609272 -1.89775,-1.6442384 -0.67391,0.023046 -1.14517,0.4362914 -1.14517,1.1284768 0,0.7096689 0.43232,1.2039735 1.01086,1.424106 0.32504,0.1295367 0.62782,0.1541717 1.0657,0.1541717 0.12636,0 0.25192,0 0.34411,-0.02463 0.0421,0.215364 0.0199,0.522119 0.0199,0.75894 0,1.060927 -0.62861,2.117086 -1.79682,2.117086 -1.20953,0 -1.92,-1.167417 -1.92,-2.50649 0,-1.0172184 0.3004,-1.8588078 0.7955,-2.4405297 0.19708,-0.2177483 0.34967,-0.3496689 0.34967,-0.5491391 0,-0.1009271 -0.15259,-0.1263576 -0.28212,-0.1263576 -0.81775,0 -1.72848,0.3687417 -2.3555,0.6913907 -0.82252,0.4331126 -1.79523,1.1491391 -2.59232,1.8619868 C 99.926384,8.9647152 99.453536,8.2081589 99.212742,7.6224636 99.123735,7.3848477 99.064927,7.1090861 98.885324,7.1090861 c -0.149404,0 -0.215364,0.1509934 -0.321854,0.4490066 -0.390199,1.146755 -2.463576,4.5003973 -2.917351,4.9541723 -0.04371,0.06199 -0.108079,0.130331 -0.131126,0.130331 -0.04053,0 -0.06437,-0.02146 -0.06437,-0.153377 l 0,-3.7843713 c 0,-1.0164239 -0.407682,-1.4264901 -0.975099,-1.4264901 -0.476026,0 -0.88053,0.194702 -1.273907,0.8002649 -0.714437,1.0831788 -1.576689,2.6614575 -1.98755,3.4378805 -0.06358,0.13351 -0.127152,0.174835 -0.147814,0.174835 -0.02464,0 -0.04689,-0.08583 -0.04689,-0.219338 l 0,-2.7671523 c 0,-1.0164239 -0.407682,-1.4264901 -0.970331,-1.4264901 -0.476821,0 -0.933775,0.1772186 -1.297748,0.8002649 -0.910729,1.5369537 -2.421457,3.8932455 -2.704371,4.2794705 -0.03815,0.06676 -0.08424,0.110463 -0.130331,0.131126 -0.03815,0 -0.06358,-0.04212 -0.06358,-0.149404 l 0,-3.6349673 c 0,-1.0164239 -0.409272,-1.4264901 -0.97351,-1.4264901 -0.780398,0 -1.209537,0.7168212 -1.492451,1.1682119 -0.388609,0.6270199 -0.904371,1.4717881 -1.316821,2.2513905 -0.27894,0.521325 -0.517351,0.993378 -0.603973,0.993378 -0.04371,0 -0.04371,-0.196292 -0.04371,-0.562649 l 0,-2.8958943 c 1.363709,-1.5162914 2.203709,-3.3735099 2.203709,-5.4055629 0,-1.1698013 -0.517351,-1.8150994 -1.32,-1.8150994 -1.489272,0 -2.633643,2.3356292 -2.633643,5.1003974 l 0,2.2482119 C 78.978828,8.7938543 78.330352,9.005245 77.529292,9.1618013 77.12161,7.9538543 76.256179,7.3260397 75.568762,7.3427285 c -0.674702,0.023046 -1.148344,0.4362914 -1.148344,1.1284768 0,1.1443709 1.12053,1.6196027 2.117086,1.6196027 l 0.282914,0 c 0.03973,0.217748 0.03973,0.456159 0.03973,0.69298 0,1.060927 -0.624636,2.117086 -1.792848,2.117086 -1.211126,0 -1.920794,-1.167417 -1.920794,-2.50649 0,-1.0172184 0.301986,-1.8588078 0.795496,-2.4405297 0.193907,-0.2177483 0.34649,-0.4124503 0.34649,-0.5491391 0,-0.1009271 -0.152583,-0.1263576 -0.28053,-0.1263576 -0.822516,0 -2.636821,1.1070199 -4.800794,3.2686094 -0.189934,-1.7300663 -0.408477,-3.4180134 -0.408477,-5.0614571 0,-1.8365563 0.367152,-3.3965563 0.453775,-3.8463576 0.04291,-0.2789404 0.06676,-0.4545695 0.06676,-0.5817218 0,-0.17403977 -0.08821,-0.26304639 -0.321854,-0.26304639 -1.751524,0 -5.599471,2.79019869 -5.599471,6.96238409 0,1.7054305 0.367153,2.9189408 1.015629,3.9766888 -0.241589,-0.04212 -0.431523,-0.04212 -0.608741,-0.04212 -0.689007,0 -1.339868,0.171655 -1.743576,0.259867 l 0,-0.434702 c 0,-0.925827 -0.219338,-2.2029136 -0.609537,-2.6360262 -0.04609,-0.044503 -0.110463,-0.063576 -0.170861,-0.063576 -0.178013,0 -0.390993,0.083444 -0.627814,0.2145695 -0.262252,0.1303311 -0.521325,0.2614569 -0.521325,0.3456954 0,0.041324 0,0.085033 0.06517,0.1923178 0.152583,0.2217219 0.564238,0.6500665 0.712847,1.6688745 -0.736688,-0.735894 -1.575894,-1.062517 -2.674172,-1.062517 -1.299338,0 -1.690331,0.581722 -1.690331,1.169007 0,1.123708 1.491656,1.685563 3.375099,1.685563 0.344901,0 0.732716,-0.06517 1.119736,-0.153378 0,0.34649 0.04371,0.653245 0.04371,0.910729 0,0.367947 0.06278,0.650066 0.303576,0.650066 0.366358,0 0.584106,-0.738278 0.625431,-1.795232 0.669934,-0.17404 1.362914,-0.323444 1.948609,-0.323444 0.279735,0 0.629404,0.03894 0.971921,0.105696 z m -4.258014,-0.216159 c -0.363973,0.04291 -0.585695,0.04291 -0.971126,0.04291 -0.845562,0 -1.468609,-0.325828 -1.468609,-0.797086 0,-0.301987 0.149404,-0.477616 0.581722,-0.477616 0.69298,0 1.251656,0.477616 1.858013,1.231788 z"/>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="resume-exp-content">
                <div className="resume-exp-header">
                  <h3 className="resume-company-name">Johnson &amp; Johnson</h3>
                  <p className="resume-company-years">2006–2013 · Raritan, NJ / Skillman, NJ</p>
                  <p className="resume-company-desc">
                    Consumer and Medical Device divisions; managed P&amp;Ls, brand strategy, new product development, marketing campaigns, promotions, forecasting, and reporting.
                  </p>
                </div>

                {/* Role 1 */}
                <div className="resume-role">
                  <h4 className="resume-role-title">Marketing Manager: Ortho Clinical Diagnostics</h4>
                  <p className="resume-role-years">May 2012 – Mar 2013</p>
                  <ul className="resume-role-bullets">
                    <li><strong>Strategic Marketing:</strong> Transformed traditional clinical lab marketing approach by centering strategies around patient outcomes and healthcare provider needs.</li>
                    <li><strong>Digital Transformation:</strong> Developed custom iPad applications and deployed to 150+ field sales reps, streamlining sales enablement processes.</li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div className="resume-role">
                  <h4 className="resume-role-title">Brand Manager: Consumer Healthcare Division</h4>
                  <p className="resume-role-years">Jul 2010 – May 2012</p>
                  <ul className="resume-role-bullets">
                    <li><strong>P&amp;L Management:</strong> Managed the $60MM Tucks and ept P&amp;Ls. Reversed a multi-year decline for Tucks, growing the brand 26.8% via targeted marketing.</li>
                    <li><strong>Portfolio Management:</strong> Evaluated the ept brand&apos;s viability, recommended its strategic sale, and managed the transition process.</li>
                  </ul>
                </div>

                {/* Role 3 */}
                <div className="resume-role">
                  <h4 className="resume-role-title">Brand Manager, Assistant Product Director: Baby Care Division</h4>
                  <p className="resume-role-years">Jul 2006 – Jul 2010</p>
                  <ul className="resume-role-bullets">
                    <li><strong>P&amp;L Management:</strong> Owned the P&amp;L across an ~$80MM portfolio, including the $40MM Baby Shampoo business, while growing Baby Oil by 9.8% and Baby Powder by 5.2%.</li>
                    <li><strong>Award-Winning Marketing:</strong> Led the "Thanks, Mom" campaign that generated 290MM impressions and won J&amp;J&apos;s Global Burke Award.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Manhattan Associates */}
            <div className="resume-exp-company">
              <div className="resume-exp-logo">
                <Image
                  src="/logos/manhattan-associates.png"
                  alt="Manhattan Associates"
                  width={200}
                  height={160}
                />
              </div>
              <div className="resume-exp-content">
                <div className="resume-exp-header">
                  <h3 className="resume-company-name">Manhattan Associates</h3>
                  <p className="resume-company-years">1999–2004 · Atlanta, GA</p>
                  <p className="resume-company-desc">
                    $215MM provider of supply chain software solutions; led design, testing, implementation, and support projects.
                  </p>
                </div>

                {/* Role */}
                <div className="resume-role">
                  <h4 className="resume-role-title">Manager, Senior Consultant, Consultant, Support Consultant: Professional Services</h4>
                  <p className="resume-role-years">Mar 1999 – Jun 2004</p>
                  <ul className="resume-role-bullets">
                    <li><strong>Software Implementation:</strong> Managed warehouse management software projects for major clients, including Michelin and Bic, with international experience at The Diamond Trading Company (DeBeers) in London, UK.</li>
                    <li><strong>System Design:</strong> Developed and deployed a $1MM tracking system at Michelin that reduced operational risk and improved product quality.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="kinetic-section">
          <div className="kinetic-container">
            <h2 className="kinetic-section-title">Education</h2>

            <div className="resume-edu">
              <div className="resume-edu-item">
                <div className="resume-edu-logo">
                  <Image
                    src="/logos/uva-darden.png"
                    alt="UVA Darden"
                    width={200}
                    height={160}
                  />
                </div>
                <div className="resume-edu-text">
                  <strong>University of Virginia Darden School of Business</strong>
                  <p className="resume-edu-degree">Master of Business Administration (MBA)</p>
                </div>
              </div>

              <div className="resume-edu-item">
                <div className="resume-edu-logo">
                  <Image
                    src="/logos/clemson.png"
                    alt="Clemson University"
                    width={200}
                    height={160}
                  />
                </div>
                <div className="resume-edu-text">
                  <strong>Clemson University</strong>
                  <p className="resume-edu-degree">Bachelor of Science, Management</p>
                  <p className="resume-edu-note">Co-captain and four-year Letterman on the varsity swim team; earned a scholarship as a walk-on athlete</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Activities */}
        <section className="kinetic-section kinetic-section--alt">
          <div className="kinetic-container">
            <h2 className="kinetic-section-title">Other Activities</h2>
            <div className="activities-grid">
              <div className="kinetic-card">
                <h3 className="kinetic-card-title">Memberships</h3>
                <p className="kinetic-card-text">
                  CMO Collaborative, Southern Off-Road Bicycle Association (SORBA)
                </p>
              </div>
              <div className="kinetic-card">
                <h3 className="kinetic-card-title">Athletics &amp; Interests</h3>
                <p className="kinetic-card-text">
                  Triathlete and Ironman finisher. Avid road and MTB cyclist. DIY enthusiast. Experimenting with using AI for "vibe coding" of an app for triathletes for race preparation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section className="resume-download-cta">
          <div className="kinetic-container">
            <a
              href="/Dan-Hoeller-Resume.pdf"
              download
              className="kinetic-btn kinetic-btn--primary"
            >
              Download Resume PDF
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
