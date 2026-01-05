import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { joinWaitlist } from '../lib/api';

interface WaitlistFormProps {
  location?: 'hero' | 'footer';
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ location = 'hero' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const joined = localStorage.getItem('vectra_waitlist_joined');
    if (joined === 'true') {
      setStatus('success');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    setError('');
    
    try {
      const result = await joinWaitlist(email);
      
      if (result.success) {
        setStatus('success');
        setEmail('');
        localStorage.setItem('vectra_waitlist_joined', 'true');
      } else {
        setStatus('error');
        setError(result.message || 'Failed to join');
      }
    } catch (err) {
      setStatus('error');
      setError('Connection error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 animate-in fade-in slide-in-from-bottom-2 ${location === 'hero' ? 'justify-center' : ''}`}>
        <CheckCircle2 size={20} />
        <span className="font-medium">You're on the list! We'll be in touch soon.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="relative flex items-center">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className={`w-full bg-slate-900/80 border ${status === 'error' ? 'border-red-500' : 'border-slate-700'} text-white placeholder-slate-500 rounded-full py-3.5 pl-6 pr-36 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all ${location === 'hero' ? 'h-14' : 'h-12'}`}
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`absolute right-1.5 top-1.5 bottom-1.5 bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-full px-5 flex items-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed ${location === 'hero' ? 'text-base' : 'text-sm'}`}
        >
          {status === 'loading' ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              Join Waitlist
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
      {status === 'error' && (
        <div className="absolute -bottom-6 left-6 text-xs text-red-400">
           {error}
        </div>
      )}
      {location === 'hero' && status !== 'error' && (
        <div className="absolute -bottom-6 left-6 text-xs text-slate-500">
          Join 2,000+ developers waiting for access.
        </div>
      )}
    </form>
  );
};

export default WaitlistForm;