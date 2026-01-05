import React from 'react';
import { Box, Code2, MousePointerClick, Smartphone, Layers, Zap } from 'lucide-react';

const features = [
  {
    icon: Box,
    title: "Drag Real React Components",
    description: "Access a vast library of pre-built components or import your own. Drag, drop, and nest them just like typical HTML elements."
  },
  {
    icon: MousePointerClick,
    title: "Visual Logic Editing",
    description: "Attach event handlers and state logic visually. Click a button to define its onClick action without writing boilerplate."
  },
  {
    icon: Zap,
    title: "Endless Customization",
    description: "Tweak animation springs, video backgrounds, and complex hero interactions using a powerful property inspector."
  },
  {
    icon: Smartphone,
    title: "Auto Responsive",
    description: "Design mobile-first. Our smart stacking engine automatically handles media queries and breakpoints for you."
  },
  {
    icon: Layers,
    title: "Figma-like UX",
    description: "Feel at home with smart alignment guides, keyboard shortcuts, and instant visual feedback. Zero learning curve for designers."
  },
  {
    icon: Code2,
    title: "Clean Code Export",
    description: "No spaghetti code. Export semantic, accessible, and TypeScript-ready React code that developers actually want to read."
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            More than just a <span className="text-brand-400">UI Kit</span>.
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A complete development environment disguised as a design tool.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 group-hover:bg-brand-500/20 flex items-center justify-center mb-6 transition-colors">
                <feature.icon className="text-slate-300 group-hover:text-brand-400 transition-colors" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;