import React, { useState } from 'react';
import { ArrowRight, Layout, Code, Play, MousePointer2, Layers, Settings, Maximize2 } from 'lucide-react';
import WaitlistForm from './WaitlistForm';

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visual' | 'code'>('visual');

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
          </span>
          <span className="text-xs font-medium text-brand-200">Coming 2026 — Join the revolution</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]">
          Build Fully Functional <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-500 to-indigo-500">
            React Websites Visually
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Drag real React components like in Figma. Endless customization with animations, 
          videos, and heroes — exporting clean, production-ready code.
        </p>

        {/* CTA */}
        <div className="w-full max-w-md mb-20">
          <WaitlistForm location="hero" />
        </div>

        {/* The Mockup Interface */}
        <div className="w-full max-w-6xl mx-auto rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur shadow-2xl overflow-hidden relative group">
          
          {/* Mockup Window Controls */}
          <div className="h-10 border-b border-slate-800 bg-slate-900 flex items-center px-4 justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
            <div className="text-xs text-slate-500 font-mono">Vectra Studio - Project Alpha</div>
            <div className="flex gap-3 text-slate-500">
               <Play size={14} className="hover:text-green-400 cursor-pointer" />
               <Layout size={14} className="hover:text-brand-400 cursor-pointer" />
            </div>
          </div>

          {/* Mockup Body */}
          <div className="flex h-[400px] md:h-[600px] overflow-hidden">
            
            {/* Left Sidebar (Components) */}
            <div className="w-16 md:w-64 border-r border-slate-800 bg-slate-900/80 flex flex-col hidden sm:flex">
              <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">Components</div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2 mockup-scroll">
                {['Hero Section', 'Feature Grid', 'Pricing Card', 'Navbar', 'Testimonial'].map((item, i) => (
                  <div key={i} className="p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-brand-500/50 rounded flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all group/item">
                    <Layout size={14} className="text-slate-500 group-hover/item:text-brand-400" />
                    <span className="text-sm text-slate-300 hidden md:block">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Canvas */}
            <div className="flex-1 bg-[#0b0f19] relative flex flex-col">
              
              {/* Canvas Toolbar */}
              <div className="h-10 border-b border-slate-800 flex items-center justify-center gap-4 px-4 bg-slate-900/30">
                <button 
                  onClick={() => setActiveTab('visual')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${activeTab === 'visual' ? 'bg-brand-500/20 text-brand-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Design
                </button>
                <button 
                  onClick={() => setActiveTab('code')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${activeTab === 'code' ? 'bg-brand-500/20 text-brand-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Code
                </button>
              </div>

              {/* Canvas Area */}
              <div className="flex-1 relative p-8 flex items-center justify-center overflow-hidden bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
                
                {activeTab === 'visual' ? (
                  <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-8 transform transition-all duration-500 hover:scale-[1.01] group/canvas">
                    {/* Fake Selection Box */}
                    <div className="absolute inset-0 border-2 border-brand-500/0 group-hover/canvas:border-brand-500/50 rounded-lg pointer-events-none transition-colors">
                      <div className="absolute -top-3 -left-[1px] bg-brand-500 text-white text-[10px] px-2 py-0.5 rounded-t opacity-0 group-hover/canvas:opacity-100 transition-opacity">
                        HeroContainer
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="h-8 w-3/4 bg-slate-800 rounded animate-pulse"></div>
                      <div className="h-4 w-1/2 bg-slate-800/50 rounded animate-pulse"></div>
                      <div className="flex gap-4 mt-6">
                        <div className="h-10 w-32 bg-brand-600 rounded"></div>
                        <div className="h-10 w-32 bg-slate-800 border border-slate-700 rounded"></div>
                      </div>
                    </div>

                    {/* Floating Cursor Mockup */}
                    <div className="absolute bottom-10 right-10 pointer-events-none animate-float opacity-80">
                      <MousePointer2 className="text-brand-400 fill-brand-400/20 rotate-[-15deg]" size={24} />
                      <div className="bg-brand-500 text-white text-[10px] px-2 py-0.5 rounded ml-4 mt-1">
                        You
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-[#0d1117] p-6 rounded-lg border border-slate-800 font-mono text-sm overflow-hidden relative">
                     <div className="text-slate-400">
                        <span className="text-pink-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-200">Hero</span>() {'{'} <br/>
                        &nbsp;&nbsp;<span className="text-pink-400">return</span> (<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">section</span> <span className="text-purple-400">className</span>=<span className="text-orange-300">"relative py-20"</span>&gt;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">h1</span>&gt;Build Faster&lt;/<span className="text-green-400">h1</span>&gt;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">Button</span> <span className="text-purple-400">variant</span>=<span className="text-orange-300">"primary"</span>&gt;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get Started<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-green-400">Button</span>&gt;<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-green-400">section</span>&gt;<br/>
                        &nbsp;&nbsp;);<br/>
                        {'}'}
                     </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar (Properties) */}
            <div className="w-64 border-l border-slate-800 bg-slate-900/80 hidden lg:flex flex-col">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Properties</span>
                <Settings size={12} className="text-slate-600" />
              </div>
              <div className="p-4 space-y-6">
                 <div>
                    <div className="text-xs text-slate-500 mb-2">Layout</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-8 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-slate-400 text-xs">Flex</div>
                      <div className="h-8 bg-slate-800/30 rounded border border-slate-700/50 flex items-center justify-center text-slate-600 text-xs">Grid</div>
                    </div>
                 </div>
                 <div>
                    <div className="text-xs text-slate-500 mb-2">Spacing</div>
                    <div className="grid grid-cols-4 gap-2">
                       {[1,2,3,4].map(n => <div key={n} className="h-6 bg-slate-800 rounded border border-slate-700/50"></div>)}
                    </div>
                 </div>
                 <div>
                    <div className="text-xs text-slate-500 mb-2">Typography</div>
                    <div className="h-8 w-full bg-slate-800 rounded border border-slate-700 mb-2"></div>
                    <div className="flex gap-2">
                       <div className="h-8 w-full bg-slate-800 rounded border border-slate-700"></div>
                       <div className="h-8 w-12 bg-slate-800 rounded border border-slate-700 text-center text-xs text-slate-400 leading-8">600</div>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
        
        <div className="mt-8 text-sm text-slate-500 font-medium">
          By <span className="text-slate-300">Open Design Labs</span> — Coming 2026
        </div>

      </div>
    </section>
  );
};

export default Hero;