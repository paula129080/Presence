import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle } from 'lucide-react';

export default function HostAgreement() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Presence Host Agreement & Community Pledge</h1>
        <p className="text-lg text-gray-700 mb-8">
          Welcome to Presence — the world's first verified human-connection network designed for real, safe, meaningful conversations.
        </p>
        <p className="text-gray-700 mb-8">
          As a Host, you play a central role in the emotional wellbeing of our Members. This agreement outlines expectations, responsibilities, and the standards required to maintain safety, trust, and professionalism on the platform.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Verification Requirements</h2>
          <p className="text-gray-700 mb-4">All Hosts must complete full verification before activation:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>A clear headshot (real photo or approved AI likeness)</li>
            <li>A full-length photo</li>
            <li>A 10–30 second intro video</li>
            <li>Identity confirmation through our verification partner</li>
            <li>Acceptance of this Host Agreement</li>
          </ul>
          <p className="text-gray-700">You must provide truthful, accurate information and keep your profile up to date.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Community Pledge</h2>
          <p className="text-gray-700 mb-4">All Hosts agree to:</p>
          <div className="space-y-2 mb-4">
            {[
              'Be kind, patient and respectful',
              'Keep all conversations safe and appropriate',
              'Maintain emotional boundaries',
              'Show up on time and ready to engage',
              'Follow Presence prompts and conversation guidelines',
              'Never request or share personal contact information',
              'Never solicit off-platform communication',
              'Never ask for payments, gifts, or tips',
              'Uphold the emotional tone and cultural guardrails of Presence'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#4285B9] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-700 italic">Presence exists to help people feel human again — Hosts are the custodians of that mission.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Session Structure & Conduct</h2>
          <p className="text-gray-700 mb-4">During each 10-minute session:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Maintain focus and be present</li>
            <li>Keep the conversation healthy and supportive</li>
            <li>Use prompts if the chat needs direction</li>
            <li>Do not provide therapy, counselling, or financial advice</li>
            <li>Do not engage in explicit, romantic, or inappropriate conduct</li>
            <li>Do not create dependency or promise outcomes</li>
          </ul>
          <p className="text-gray-700">Sessions are not recorded and are non-downloadable, but activity may be monitored for safety.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Host Availability</h2>
          <p className="text-gray-700 mb-4">Hosts manage their own availability through their Presence calendar.</p>
          <p className="text-gray-700 mb-2">When "Online" is toggled on:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Members may book you instantly</li>
            <li>You must remain available for the full duration of your active window</li>
            <li>Missing sessions may result in temporary suspension</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Earnings & Payments</h2>
          <p className="text-gray-700 mb-4">Presence uses Stripe Connect for host payouts.</p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="font-semibold mb-2">Rates:</p>
            <p className="text-gray-700">Adhoc chat: $18 → Host receives $12</p>
            <p className="text-gray-700">Weekly Access Pack: $40 → Host receives $30</p>
          </div>
          <p className="text-gray-700 mb-4">Payouts are processed automatically once sessions are marked complete.</p>
          <p className="text-gray-700 mb-2">Hosts are responsible for:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Providing accurate payout information</li>
            <li>Declaring income according to local regulations</li>
            <li>Managing their own tax obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. Safety & Moderation</h2>
          <p className="text-gray-700 mb-4">Presence has a zero-tolerance policy for:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Harassment or abuse</li>
            <li>Discrimination</li>
            <li>Inappropriate content</li>
            <li>Off-platform solicitation</li>
            <li>Romantic advances</li>
            <li>Illegal or unethical behaviour</li>
          </ul>
          <p className="text-gray-700 mb-2">Any breach may result in:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Immediate suspension</li>
            <li>Removal from platform</li>
            <li>Withholding of payouts in cases of fraud or misconduct</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. Removal & Deactivation</h2>
          <p className="text-gray-700 mb-4">Hosts may be removed if:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li>Repeated no-shows</li>
            <li>Misuse of platform</li>
            <li>Safety concerns</li>
            <li>Inaccurate profile information</li>
            <li>Violation of this agreement</li>
          </ul>
          <p className="text-gray-700">Presence reserves the right to remove any Host in order to protect Members and uphold community standards.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. Acceptance</h2>
          <p className="text-gray-700 mb-4">By activating your Host profile, you agree to this Host Agreement in full and commit to the Presence mission:</p>
          <p className="text-xl font-semibold text-[#4285B9] text-center">Real people. Real conversations. Real connection.</p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
