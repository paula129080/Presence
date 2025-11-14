import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { isAdminDomain } from '@/lib/domainConfig';

export default function HeroSection() {
  const showHostButton = isAdminDomain();
  
  return (
    <section className="bg-white pt-20 pb-16 md:pt-28 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
          Real Conversations. Real People. Anytime, Anywhere.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl mx-auto">
          Presence is the world's first verified human-connection network — a safe, structured, 10-minute chat with a real person whenever you need someone to talk to.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="bg-[#4285B9] hover:bg-[#3367a0] text-white text-lg px-12 py-7 rounded-full">
            <Link to="/signup?type=member">Enter Presence</Link>
          </Button>
          
          {showHostButton && (
            <Button asChild size="lg" variant="outline" className="text-lg px-12 py-7 border-2 border-black text-black hover:bg-black hover:text-white rounded-full">
              <Link to="/signup?type=host">Become a Host</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
