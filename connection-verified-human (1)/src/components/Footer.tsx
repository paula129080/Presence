import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="https://d64gsuwffb70l.cloudfront.net/691101850d8aec5ba0174c7c_1762724135040_f050f12b.png" alt="Presence" className="h-8 mb-4" />
            <p className="text-sm text-gray-600 font-semibold mb-4">Verified People. Safe Conversations.</p>
            <p className="text-sm text-gray-600">
              <a href="mailto:support@presencegroup.net" className="hover:text-[#4285B9]">
                support@presencegroup.net
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <div className="space-y-2">
              <Link to="/plans" className="block text-sm text-gray-600 hover:text-[#4285B9]">Plans</Link>
              <Link to="/how-it-works" className="block text-sm text-gray-600 hover:text-[#4285B9]">How It Works</Link>
              <Link to="/what-is-presence" className="block text-sm text-gray-600 hover:text-[#4285B9]">What is Presence</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link to="/terms" className="block text-sm text-gray-600 hover:text-[#4285B9]">Terms of Service</Link>
              <Link to="/privacy" className="block text-sm text-gray-600 hover:text-[#4285B9]">Privacy Policy</Link>
              <Link to="/host-agreement" className="block text-sm text-gray-600 hover:text-[#4285B9]">Host Agreement</Link>
              <Link to="/contact" className="block text-sm text-gray-600 hover:text-[#4285B9]">Contact</Link>
            </div>
          </div>


          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-[#4285B9]" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#4285B9]" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#4285B9]" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <LanguageSelector />
          <p className="text-sm text-gray-600 text-center">
            © 2025 Retail Jam Pty Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
