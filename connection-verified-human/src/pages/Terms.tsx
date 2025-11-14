import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TermsContent from './TermsContent';


export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Terms of Use</h1>
        <div className="text-sm text-gray-500 mb-8">Version 1.0, November 2025</div>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-2">Registered Entity</h2>
          <p className="text-gray-700">Retail Jam Pty Ltd (ABN to be inserted)</p>
          <p className="text-gray-700">Registered Office: Sydney, NSW Australia</p>
          <p className="text-gray-700">Contact: <a href="https://help.presencegroup.net" className="text-[#4285B9] hover:underline">help.presencegroup.net</a></p>
        </div>

        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using Presence ("the Platform"), you agree to these Terms of Use, our Privacy Policy, and the Community Pledge. If you do not agree, do not use the Platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Service Description</h2>
            <p>Presence provides verified, time-based, one-on-one video and messaging sessions between "Hosts" and "Members." Presence is not a dating, escort, or therapeutic service. It is a digital marketplace for structured human conversation, guidance, and connection.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Eligibility</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be 18 years or older to use Presence.</li>
              <li>Hosts must complete photo and video verification and agree to the Community Pledge.</li>

              <li>Members must provide accurate account information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Accounts and Verification</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Each user has a unique verified profile.</li>
              <li>Hosts undergo photo and identity verification.</li>
              <li>Members and Hosts must maintain confidentiality of their account credentials.</li>
              <li>Presence reserves the right to suspend or terminate any account for breach of these terms or misconduct.</li>
            </ul>
          </section>
          
          <TermsContent />
        </div>

      </div>
      <Footer />
    </div>
  );
}
