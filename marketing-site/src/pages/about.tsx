import Image from "next/image";
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-2" style={{ width: 240, height: 240 }}>
            <div className="absolute left-0 right-0 mx-auto z-10" style={{ width: 240, height: 240, top: '-36px', overflow: 'visible' }}>
              <div style={{ position: 'relative', width: 240, height: 240, overflow: 'visible' }}>
                <Image
                  src="/Professional headshot.jpg"
                  alt="Professional Headshot"
                  width={240}
                  height={240}
                  className="rounded-full border-4 border-white shadow-xl object-cover"
                  priority
                  style={{
                    objectFit: 'cover',
                    aspectRatio: '1/1',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '-36px',
                    zIndex: 2,
                  }}
                />
              </div>
            </div>
          </div>
          <Link href="https://www.linkedin.com/in/danhoeller/" target="_blank" rel="noopener noreferrer">
            <span className="inline-flex items-center gap-2 text-blue-700 hover:underline text-lg mt-2">
              <Image src="/LI-Logo.png" alt="LinkedIn Logo" width={90} height={28} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </span>
          </Link>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Bio</h2>
          <p className="text-lg text-gray-700 mb-2">
            {/* Replace this with your actual LinkedIn bio content */}
            Dan Hoeller is a seasoned marketing consultant with a passion for helping businesses grow through strategic branding, digital marketing, and data-driven solutions. With a proven track record in both B2B and B2C environments, Dan brings a unique blend of creativity and analytical thinking to every project. Connect with Dan on LinkedIn to learn more about his professional journey and expertise.
          </p>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Personal Interests</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>Cycling (road and mountain biking)</li>
            <li>Triathlons</li>
            <li>Craft beer</li>
            <li>DIY projects for home and auto</li>
          </ul>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Photo Gallery</h2>
          <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={4000}
            showStatus={false}
            className="rounded-lg overflow-hidden"
          >
            <div>
              <Image src="/cycling1.jpg" alt="Cycling" width={800} height={400} className="object-cover w-full h-64" />
              <p className="legend">Cycling (Road)</p>
            </div>
            <div>
              <Image src="/mtb1.jpg" alt="Mountain Biking" width={800} height={400} className="object-cover w-full h-64" />
              <p className="legend">Mountain Biking</p>
            </div>
            <div>
              <Image src="/triathlon1.jpg" alt="Triathlon" width={800} height={400} className="object-cover w-full h-64" />
              <p className="legend">Triathlon</p>
            </div>
            <div>
              <Image src="/craftbeer1.jpg" alt="Craft Beer" width={800} height={400} className="object-cover w-full h-64" />
              <p className="legend">Craft Beer</p>
            </div>
            <div>
              <Image src="/diy1.jpg" alt="DIY Project" width={800} height={400} className="object-cover w-full h-64" />
              <p className="legend">DIY Project</p>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
} 