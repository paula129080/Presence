import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UserPlus, CreditCard, Search, Calendar, Video, CheckCircle, Shield } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">How It Works</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-700 mb-6">
              Presence makes it simple for anyone to connect safely — verified Members and Hosts meet in structured, private video sessions that are fully encrypted and never recorded.
            </p>
            <div className="bg-blue-50 border-l-4 border-[#4285B9] p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-[#4285B9] flex-shrink-0 mt-1" />
                <p className="text-gray-700 text-left">
                  <strong>Private by Design:</strong> Every session is fully encrypted and cannot be recorded or downloaded — not by the Host, the Member, or even us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* For Members */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-[#E53935]">For Members</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#E53935] rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <UserPlus className="w-5 h-5" /> Sign Up
                </h3>
                <p className="text-gray-700">Create your member account in minutes — no downloads, no public profile, no risk.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#E53935] rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Choose a Plan
                </h3>
                <p className="text-gray-700">Select from Adhoc or Weekly Access plans depending on how often you want to connect.</p>

              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#E53935] rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Search className="w-5 h-5" /> Find a Verified Host
                </h3>
                <p className="text-gray-700">Browse verified Hosts by category or conversation type — each Host completes photo and video verification.</p>

              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#E53935] rounded-full flex items-center justify-center text-white font-bold">4</div>
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5" /> Book Your Session
                </h3>
                <p className="text-gray-700">Choose a time that suits you. Your Host receives the booking instantly via Cal.com.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#E53935] rounded-full flex items-center justify-center text-white font-bold">5</div>
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Video className="w-5 h-5" /> Connect Privately
                </h3>
                <p className="text-gray-700 mb-3">
                  Join your one-on-one video chat in a fully encrypted Daily.co room — it's impossible for anyone (including Presence) to record, store, or download your session.
                </p>
                <p className="text-gray-700">
                  Smart conversation templates help you start comfortably and keep the tone natural and supportive.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* For Hosts */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-[#4285B9]">For Hosts</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#4285B9] rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Get Verified</h3>
                <p className="text-gray-700">Upload your headshot, full-length photo, and provide a 10-30 second intro video. Agree to the Community Pledge and connect your Stripe account for payouts.</p>


              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#4285B9] rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5" /> Set Availability
                </h3>
                <p className="text-gray-700">Use Cal.com to manage when you're available. You control your schedule and time zones.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#4285B9] rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Receive Bookings</h3>
                <p className="text-gray-700">Members select your profile and time slot. You'll be notified instantly via SMS and email.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#4285B9] rounded-full flex items-center justify-center text-white font-bold">4</div>
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Video className="w-5 h-5" /> Host Securely
                </h3>
                <p className="text-gray-700 mb-3">
                  Join encrypted Daily.co sessions directly through the Presence PWA — no third-party apps or data exposure.
                </p>
                <p className="text-gray-700">
                  Recording, downloads, and external captures are disabled to protect you and your Members.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#4285B9] rounded-full flex items-center justify-center text-white font-bold">5</div>
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Earn and Track Income
                </h3>
                <p className="text-gray-700">
                  After each completed session, your payout appears in your Stripe dashboard. Presence automatically logs all completed sessions for transparent income tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
