import Link from "next/link";
import Image from "next/image";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-md text-center">
        <Image
          src="/Kinetic Brand Partners logo Rectangle clear.png"
          alt="Kinetic Brand Partners Logo"
          width={300}
          height={80}
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--brand-blue)' }}>
          Thank You!
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          Your message has been received. We appreciate your interest and will get back to you as soon as possible.
        </p>
        <Link href="/">
          <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
            Return to Home
          </span>
        </Link>
      </div>
    </div>
  );
} 