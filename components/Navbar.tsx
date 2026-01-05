import React from 'react';
import { Sparkles } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-slate-950/80 backdrop-blur-md border-slate-800 py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-gradient-to-br from-brand-400 to-indigo-600 p-1.5 rounded-lg group-hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-shadow">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Vectra</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#comparison" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Why Vectra</a>
          <button 
            onClick={scrollToWaitlist}
            className="text-sm font-semibold bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full border border-white/10 transition-all hover:scale-105"
          >
            Get Early Access
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;