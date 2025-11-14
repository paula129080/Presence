export default function PrivacyContent() {
  return (
    <>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">4. Storage and Security</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Data is stored on encrypted servers located in Australia and the US via Airtable, Stripe, and AWS.</li>
          <li>Access is restricted to authorised administrators.</li>
          <li>All data in transit is encrypted using TLS 1.2 or higher.</li>
        </ul>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-bold text-gray-900 mb-2">End-to-End Encryption:</h3>
          <p className="text-gray-700 mb-2">
            All Presence video sessions are encrypted using TLS 1.3 and AES-256 standards.
            Sessions occur within secure Daily.co environments and are not recorded, stored, or retrievable by either Host, Member, or Presence administrators.
          </p>
          <p className="text-gray-700">
            The encryption layer is session-based, meaning every call generates a unique, temporary encryption key which is automatically destroyed when the chat ends.
            This makes it impossible to record or download sessions from within the Presence platform, ensuring total privacy and emotional safety for both users.
          </p>
        </div>
      </section>


      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">5. Sharing of Data</h2>
        <p className="mb-3 text-gray-700">Presence shares limited data only with essential service providers:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Stripe for payment processing</li>
          <li>Twilio for SMS notifications</li>
          <li>Cal.com / Daily.co for scheduling and video delivery</li>
        </ul>
        <p className="mt-3 text-gray-700">All third parties comply with global privacy and security standards.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">6. User Rights</h2>
        <p className="mb-3 text-gray-700">You may:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Request a copy of your stored data</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion ("Right to be Forgotten")</li>
        </ul>
        <p className="mt-3 text-gray-700">Requests can be submitted via <a href="https://help.presencegroup.net" className="text-[#4285B9] hover:underline">help.presencegroup.net</a>.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">7. Data Retention</h2>
        <p className="text-gray-700">Identity and transaction records are retained for seven years to comply with Australian tax and financial regulations. Session metadata is retained for 12 months for safety and compliance purposes.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">8. Contact</h2>
        <p className="text-gray-700">For privacy inquiries, contact us at <a href="https://help.presencegroup.net" className="text-[#4285B9] hover:underline">help.presencegroup.net</a>.</p>
      </section>
    </>
  );
}
