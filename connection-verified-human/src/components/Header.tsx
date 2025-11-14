import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src="https://d64gsuwffb70l.cloudfront.net/691101850d8aec5ba0174c7c_1762724135040_f050f12b.png" alt="Presence" className="h-8" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/what-is-presence" className="text-black hover:text-[#4285B9] transition">What is Presence</Link>
            <Link to="/how-it-works" className="text-black hover:text-[#4285B9] transition">How It Works</Link>
            <Link to="/why-its-safe" className="text-black hover:text-[#4285B9] transition">Why It's Safe</Link>
            <Link to="/who-its-for" className="text-black hover:text-[#4285B9] transition">Who It's For</Link>
            <Link to="/login" className="text-black hover:text-[#4285B9] transition">Login</Link>
            <Button asChild className="bg-[#4285B9] hover:bg-[#3367a0]">
              <Link to="/signup">Join Us</Link>
            </Button>


          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
         {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link to="/what-is-presence" className="block py-2">What is Presence</Link>
            <Link to="/how-it-works" className="block py-2">How It Works</Link>
            <Link to="/why-its-safe" className="block py-2">Why It's Safe</Link>
            <Link to="/who-its-for" className="block py-2">Who It's For</Link>
            <Link to="/login" className="block py-2">Login</Link>
            <Link to="/signup" className="block py-2">
              <Button className="w-full bg-[#4285B9] hover:bg-[#3367a0]">Join Us</Button>


            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
