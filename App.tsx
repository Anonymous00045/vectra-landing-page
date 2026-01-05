import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Code, 
  Zap, 
  Smartphone, 
  MousePointer2, 
  Check, 
  Menu, 
  X, 
  ArrowRight,
  LayoutTemplate,
  Play,
  Settings,
  Maximize2,
  Loader2
} from 'lucide-react';
import { Particles } from './components/Particles';
import { Footer } from './components/Footer';
import ProblemSolution from './components/ProblemSolution';
import { joinWaitlist, getWaitlistStats } from './lib/api';

// --- Components ---

const VectraLogo = ({ className = "w-10 h-10", variant = "primary" }: { className?: string, variant?: 'primary' | 'neutral' }) => {
  const colorStyles = variant === 'primary' 
    ? "bg-indigo-300 text-indigo-950" 
    : "bg-zinc-800 text-zinc-400";
  
  return (
    <div className={`${className} ${colorStyles} rounded-xl flex items-center justify-center shadow-sm select-none`} aria-hidden="true">
      <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M5 6L12 20" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeDasharray="3 3" 
        />
        <path 
          d="M12 20L19 6" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
        <circle cx="5" cy="6" r="1.5" fill="currentColor" />
        <circle cx="19" cy="6" r="1.5" fill="currentColor" />
        <rect x="10.5" y="18.5" width="3" height="3" fill="currentColor" />
      </svg>
    </div>
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      // Update URL hash without jumping
      try {
        window.history.pushState(null, '', `#${id}`);
      } catch (err) {
        // Ignore security errors in sandboxed environments
        console.debug('History update skipped due to environment restrictions');
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-900/95 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" onClick={(e) => handleNavClick('top', e)} className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg p-1">
          <VectraLogo variant="primary" className="w-10 h-10" />
          <span className="text-xl font-medium text-zinc-100 tracking-tight">Vectra</span>
        </a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          <a 
            href="#features" 
            onClick={(e) => handleNavClick('features', e)}
            className="text-zinc-300 hover:text-indigo-300 hover:bg-zinc-800/50 px-4 py-2 rounded-full transition-all text-sm font-medium tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => handleNavClick('how-it-works', e)}
            className="text-zinc-300 hover:text-indigo-300 hover:bg-zinc-800/50 px-4 py-2 rounded-full transition-all text-sm font-medium tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            How it works
          </a>
          <a 
            href="#waitlist" 
            onClick={(e) => handleNavClick('waitlist', e)}
            className="bg-indigo-300 text-indigo-950 px-6 py-2.5 rounded-full font-medium text-sm hover:bg-indigo-200 transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          >
            Join Waitlist
          </a>
        </nav>

        <button 
          className="md:hidden text-zinc-100 p-2 hover:bg-zinc-800 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="absolute top-full left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-6 md:hidden flex flex-col gap-4 shadow-xl rounded-b-[28px]">
          <a 
            href="#features" 
            className="text-zinc-300 hover:bg-zinc-800 px-4 py-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" 
            onClick={(e) => handleNavClick('features', e)}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="text-zinc-300 hover:bg-zinc-800 px-4 py-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" 
            onClick={(e) => handleNavClick('how-it-works', e)}
          >
            How it works
          </a>
          <a 
            href="#waitlist" 
            onClick={(e) => handleNavClick('waitlist', e)}
            className="bg-indigo-300 text-indigo-950 px-4 py-3 rounded-full text-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            Join Waitlist
          </a>
        </div>
      )}
    </header>
  );
};

