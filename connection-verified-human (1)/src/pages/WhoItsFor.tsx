import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MessageCircle, Handshake, Ban } from 'lucide-react';

export default function WhoItsFor() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-[28px] font-bold text-black mb-6">
          Who It's For
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Presence is for anyone seeking genuine human connection in a safe, structured environment.
        </p>


        <div className="space-y-[60px]">
          <div className="border-l-4 border-[#E53935] pl-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-[#E53935]" />
              <h2 className="text-[20px] font-semibold">For Members</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>• People who are lonely or simply want genuine conversation</li>
              <li>• Those not interested in AI companionship or simulated relationships</li>
              <li>• People frustrated by dating apps or platforms filled with bots and fake accounts</li>
              <li>• Travelers looking for trusted local connection</li>
              <li>• Remote workers missing daily human interaction</li>
              <li>• Those seeking perspective, advice, or just a listening ear</li>
            </ul>


            <Button asChild className="mt-6 bg-[#E53935] hover:bg-[#c62828]">
              <Link to="/signup?type=member">Join as Member</Link>
            </Button>
          </div>

          <div className="border-l-4 border-[#4285B9] pl-6">
            <div className="flex items-center gap-3 mb-4">
              <Handshake className="w-6 h-6 text-[#4285B9]" />
              <h2 className="text-[20px] font-semibold">For Hosts</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>• Empathetic listeners who enjoy helping others</li>
              <li>• Mentors, life coaches, or professionals offering guidance</li>
              <li>• People seeking flexible income and purpose-driven work</li>
              <li>• Those who value authentic human connection</li>
            </ul>

            <Button asChild className="mt-6 bg-[#4285B9] hover:bg-[#2563EB]">
              <Link to="/signup?type=host">Become a Host</Link>
            </Button>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Ban className="w-6 h-6 text-gray-700" />
              <h2 className="text-[20px] font-semibold">What Presence Is Not</h2>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li>• Not a dating or romantic platform</li>
              <li>• Not social media or a live broadcast site</li>
              <li>• Not AI companionship or chatbot conversation</li>
              <li>• Not therapy or medical consultation</li>
            </ul>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

