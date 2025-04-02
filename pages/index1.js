import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  // Add useEffect to log that Next.js is working properly
  useEffect(() => {
    console.log('Next.js is working properly!');
  }, []);

  return (
    <div>
      <Head>
        <title>Flight Cancellation Info</title>
        <meta name="description" content="Get real-time information about cancelled flights" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4">
          <div className="nav-container">
            <h1 className="text-2xl font-bold">Flight Cancellation Info</h1>
            <nav className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/demo" className="nav-link">Demo</Link>
              <Link href="/admin" className="nav-link">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6">
        {/* Add a small indicator that Next.js is working */}
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <p className="font-bold">Next.js is properly configured!</p>
          <p className="text-sm">This message will help verify that your Next.js setup is working correctly.</p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Flight Cancelled?</h2>
          <p className="mb-4">Get real-time information about your cancelled flight, including hotel accommodations, alternative flights, and compensation details.</p>
          <Link href="/demo" className="btn">View Demo</Link>
        </div>

        <div className="card-grid mt-6">
          <div className="card">
            <h3 className="font-bold mb-2">Hotel Options</h3>
            <p>Find nearby hotels with special rates for stranded travelers.</p>
          </div>
          <div className="card">
            <h3 className="font-bold mb-2">Alternative Flights</h3>
            <p>Discover the fastest alternative routes to your destination.</p>
          </div>
          <div className="card">
            <h3 className="font-bold mb-2">Compensation Info</h3>
            <p>Learn about your rights and available compensation options.</p>
          </div>
        </div>

        <div className="card mt-6">
          <h2 className="text-xl font-bold mb-4">How It Works</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Enter your flight number</li>
            <li>Get real-time status</li>
            <li>View alternative options</li>
            <li>Book your preferred solution</li>
          </ol>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto">
          <p>© 2025 Flight Cancellation Info. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
