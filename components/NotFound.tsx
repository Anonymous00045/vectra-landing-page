import React from 'react';
import { Globe } from './Globe';
import { ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  onBack?: (e: React.MouseEvent) => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden text-white selection:bg-indigo-500/30">
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center max-w-2xl px-4 text-center">
        <div className="mb-8 relative w-full max-w-[500px] aspect-square flex items-center justify-center">
           <Globe className="w-full h-full opacity-80" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-20"></div>
        </div>
        
        <h1 className="text-8xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600">404</h1>
        <h2 className="text-2xl font-medium text-slate-300 mb-8">Page not found</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <a 
          href="/"
          onClick={onBack}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all flex items-center gap-2 group shadow-lg shadow-indigo-500/20 cursor-pointer"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;