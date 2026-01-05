import React from 'react';
import { Lock } from 'lucide-react';

const Teaser: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 border-y border-slate-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900/40 to-brand-900/40 border border-indigo-500/20 p-10 md:p-16 text-center">
          
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
             <Lock size={120} className="text-white rotate-12" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
            Secure Your Founder Perks
          </h2>
          <p className="text-lg text-indigo-200 mb-8 max-w-2xl mx-auto relative z-10">
            Early access members get lifetime discounts, direct access to our roadmap, 
            and a "Founder" badge on their profile.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 overflow-hidden">
                   <img src={`https://picsum.photos/seed/${i + 40}/100/100`} alt="User" className="w-full h-full object-cover opacity-80" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                +2k
              </div>
            </div>
            <span className="text-sm font-medium text-indigo-200">Developers already joined</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teaser;