const InterfaceMockup = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Builder', 'Code', 'Preview'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="demo" className="w-full max-w-5xl mx-auto mt-16 perspective-1000 scroll-mt-32" aria-hidden="true">
      <div className="relative bg-zinc-900 rounded-[28px] border border-zinc-800 shadow-2xl overflow-hidden transform rotate-x-2 transition-all duration-700 hover:rotate-0 ring-1 ring-white/5">
        
        <div className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center px-6 justify-between">
          <div className="flex gap-3">
            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
          </div>
          
          <div className="flex bg-zinc-800 rounded-full p-1" role="tablist">
            {tabs.map((tab, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`panel-${i}`}
                id={`tab-${i}`}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  activeTab === i 
                    ? 'bg-zinc-700 text-zinc-100 shadow-sm' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="w-16"></div> 
        </div>

        <div className="flex h-[400px] md:h-[500px]">
          {/* Sidebar */}
          <div className="w-16 md:w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
            <div className="p-6 hidden md:block">
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-4">Library</div>
              <div className="space-y-1">
                {['Hero Section', 'Navbar', 'Feature Grid', 'Footer', 'Pricing Card'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-400 p-3 hover:bg-indigo-300/10 hover:text-indigo-200 rounded-full cursor-move group transition-colors">
                    <LayoutTemplate size={16} className="text-zinc-500 group-hover:text-indigo-300" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 md:hidden flex flex-col gap-6 items-center mt-4">
               <LayoutTemplate size={24} className="text-zinc-500" />
               <Settings size={24} className="text-zinc-500" />
               <Layers size={24} className="text-zinc-500" />
            </div>
          </div>

          <div className="flex-1 bg-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#a5b4fc 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            {/* Builder View */}
            <div 
                role="tabpanel" 
                id="panel-0" 
                aria-labelledby="tab-0"
                className={`absolute inset-0 p-8 transition-opacity duration-500 flex items-center justify-center ${activeTab === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <div className="w-3/4 h-3/4 bg-zinc-900 rounded-[20px] border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center relative shadow-lg">
                <div className="absolute -top-3 -left-3 bg-indigo-300 text-indigo-950 text-xs font-bold px-3 py-1 rounded-full shadow-sm">Hero Section</div>
                <h3 className="text-2xl font-normal text-zinc-200 mb-2">Build Beautifully.</h3>
                <p className="text-zinc-500 mb-6 text-sm">Drag components here...</p>
                <div className="flex gap-4">
                  <div className="h-10 w-28 bg-indigo-300/20 rounded-full animate-pulse"></div>
                  <div className="h-10 w-28 bg-zinc-800 rounded-full"></div>
                </div>
                
                <div className="absolute bottom-10 right-10 flex flex-col items-center animate-bounce">
                  <MousePointer2 className="text-pink-400 fill-pink-400 transform -rotate-12 drop-shadow-md" size={32} />
                  <span className="bg-pink-400 text-pink-950 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">User 1</span>
                </div>
              </div>
            </div>

            {/* Code View */}
            <div 
                role="tabpanel" 
                id="panel-1" 
                aria-labelledby="tab-1"
                className={`absolute inset-0 p-8 transition-opacity duration-500 overflow-hidden ${activeTab === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <div className="font-mono text-sm text-zinc-300 space-y-2 bg-zinc-900/50 p-6 rounded-[20px] h-full border border-zinc-800/50">
                <p><span className="text-indigo-300">import</span> React <span className="text-indigo-300">from</span> <span className="text-emerald-300">'react'</span>;</p>
                <p><span className="text-indigo-300">export default function</span> <span className="text-yellow-200">Hero</span>() {'{'}</p>
                <div className="pl-4 border-l-2 border-zinc-800 ml-1">
                  <p><span className="text-indigo-300">return</span> (</p>
                  <p className="pl-4">&lt;<span className="text-blue-300">section</span> <span className="text-purple-300">className</span>=<span className="text-emerald-300">"bg-zinc-900"</span>&gt;</p>
                  <p className="pl-8">&lt;<span className="text-blue-300">h1</span>&gt;Build Fully Functional...&lt;/<span className="text-blue-300">h1</span>&gt;</p>
                  <p className="pl-8">&lt;<span className="text-blue-300">Button</span> <span className="text-purple-300">variant</span>=<span className="text-emerald-300">"filled"</span>&gt;</p>
                  <p className="pl-12">Join Waitlist</p>
                  <p className="pl-8">&lt;/<span className="text-blue-300">Button</span>&gt;</p>
                  <p className="pl-4">&lt;/<span className="text-blue-300">section</span>&gt;</p>
                  <p>);</p>
                </div>
                <p>{'}'}</p>
              </div>
            </div>

            {/* Preview View */}
            <div 
                role="tabpanel" 
                id="panel-2" 
                aria-labelledby="tab-2"
                className={`absolute inset-0 transition-opacity duration-500 flex flex-col items-center justify-center bg-zinc-50 ${activeTab === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Ready for Launch?</h1>
                <p className="text-zinc-600 max-w-md mb-8 leading-relaxed">This is a live preview. Fully responsive material design implementation.</p>
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-indigo-700 transition-all">
                  Get Started
                </button>
              </div>
              <div className="absolute top-6 right-6 flex gap-3">
                <div className="bg-zinc-200 p-2 rounded-full"><Smartphone size={20} className="text-zinc-600" /></div>
                <div className="bg-zinc-200 p-2 rounded-full"><Maximize2 size={20} className="text-zinc-600" /></div>
              </div>
            </div>

          </div>

          <div className="w-64 bg-zinc-900 border-l border-zinc-800 hidden lg:block p-6">
            <div className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-6">Properties</div>
            <div className="space-y-6">
              <div>
                <label className="text-xs text-zinc-400 block mb-2 font-medium">Background</label>
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 cursor-pointer ring-2 ring-indigo-300 ring-offset-2 ring-offset-zinc-900"></div>
                   <div className="w-8 h-8 rounded-full bg-indigo-500 cursor-pointer hover:ring-2 ring-indigo-300 ring-offset-2 ring-offset-zinc-900"></div>
                   <div className="w-8 h-8 rounded-full bg-white cursor-pointer"></div>
                </div>
              </div>
              <div>
                 <label className="text-xs text-zinc-400 block mb-2 font-medium">Spacing (rem)</label>
                 <input type="range" className="w-full accent-indigo-300 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" />
              </div>
              <div>
                 <label className="text-xs text-zinc-400 block mb-2 font-medium">Animation</label>
                 <div className="flex justify-between items-center bg-zinc-800 p-3 rounded-xl text-xs text-zinc-300 border border-zinc-800 hover:border-zinc-600 transition-colors cursor-pointer">
                    <span>Fade In Up</span>
                    <Play size={12} />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-zinc-900 p-8 rounded-[24px] transition-all duration-300 hover:bg-zinc-800 group relative z-10 border border-zinc-800 hover:border-indigo-500/30">
    <div className="w-12 h-12 bg-indigo-300/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-300 group-hover:scale-110 transition-all duration-300">
      <Icon className="text-indigo-300 group-hover:text-indigo-950" size={24} strokeWidth={2} />
    </div>
    <h3 className="text-xl font-normal text-zinc-100 mb-3 tracking-tight">{title}</h3>
    <p className="text-zinc-400 leading-relaxed text-sm font-normal">{description}</p>
  </div>
);

const Hero = () => {
  const scrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background blobs for Hero specifically */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div role="status" className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 mb-8 hover:bg-zinc-800 transition-colors cursor-pointer">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span>
          <span className="text-sm font-medium text-zinc-300 tracking-wide">Public Beta 2026</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-normal text-zinc-100 tracking-tighter mb-8 leading-[1.1]">
          Build Fully Functional <br />
          <span className="text-indigo-300">React Websites.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Drag real components. Customize with infinite precision. 
          Export clean, production-ready code.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a 
            href="#waitlist" 
            onClick={scrollToWaitlist}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-300 text-indigo-950 rounded-full font-medium text-base hover:bg-indigo-200 transition-all hover:shadow-[0_0_20px_rgba(165,180,252,0.3)] flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          >
            Join Waitlist <ArrowRight size={20} />
          </a>
          
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-indigo-300 rounded-full font-medium border border-zinc-700 hover:bg-indigo-300/10 hover:border-indigo-300 transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900">
            <Play size={20} className="fill-current" /> Watch Demo
          </button>
        </div>

        <InterfaceMockup />
        
        <div className="mt-12 text-sm text-zinc-600 font-medium tracking-wide uppercase">
          Open Design Labs — Est. 2026
        </div>
      </div>
    </section>
  );
};

const Problem = () => (
  <section id="how-it-works" className="py-32 px-6 relative z-10 scroll-mt-20">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-normal text-zinc-200 mb-16 leading-tight text-center tracking-tight">
        "Templates are <span className="text-red-300 italic">generic</span>.<br/>Design tools are <span className="text-red-300 italic">static</span>."
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[24px] border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors backdrop-blur-sm">
          <div className="w-10 h-10 bg-red-900/30 rounded-full flex items-center justify-center mb-4 text-red-300">
             <X size={20} />
          </div>
          <h3 className="text-zinc-200 font-medium mb-2 text-lg">The Old Way</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">Restricted by rigid templates. Impossible to customize logic without breaking everything.</p>
        </div>

        <div className="p-8 rounded-[24px] border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors backdrop-blur-sm">
          <div className="w-10 h-10 bg-red-900/30 rounded-full flex items-center justify-center mb-4 text-red-300">
             <X size={20} />
          </div>
          <h3 className="text-zinc-200 font-medium mb-2 text-lg">Design Tools</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">Great visuals, but handing off static PNGs creates friction. The code never matches.</p>
        </div>

        <div className="p-8 rounded-[24px] bg-indigo-300/10 border border-indigo-300/20 hover:bg-indigo-300/15 transition-colors backdrop-blur-sm">
          <div className="w-10 h-10 bg-indigo-300 rounded-full flex items-center justify-center mb-4 text-indigo-950">
             <Check size={20} strokeWidth={3} />
          </div>
          <h3 className="text-indigo-200 font-medium mb-2 text-lg">The Vectra Way</h3>
          <p className="text-indigo-200/70 text-sm leading-relaxed">Manipulate real .jsx components. Responsive, interactive, and production-ready code.</p>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    { icon: Layers, title: "Real Components", description: "Drag and drop actual React components from our library or import your own system." },
    { icon: Zap, title: "Visual Logic", description: "Define button actions, state changes, and API calls visually without boilerplate." },
    { icon: Settings, title: "Deep Customization", description: "Control every CSS property, animation frame, and prop directly." },
    { icon: Smartphone, title: "Auto-Responsive", description: "Smart stacking algorithms ensure your layout works on all devices automatically." },
    { icon: MousePointer2, title: "Familiar UX", description: "Shortcuts, snap-to-grid alignment, and instant visual feedback." },
    { icon: Code, title: "Clean Export", description: "Export semantic, human-readable React code. No vendor lock-in." }
  ];

  return (
    <section id="features" className="py-24 px-6 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-normal text-zinc-100 mb-4 tracking-tight">More than a builder</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light">Bridging design freedom and engineering rigor.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FeatureCard 
              key={i} 
              icon={f.icon} 
              title={f.title} 
              description={f.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(5000);

  useEffect(() => {
    // Check if user already joined locally
    const saved = localStorage.getItem("vectra_waitlist_joined");
    if (saved === "true") {
      setStatus("success");
    }

    // Load initial stats from Cloud/API
    getWaitlistStats().then(stats => {
      setCount(stats.count);
      setTotal(stats.total);
    });

    const interval = setInterval(() => {
        // Poll for updates (or simulate live updates)
        getWaitlistStats().then(stats => {
            setCount(stats.count);
        });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const percentage = Math.min(Math.round((count / total) * 100), 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
        const result = await joinWaitlist(email);
        
        if (result.success) {
            setStatus("success");
            setEmail("");
            localStorage.setItem("vectra_waitlist_joined", "true");
            if (result.stats) {
                setCount(result.stats.count);
            }
        } else {
            setStatus("error");
            setErrorMessage(result.message || "Something went wrong.");
        }
    } catch (err) {
        setStatus("error");
        setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <section id="waitlist" className="py-32 bg-zinc-900/50 backdrop-blur-sm relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl font-normal text-zinc-100 mb-6 tracking-tight">Join the Revolution</h2>
        <p className="text-lg text-zinc-400 mb-12 font-light">
          Early access members get lifetime discounts. Be the first to build the future.
        </p>

        <div className="mb-4 text-left" role="group" aria-label="Waitlist Capacity">
           <div className="flex justify-between text-xs font-medium text-indigo-300 mb-2 uppercase tracking-wide">
              <span id="progress-label">Spots Filled</span>
              <span aria-hidden="true">{percentage}%</span>
           </div>
           <div 
            className="bg-zinc-800 rounded-full h-1 w-full overflow-hidden" 
            role="progressbar" 
            aria-labelledby="progress-label"
            aria-valuenow={percentage} 
            aria-valuemin={0} 
            aria-valuemax={100}
           >
             <div 
               className="h-full bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.5)] transition-all duration-1000 ease-out"
               style={{ width: `${percentage}%` }}
             ></div>
           </div>
           <p className="text-xs text-zinc-500 mt-2 text-right">{count.toLocaleString()} developers waiting</p>
        </div>

        {status === "success" ? (
          <div role="alert" className="bg-emerald-900/20 border border-emerald-900/50 text-emerald-200 p-8 rounded-[24px] animate-fade-in flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mb-4 text-emerald-950">
                <Check size={24} strokeWidth={3} />
            </div>
            <h3 className="font-medium text-xl mb-1">You're on the list!</h3>
            <p className="text-emerald-200/70">Check your inbox soon for early access details.</p>
            <button 
              onClick={() => {
                setStatus("idle");
                localStorage.removeItem("vectra_waitlist_joined");
              }}
              className="mt-6 text-xs text-emerald-400/50 hover:text-emerald-400 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Reset (Debug)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group text-left">
                    <input 
                    id="waitlist-email"
                    type="email" 
                    placeholder=" " 
                    className="peer w-full px-6 py-4 bg-zinc-800 border-b-2 border-zinc-600 rounded-t-xl text-zinc-100 placeholder-transparent focus:outline-none focus:border-indigo-300 focus:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all disabled:opacity-50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    required
                    />
                    <label 
                    htmlFor="waitlist-email"
                    className="absolute left-6 top-4 text-zinc-400 text-base transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-300 -translate-y-0 peer-focus:-translate-y-0 pointer-events-none"
                    >
                        Email address
                    </label>
                </div>

                <button 
                type="submit" 
                disabled={status === "loading"}
                className="px-8 py-4 bg-indigo-300 hover:bg-indigo-200 text-indigo-950 font-medium rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                >
                {status === "loading" ? (
                    <Loader2 className="animate-spin w-5 h-5 text-indigo-950" />
                ) : "Get Access"}
                </button>
            </div>
            {status === 'error' && (
                <div className="text-red-400 text-sm bg-red-900/10 p-2 rounded border border-red-900/20">{errorMessage}</div>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-indigo-300 selection:text-indigo-950 relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <Particles
            className="absolute inset-0"
            quantity={100}
            ease={80}
            color="#ffffff"
            refresh
        />
      </div>
      <main className="relative z-10">
        <Navigation />
        <Hero />
        <Problem />
        <Features />
        <ProblemSolution />
        <Waitlist />
        <Footer />
      </main>
    </div>
  );
}