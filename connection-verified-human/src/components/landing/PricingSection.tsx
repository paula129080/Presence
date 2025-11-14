import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { isAdminDomain } from '@/lib/domainConfig';

export default function PricingSection() {
  const showRevenueSplit = isAdminDomain();
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Pricing</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="border-2 border-gray-200 rounded-lg p-8 hover:border-[#4285B9] transition-colors">
            <h3 className="text-2xl font-bold mb-2">Adhoc Chat</h3>
            <div className="text-4xl font-bold text-[#4285B9] mb-4">$18</div>
            <ul className="space-y-3 mb-6 text-gray-700">
              <li>One verified 10-minute session</li>
              {showRevenueSplit && (
                <>
                  <li>Presence share: $6</li>
                  <li>Host share: $12</li>
                </>
              )}
            </ul>
            <Button asChild className="w-full bg-[#4285B9] hover:bg-[#3367a0]">
              <Link to="/signup?type=member">Get Started</Link>
            </Button>
          </div>
          
          <div className="border-2 border-[#4285B9] rounded-lg p-8 bg-blue-50">
            <h3 className="text-2xl font-bold mb-2">Weekly Access</h3>
            <div className="text-4xl font-bold text-[#4285B9] mb-4">$40</div>
            <ul className="space-y-3 mb-6 text-gray-700">
              <li>Three sessions per week — any host, any time</li>
              {showRevenueSplit && (
                <>
                  <li>Presence share: $10</li>
                  <li>Host share: $30</li>
                </>
              )}
            </ul>
            <Button asChild className="w-full bg-[#4285B9] hover:bg-[#3367a0]">
              <Link to="/signup?type=member">Get Started</Link>
            </Button>
          </div>
        </div>
        <p className="text-center text-gray-600 mt-6">Secure payments via Stripe. No free chats available.</p>
      </div>
    </section>
  );
}
