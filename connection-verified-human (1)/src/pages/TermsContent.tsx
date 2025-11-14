export default function TermsContent() {
  return (
    <>
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">5. Payments and Fees</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>All transactions are processed through Stripe.</li>
          <li>Presence receives payments from Members and issues payouts to Hosts via Stripe Connect.</li>
          <li>Amounts shown are in AUD and inclusive of GST where applicable.</li>
          <li>Presence may adjust pricing or fees with notice via the Platform.</li>
          <li>Refunds are handled solely via Stripe in accordance with Stripe's dispute-resolution policies.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">6. Use of the Platform</h2>
        <p className="mb-3 text-gray-700">Users agree to:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Engage respectfully and professionally.</li>
          <li>Not solicit personal meetings, dates, or off-platform contact.</li>
          <li>Not exchange private contact information, social handles, or external links.</li>
          <li>Not share or record sessions, or create derivative content.</li>
          <li>Not engage in any sexual, discriminatory, or illegal conduct.</li>
        </ul>
        <p className="mt-3 text-gray-700">Violation of these rules will result in account suspension or permanent removal.</p>
        
        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-gray-700 mb-2">
            <strong>Users acknowledge that all video and voice sessions are encrypted and non-recordable.</strong>
          </p>
          <p className="text-gray-700">
            Presence prohibits any attempt to record, capture, or reproduce any part of a session.
            Violation of this condition — including use of screen recorders, external software, or secondary devices — will result in immediate suspension and potential legal action.
          </p>
        </div>
      </section>


      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">7. Intellectual Property</h2>
        <p className="text-gray-700">All trademarks, logos, and content on Presence remain the property of Retail Jam Pty Ltd. Users may not reproduce, modify, or distribute any part of the Platform without written consent.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">8. Limitation of Liability</h2>
        <p className="text-gray-700">Presence provides access to verified communication services "as is." We are not responsible for user behaviour during or after sessions. To the extent permitted by law, Presence disclaims all warranties, and our total liability shall not exceed the total fees paid by you in the preceding 12 months.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">9. Termination</h2>
        <p className="text-gray-700">Presence may terminate or suspend accounts for any reason, including misconduct, fraud, or regulatory concerns. Users may delete their account at any time; deletion does not void outstanding financial obligations.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-3">10. Governing Law</h2>
        <p className="text-gray-700">These Terms are governed by the laws of New South Wales, Australia. Disputes will be resolved under Australian jurisdiction.</p>
      </section>
    </>
  );
}
