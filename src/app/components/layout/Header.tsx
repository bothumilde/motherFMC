import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { RegistrationData } from '../../types/registration';

interface HeaderProps {
  isComplete: boolean;
  showReviewButton?: boolean;
  onReview?: () => void;
  registrationData?: RegistrationData | null;
}

export const Header: React.FC<HeaderProps> = ({ 
  isComplete, 
  showReviewButton = false,
  onReview,
  registrationData 
}) => {
  return (
    <header className="fixed top-0 w-full z-40 p-6 flex justify-between items-center bg-slate-950 border-b border-slate-900">
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white">
          IRON<span className="text-cyan-500">CLAD</span>
        </h1>
        <span className="text-[10px] md:text-xs font-medium text-slate-500 tracking-[0.2em] uppercase">
          Spec Configurator
        </span>
      </div>
      
      {registrationData && (
        <div className="hidden md:flex items-center gap-6 mr-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Project</span>
            <span className="text-xs font-mono text-slate-300">{registrationData.estructura}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Series</span>
            <span className="text-xs font-mono text-slate-300">{registrationData.serie}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Cliente</span>
            <span className="text-xs font-mono text-slate-300">{registrationData.cliente}</span>
          </div>
        </div>
      )}
      
      {showReviewButton && (
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Status</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isComplete ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className={`text-xs font-bold ${isComplete ? 'text-green-500' : 'text-amber-500'}`}>
                {isComplete ? 'READY' : 'IN PROGRESS'}
              </span>
            </div>
          </div>

          <button 
            onClick={onReview}
            className={`flex items-center gap-2 px-5 py-2.5 rounded text-sm font-bold transition-all border ${
              isComplete 
                ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                : "bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed opacity-50"
            }`}
            disabled={!isComplete}
          >
            <span>Review Spec</span>
            {isComplete ? <CheckCircle2 className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      )}
    </header>
  );
};
