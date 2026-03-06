import React from 'react';
import { motion } from 'motion/react';
import { RegistrationForm } from '../components/registration/RegistrationForm';
import { RegistrationData } from '../types/registration';

interface RegistrationPageProps {
  onComplete: (data: RegistrationData) => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col relative">
      <header className="fixed top-0 w-full z-40 p-6 flex justify-between items-center bg-slate-950 border-b border-slate-900">
        <div className="flex flex-col">
          <h1 
            className="text-xl md:text-2xl font-fameca font-bold tracking-tighter text-white uppercase leading-none"
            >
            FAME<span 
              className="text-cyan-500" 
              style={{ WebkitTextStroke: '1px #06b6d4' }}
            >
            CA
            </span>
          </h1>
          <span className="text-[10px] md:text-xs font-sans font-medium text-slate-500 tracking-[0.2em] uppercase mt-1">
            Registro maestro
          </span>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center relative pt-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RegistrationForm onComplete={onComplete} />
        </motion.div>
      </main>
    </div>
  );
};
