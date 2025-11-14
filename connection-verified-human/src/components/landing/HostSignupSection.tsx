import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DollarSign, Calendar, Shield, MessageCircle, Star } from 'lucide-react';
import { isAdminDomain } from '@/lib/domainConfig';

export default function HostSignupSection() {
  // Only show this section on admin domain
  if (!isAdminDomain()) {
    return null;
  }

  const benefits = [
    { icon: Shield, text: "Verified global network" },
    { icon: Calendar, text: "Set your own availability" },
    { icon: DollarSign, text: "Earn ~$8–$10 per 10-minute chat" },
    { icon: MessageCircle, text: "No content creation, no pressure, just conversation" },
    { icon: Star, text: "Rebook system and personality tags included" }
  ];

  return (
    <section className="py-16 bg-[#4285B9] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Earn by Being Present for Someone</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
              <benefit.icon className="w-6 h-6 flex-shrink-0" />
              <span className="text-left">{benefit.text}</span>
            </div>
          ))}
        </div>
        <Button asChild size="lg" className="bg-white text-[#4285B9] hover:bg-gray-100 text-lg px-12 py-7 rounded-full">
          <Link to="/signup?type=host">Apply to Become a Host</Link>
        </Button>
      </div>
    </section>
  );
}
