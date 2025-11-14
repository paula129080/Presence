import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Users, Lock, Eye, AlertCircle, CheckCircle } from 'lucide-react';

export default function CommunityPledge() {
  const safetyPrinciples = [
    { icon: Shield, title: 'Verification-First', desc: 'Every Host passes photo, ID, and behavioral verification.' },
    { icon: Users, title: 'Template-Guided', desc: 'Structured prompts remove awkwardness and prevent misuse.' },
    { icon: Lock, title: 'Controlled Initiation', desc: 'Members always make the first move. Hosts cannot contact Members directly.' },
    { icon: Eye, title: 'Identity Protection', desc: 'Meet in themed virtual rooms that protect privacy.' },
    { icon: AlertCircle, title: '24/7 Moderation', desc: 'Admin SMS alerts for flagged words or misconduct reports.' },
    { icon: CheckCircle, title: 'Session Reset', desc: 'Each chat expires automatically to prevent misuse.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-6">Community Pledge</h1>
        <p className="text-lg text-gray-700 mb-8">
          All users commit to respect, professionalism, and no off-platform contact.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Safety Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {safetyPrinciples.map((principle, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <principle.icon className="w-8 h-8 text-[#2563EB] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{principle.title}</h3>
                  <p className="text-sm text-gray-600">{principle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">User Commitments</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-[#2563EB] mr-2 mt-0.5" />Treat all users with respect and professionalism</li>
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-[#2563EB] mr-2 mt-0.5" />No exchange of personal contact information</li>
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-[#2563EB] mr-2 mt-0.5" />Report any inappropriate behavior immediately</li>
            <li className="flex items-start"><CheckCircle className="w-5 h-5 text-[#2563EB] mr-2 mt-0.5" />Maintain confidentiality of conversations</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Host Responsibilities</h2>
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <p className="text-gray-700 mb-3">
              <strong>Hosts must respect the integrity of Presence's encryption system.</strong>
            </p>
            <p className="text-gray-700 mb-3">
              Any attempt to capture, record, or redistribute content from sessions violates this pledge and will result in removal from the platform.
            </p>
            <p className="text-gray-700 font-semibold">
              Trust is the foundation of Presence — every chat exists only in the moment it happens.
            </p>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
