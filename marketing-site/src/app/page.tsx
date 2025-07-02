import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Navigation */}
      <nav className="shadow-sm border-b sticky top-0 z-50" style={{ background: 'var(--brand-blue)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/Kinetic Brand Partners logo white.png"
                alt="Kinetic Brand Partners Logo"
                width={200}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-white hover:text-[var(--accent-orange)] px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#services" className="text-white hover:text-[var(--accent-orange)] px-3 py-2 rounded-md text-sm font-medium">Services</a>
                <Link href="/about" className="text-white hover:text-[var(--accent-orange)] px-3 py-2 rounded-md text-sm font-medium">About</Link>
                <a href="#contact" className="text-white hover:text-[var(--accent-orange)] px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative" style={{ background: 'var(--light-gray)' }}>
        {/* Brand logo below header, above headline */}
        <div className="w-full flex justify-center pt-12 pb-4">
          <Image
            src="/Kinetic Brand Partners logo Rectangle clear.png"
            alt="Kinetic Brand Partners Logo"
            width={800}
            height={200}
            className="mx-auto w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] h-auto"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                Transform Your Brand with Strategic Marketing
              </h1>
              <p className="text-xl mb-8 text-gray-700">
                We help businesses grow through data-driven marketing strategies, 
                compelling content, and results-focused campaigns that drive real ROI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 rounded-lg font-semibold transition-colors" style={{ background: 'var(--accent-orange)', color: 'white' }}>
                  Get Started
                </button>
                <button className="border-2 px-8 py-3 rounded-lg font-semibold transition-colors" style={{ borderColor: 'white', color: 'white' }}>
                  View Our Work
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20" style={{ background: 'var(--brand-blue)', color: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive marketing solutions tailored to your business goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1: Brand Strategy */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Brand Strategy</h3>
              <p className="text-gray-700">
                Develop your unique brand identity, messaging, and positioning to stand out in your market.
              </p>
            </div>

            {/* Service Card 2: Digital Marketing */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Digital Marketing</h3>
              <p className="text-gray-700">
                Comprehensive digital marketing strategies including SEO, PPC, social media, and content marketing.
              </p>
            </div>

            {/* Service Card 3: Growth Marketing */}
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Growth Marketing</h3>
              <p className="text-gray-700">
                Data-driven growth strategies that scale your business and maximize your marketing ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Kinetic Brand Partners
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We&apos;re a team of passionate marketing professionals dedicated to helping businesses 
                achieve their growth goals through strategic, data-driven marketing solutions.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                With years of experience across various industries, we understand what it takes 
                to build successful marketing campaigns that drive real results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20" style={{ background: 'var(--brand-blue)', color: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Marketing?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let&apos;s discuss how we can help you achieve your business goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>sales@kineticbrandpartners.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Atlanta, GA</span>
                </div>
              </div>
            </div>
            
            <div>
              <form name="contact" method="POST" data-netlify="true" action="/success" className="space-y-4">
                <input type="hidden" name="form-name" value="contact" />
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ background: 'var(--dark-gray)', color: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 Kinetic Brand Partners. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
