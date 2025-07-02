import Image from "next/image";
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-10">
          <div style={{ position: 'relative', width: 160, height: 160, marginBottom: 16 }}>
            <Image
              src="/Professional headshot.jpg"
              alt="Professional Headshot"
              width={160}
              height={160}
              className="rounded-full shadow-lg"
              priority
              style={{
                objectFit: 'cover',
                border: '6px solid white',
                boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: '-20px', // head pokes out
                zIndex: 2,
              }}
            />
            <div style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '20px',
              background: 'white',
              borderBottomLeftRadius: '80px',
              borderBottomRightRadius: '80px',
              zIndex: 1,
            }} />
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--brand-blue)' }}>
            About Dan Hoeller
          </h1>
          <Link href="https://www.linkedin.com/in/danhoeller/" target="_blank" rel="noopener noreferrer">
            <span className="inline-flex items-center gap-2 text-blue-700 hover:underline text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 448 512" fill="#0A66C2"><path d="M100.28 448H7.4V148.9h92.88zm-46.44-340.7C24.09 107.3 0 83.2 0 53.6A53.6 53.6 0 0 1 53.6 0a53.6 53.6 0 0 1 53.6 53.6c0 29.6-24.09 53.7-53.36 53.7zM447.8 448h-92.4V302.4c0-34.7-12.4-58.4-43.3-58.4-23.6 0-37.6 15.8-43.7 31.1-2.3 5.6-2.8 13.4-2.8 21.2V448h-92.4s1.2-242.1 0-267.1h92.4v37.9c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.7 39.8 106.7 125.4V448z"/></svg>
              LinkedIn Profile
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