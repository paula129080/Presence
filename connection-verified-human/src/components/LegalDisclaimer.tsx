export default function LegalDisclaimer() {
  return (
    <div className="bg-gray-50 py-10 mt-16">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-[#666666] leading-relaxed space-y-4">
          <h3 className="font-semibold text-gray-800 text-base mb-3">Legal Disclosure & Disclaimer</h3>
          
          <p>
            Presence is operated by <strong>Retail Jam Pty Ltd</strong> (Australia).
            Presence is a verified-access social platform designed to connect Members and Hosts for genuine one-on-one conversation in a safe and structured digital environment.
          </p>

          <div>
            <p className="font-semibold text-gray-700 mb-2">Presence is not:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>A dating or romantic service</li>
              <li>An escort or companionship agency</li>
              <li>A therapy or counseling platform</li>
              <li>A livestream, content-sharing, or social media site</li>
            </ul>
          </div>

          <p>
            Hosts are independent participants, not employees or representatives of Presence.
            Sessions are private, ephemeral, and are not recorded.
            Presence does not monitor the content of calls in real time but enforces strict behavioral and verification standards under the Community Pledge.
          </p>

          <div>
            <p className="font-semibold text-gray-700 mb-2">By using Presence, you agree that:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>You are at least 18 years of age.</li>
              <li>You understand Presence facilitates time-based, verified human conversations for personal connection and discussion only.</li>
              <li>You will not solicit, share personal contact information, or attempt to take communication outside the platform.</li>
              <li>You acknowledge that all payments and bookings are final and processed securely through Stripe, subject to Stripe's refund and dispute resolution policy.</li>
            </ul>
          </div>

          <p>
            Presence provides access to conversation and connection — not medical, therapeutic, financial, or emotional advice.
            Any opinions or guidance expressed during sessions are personal to the Hosts and do not represent official statements of Presence or Retail Jam Pty Ltd.
          </p>
          <p>
            Presence operates under Australian Consumer Law and complies with global privacy standards (Privacy Act 1988 (Cth), GDPR, and CCPA).
            For privacy and support requests, contact{' '}
            <a href="https://help.presencegroup.net" className="text-[#4285B9] hover:underline">
              help.presencegroup.net
            </a>.
          </p>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-gray-700">
              <strong>All Presence video sessions are encrypted and non-recordable.</strong>
              {' '}For privacy and safety, Presence prohibits any recording, screenshots, or external duplication.
              Each chat is transient and private by design — a digital equivalent of a face-to-face conversation that leaves no digital footprint.
            </p>
          </div>

          <p className="text-gray-600 text-xs mt-6">
            © 2025 Retail Jam Pty Ltd. All rights reserved.
          </p>

        </div>
      </div>
    </div>
  );
}
