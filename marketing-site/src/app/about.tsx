import Image from "next/image";
import Link from "next/link";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/Professional headshot.jpg"
            alt="Professional Headshot"
            width={160}
            height={160}
            className="rounded-full mb-4"
            priority
          />
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--brand-blue)' }}>
            About Dan Hoeller
          </h1>
          <Link href="https://www.linkedin.com/in/danhoeller/" target="_blank" rel="noopener noreferrer">
            <span className="inline-flex items-center gap-2 text-blue-700 hover:underline text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
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