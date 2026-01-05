import React, { useEffect, useState } from 'react';
import WaitlistForm from './WaitlistForm';
import { getWaitlistStats } from '../lib/api';

const WaitlistSection: React.FC = () => {
  const [stats, setStats] = useState({ count: 3420, total: 5000 });

  useEffect(() => {
    // Fetch initial stats
    getWaitlistStats().then(setStats);
    
    // Optional: Poll for updates
    const interval = setInterval(() => {
        getWaitlistStats().then(setStats);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const progress = Math.min((stats.count / stats.total) * 100, 100);

  return (
    <section id="waitlist" className="py-24 bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to ship faster?</h2>
        <p className="text-slate-400 text-lg mb-10">
          Join the waitlist to get early access before we launch publicly in 2026.
        </p>

        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
          <WaitlistForm location="footer" />
          
          <div className="mt-8">
            <div className="flex justify-between text-sm font-medium text-slate-400 mb-2">
              <span>Progress to Beta</span>
              <span>{stats.count.toLocaleString()} / {stats.total.toLocaleString()} joined</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-brand-500 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;