import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Users, Globe, Clock } from 'lucide-react';

export default function WhatIsPresence() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-black mb-6" style={{fontFamily: 'Inter'}}>
          What is Presence
        </h1>
        <p className="text-xl font-bold text-gray-900 mb-12" style={{fontFamily: 'Open Sans'}}>
          The evolution of real human connection — from simple phone calls to global, verified digital conversation.
        </p>


        <div className="space-y-8 mb-12">
          <div className="border-l-4 border-[#4285B9] pl-6">
            <p className="text-gray-700 mb-3">
              In the 1990s, people could call dedicated numbers to connect and talk — real, human conversations that made strangers feel less alone.
            </p>
            <p className="text-gray-700 mb-3">
              Presence brings that same idea into today's world — safe, private, and global.
            </p>
            <p className="text-gray-700 mb-3">
              Like Afterpay reimagined Layby, and Uber transformed the taxi experience, Presence modernizes a familiar social experience for the digital age.
            </p>
            <p className="text-gray-700">
              Verified, encrypted, and available 24/7 — it's human connection redesigned for a connected world.
            </p>
          </div>


          <div className="border-l-4 border-[#E53935] pl-6">
            <h2 className="text-2xl font-bold mb-3">How We're Different</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Verified hosts committed to authentic connection</li>
              <li>• Structured, safe environment guided by community standards</li>
              <li>• No algorithms, no endless scrolling — just real people</li>
              <li>• Flexible plans to fit your connection needs</li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="p-6 bg-gray-50 rounded-2xl">
            <Shield className="w-10 h-10 text-[#4285B9] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Verification-First</h3>
            <p className="text-gray-600">Every Host passes photo, ID, and behavioral verification before approval.</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl">
            <Users className="w-10 h-10 text-[#4285B9] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Human & Supportive</h3>
            <p className="text-gray-600">Smart prompts help conversations flow naturally and respectfully.</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl">
            <Globe className="w-10 h-10 text-[#4285B9] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Access</h3>
            <p className="text-gray-600">Connect with verified Hosts worldwide, in any timezone.</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl">
            <Clock className="w-10 h-10 text-[#4285B9] mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
            <p className="text-gray-600">Real people, real time — whenever you need connection.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
