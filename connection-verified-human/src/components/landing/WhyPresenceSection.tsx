import { Shield, Heart, Globe, Lock, Users } from 'lucide-react';

export default function WhyPresenceSection() {
  const features = [
    { icon: Users, title: "Verified Humans Only", description: "No AI, no avatars. Every Host is seen, verified, and accountable." },
    { icon: Heart, title: "Emotionally Safe", description: "Tone-guided templates help keep conversations kind and respectful." },
    { icon: Globe, title: "Global & 24/7", description: "Someone, somewhere, is always online." },
    { icon: Lock, title: "Private & Secure", description: "Non-downloadable video, encrypted rooms, and automated safety moderation." },
    { icon: Shield, title: "Designed for Connection", description: "The modern evolution of the classic 0055 conversation lines — re-engineered for today." }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Why Presence</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg">
              <feature.icon className="w-10 h-10 text-[#4285B9] mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
