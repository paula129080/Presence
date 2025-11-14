import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrivacyContent from './PrivacyContent';


export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <div className="text-sm text-gray-500 mb-8">Version 1.0, November 2025</div>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-2">Registered Entity</h2>
          <p className="text-gray-700">Retail Jam Pty Ltd (ABN to be inserted)</p>
          <p className="text-gray-700">Registered Office: Sydney, NSW Australia</p>
          <p className="text-gray-700">Contact: <a href="https://help.presencegroup.net" className="text-[#4285B9] hover:underline">help.presencegroup.net</a></p>
        </div>

        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Purpose</h2>
            <p>This Privacy Policy explains how Presence collects, uses, and protects your personal information in compliance with the Privacy Act 1988 (Cth) and GDPR (for international users).</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> name, email, photo, verification documents</li>
              <li><strong>Payment Data:</strong> processed securely through Stripe (we never store card details)</li>
              <li><strong>Session Data:</strong> timestamps, metadata, session status (no recordings or video storage)</li>
              <li><strong>Technical Data:</strong> browser type, IP address, device information</li>
              <li><strong>Communication Data:</strong> SMS notifications via Twilio and internal support messages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To verify identity and maintain platform safety</li>
              <li>To process payments and payouts</li>
              <li>To notify users of bookings, sessions, or updates</li>
              <li>To monitor compliance with the Community Pledge</li>
              <li>To improve user experience and platform reliability</li>
              <li>To comply with Australian KYC and anti-fraud laws</li>
            </ul>
          </section>
          
          <PrivacyContent />
        </div>

      </div>
      <Footer />
    </div>
  );
}
