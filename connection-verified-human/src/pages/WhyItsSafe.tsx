import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldCheck, Eye, Lock, AlertCircle } from 'lucide-react';

export default function WhyItsSafe() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-black mb-6" style={{fontFamily: 'Inter'}}>
          Why It's Safe
        </h1>
        <p className="text-xl text-gray-700 mb-12" style={{fontFamily: 'Open Sans'}}>
          Safety isn't an afterthought at Presence — it's engineered into every interaction, every session, and every policy.
        </p>
        
        <div className="space-y-12">

          <div className="flex gap-6">
            <ShieldCheck className="w-12 h-12 text-[#4285B9] flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Verification-First Design</h2>
              <p className="text-gray-700 mb-2">
                Every Host completes ID and photo verification plus behavioral screening before approval.
              </p>
              <p className="text-gray-600">
                Members always make the first move — Hosts can't contact Members directly.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <Eye className="w-12 h-12 text-[#4285B9] flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Behavioral Logging</h2>
              <p className="text-gray-700 mb-2">
                Sessions aren't recorded, but start/end times and flags are logged for security.
              </p>
              <p className="text-gray-600">
                Admin alerts trigger instantly for misconduct or inappropriate behavior.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <Lock className="w-12 h-12 text-[#4285B9] flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-3">Identity Protection</h2>
              <p className="text-gray-700 mb-2">
                Choose from virtual environments like Beach, Bar, or Cabin to protect your identity and feel comfortable connecting.
              </p>
              <p className="text-gray-600">
                No downloads, file sharing, or screenshots — privacy by design.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <AlertCircle className="w-12 h-12 text-[#4285B9] flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-3">24/7 Moderation</h2>
              <p className="text-gray-700 mb-2">
                Real-time reporting allows Members to flag issues instantly.
              </p>
              <p className="text-gray-600">
                Repeated misconduct or poor ratings lead to automatic suspension.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
