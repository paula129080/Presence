import { CheckCircle, UserCheck, Video, RefreshCw } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      icon: UserCheck,
      title: "Step 1 — Verify",
      description: "Submit a photo, full-length image, and a 10–30 second intro video. Everyone on Presence is real, verified, and accountable."
    },
    {
      icon: CheckCircle,
      title: "Step 2 — Choose Your Chat",
      description: "Browse verified Hosts, check personality tags, and choose a time that suits you. 10-minute video chats through secure Daily.co rooms."
    },
    {
      icon: Video,
      title: "Step 3 — Talk to a Real Person",
      description: "Kind, respectful, human conversations. No AI, no filters, no pressure — just Presence."
    },
    {
      icon: RefreshCw,
      title: "Step 4 — Come Back Anytime",
      description: "Rebook your favourite hosts or explore new ones. Presence is always awake across global time zones."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
              <step.icon className="w-12 h-12 text-[#4285B9] mb-4" />
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
