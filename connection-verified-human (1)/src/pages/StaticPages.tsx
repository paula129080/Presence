import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <div className="prose prose-lg space-y-4 text-gray-700">
          <p>Last updated: November 2025</p>
          <h2 className="text-2xl font-bold mt-6">1. Acceptance of Terms</h2>
          <p>By accessing Presence, you agree to these terms and our Community Pledge.</p>
          <h2 className="text-2xl font-bold mt-6">2. User Conduct</h2>
          <p>All users must maintain professional, respectful behavior. Off-platform contact is prohibited.</p>
          <h2 className="text-2xl font-bold mt-6">3. Payment Terms</h2>
          <p>All payments are processed securely through Stripe. Refunds are subject to our refund policy.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-lg space-y-4 text-gray-700">
          <p>Last updated: November 2025</p>
          <h2 className="text-2xl font-bold mt-6">Data Collection</h2>
          <p>We collect only essential information needed to provide our service.</p>
          <h2 className="text-2xl font-bold mt-6">Data Security</h2>
          <p>Your data is encrypted and stored securely. We never share personal information with third parties.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function CommunityPledge() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Community Pledge</h1>
        <div className="prose prose-lg space-y-4 text-gray-700">
          <p className="text-xl font-semibold">All users commit to respect, professionalism, and no off-platform contact.</p>
          <h2 className="text-2xl font-bold mt-6">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respect every person's time and boundaries</li>
            <li>Maintain professional conduct in all interactions</li>
            <li>Keep all communication on-platform</li>
            <li>Report any violations immediately</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Contact Presence</h1>
        <p className="text-xl text-gray-700 mb-12">We're Here When You Need Us</p>
        <p className="text-gray-700 mb-12">Whether you're a Member, a Host, or simply exploring Presence, we're here to help.</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-3">General Support</h2>
            <p className="text-gray-700 mb-2">If you have questions about your account, payments, verification, or sessions:</p>
            <p className="text-lg font-semibold text-[#4285B9]">📩 support@presencegroup.net</p>
            <p className="text-gray-600 text-sm mt-1">We aim to reply within 24 hours.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Host Support</h2>
            <p className="text-gray-700 mb-2">For verification, onboarding or payout questions:</p>
            <p className="text-lg font-semibold text-[#4285B9]">📩 host-support@presencegroup.net</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Report a Safety Concern</h2>
            <p className="text-gray-700 mb-2">Your safety is our priority. For urgent issues or behaviour concerns:</p>
            <p className="text-lg font-semibold text-red-600">📩 safety@presencegroup.net</p>
            <p className="text-gray-600 text-sm mt-1">Our team prioritises safety reports first.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Media & Partnerships</h2>
            <p className="text-gray-700 mb-2">For media enquiries or partnership opportunities:</p>
            <p className="text-lg font-semibold text-[#4285B9]">📩 media@presencegroup.net</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Where We Operate</h2>
            <p className="text-gray-700 mb-2">Presence is a global digital platform, available 24/7 across time zones.</p>
            <p className="text-gray-700">📍 Melbourne, Australia</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Follow Us</h2>
            <div className="flex gap-4">
              <a href="#" className="text-[#4285B9] hover:underline">Instagram</a>
              <a href="#" className="text-[#4285B9] hover:underline">Facebook</a>
              <a href="#" className="text-[#4285B9] hover:underline">LinkedIn</a>
            </div>
            <p className="text-gray-500 text-sm mt-2">(Links will be added once live)</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

