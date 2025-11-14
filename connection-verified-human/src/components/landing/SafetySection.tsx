import { CheckCircle } from 'lucide-react';

export default function SafetySection() {
  const safetyFeatures = [
    "Verified Identity for Every User",
    "Moderation Templates",
    "Community Pledge Required",
    "Secure Daily.co Video Links",
    "SMS Alerts for Sessions",
    "No downloads, no recordings"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Safety + Trust</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {safetyFeatures.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 text-lg">
          Presence follows strict cultural guardrails to protect both hosts and members.
        </p>
      </div>
    </section>
  );
}
