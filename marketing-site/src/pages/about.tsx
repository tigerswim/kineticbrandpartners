import Image from "next/image";
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-4" style={{ width: 160, height: 160 }}>
            <div className="absolute left-0 right-0 mx-auto z-10" style={{ width: 160, height: 160, top: '-24px' }}>
              <Image
                src="/Professional headshot.jpg"
                alt="Professional Headshot"
                width={160}
                height={160}
                className="rounded-full border-4 border-white shadow-xl object-cover"
                priority
                style={{
                  objectFit: 'cover',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                }}
              />
            </div>
            {/* White mask to create the 3D pop-out effect */}
            <div className="absolute left-0 right-0 mx-auto bg-white z-0" style={{ width: 160, height: 32, bottom: 0, borderBottomLeftRadius: 80, borderBottomRightRadius: 80 }} />
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--brand-blue)' }}>
            About Dan Hoeller
          </h1>
          <Link href="https://www.linkedin.com/in/danhoeller/" target="_blank" rel="noopener noreferrer">
            <span className="inline-flex items-center gap-2 text-blue-700 hover:underline text-lg">
              {/* Official circular LinkedIn SVG icon */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#0A66C2"/>
                <path d="M22.23 22.23h-2.46v-3.36c0-.8-.01-1.83-1.12-1.83-1.12 0-1.29.87-1.29 1.77v3.42h-2.46v-6.92h2.36v.95h.03c.33-.62 1.13-1.27 2.33-1.27 2.49 0 2.95 1.64 2.95 3.77v3.47zM11.13 14.36c-.79 0-1.43-.64-1.43-1.43 0-.79.64-1.43 1.43-1.43.79 0 1.43.64 1.43 1.43 0 .79-.64 1.43-1.43 1.43zm1.23 7.87h-2.46v-6.92h2.46v6.92z" fill="white"/>
              </svg>
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