import React from 'react';
import { X, Check } from 'lucide-react';

const ProblemSolution: React.FC = () => {
  return (
    <section id="comparison" className="py-24 px-6 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-normal text-zinc-100 mb-6 tracking-tight">Why Vectra</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Traditional builders lock you into generic templates. Design tools lack real code. 
            Vectra bridges the gap with real .jsx components.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Traditional Builders */}
          <div className="bg-zinc-900/50 p-8 rounded-[24px] border border-zinc-800 opacity-80 hover:opacity-100 transition-opacity backdrop-blur-sm group hover:border-zinc-700">
            <h3 className="text-xl font-medium text-zinc-200 mb-6">Traditional Builders</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-500 group-hover:text-zinc-400 transition-colors text-sm">
                <X className="text-red-400/80 shrink-0 mt-0.5" size={18} />
                <span>Generic, bloated templates</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-500 group-hover:text-zinc-400 transition-colors text-sm">
                <X className="text-red-400/80 shrink-0 mt-0.5" size={18} />
                <span>Impossible to export clean code</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-500 group-hover:text-zinc-400 transition-colors text-sm">
                <X className="text-red-400/80 shrink-0 mt-0.5" size={18} />
                <span>Vendor lock-in</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Design Tools */}
          <div className="bg-zinc-900/50 p-8 rounded-[24px] border border-zinc-800 opacity-80 hover:opacity-100 transition-opacity backdrop-blur-sm group hover:border-zinc-700">
            <h3 className="text-xl font-medium text-zinc-200 mb-6">Design Tools (Figma)</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-500 group-hover:text-zinc-400 transition-colors text-sm">
                <X className="text-red-400/80 shrink-0 mt-0.5" size={18} />
                <span>Static images, no logic</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-500 group-hover:text-zinc-400 transition-colors text-sm">
                <X className="text-red-400/80 shrink-0 mt-0.5" size={18} />
                <span>Hand-off is painful</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-500 group-hover:text-zinc-400 transition-colors text-sm">
                <X className="text-red-400/80 shrink-0 mt-0.5" size={18} />
                <span>"Auto-layout" isn't Flexbox</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Vectra */}
          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 p-8 rounded-[24px] border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.15)] relative overflow-hidden transform md:-translate-y-4 ring-1 ring-white/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
            <h3 className="text-2xl font-normal text-zinc-100 mb-6 flex items-center gap-2">
              Vectra
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] uppercase font-bold tracking-wider border border-indigo-500/20">The Solution</span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-300 text-sm">
                <Check className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                <span>Real .jsx components tailored to your stack</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300 text-sm">
                <Check className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                <span>Fully responsive & fluid layouts</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300 text-sm">
                <Check className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                <span>Infinite customization via props</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300 text-sm">
                <Check className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                <span>Zero lock-in (It's just React code)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;