
import React from 'react';
import { Compass } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center animate-fade-in relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-10 left-10 w-32 h-32 border-[1px] border-zen-gold/20 rounded-full opacity-50"></div>
         <div className="absolute bottom-20 right-10 w-48 h-48 border-[1px] border-zen-gold/20 rounded-full opacity-50"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zen-gold/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mb-8 transform hover:rotate-45 transition-transform duration-1000 ease-in-out cursor-default">
        <div className="absolute inset-0 bg-zen-gold blur-3xl opacity-20 rounded-full"></div>
        <div className="w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-zen-bg relative">
             <div className="absolute inset-1 border border-gray-200 rounded-full"></div>
             <div className="absolute inset-3 border border-gray-100 rounded-full"></div>
             <Compass className="w-16 h-16 text-zen-red" strokeWidth={1.5} />
        </div>
      </div>
      
      <h1 className="relative z-10 text-5xl md:text-7xl font-serif font-bold text-zen-text mb-6 tracking-tight">
        <span className="text-zen-red">易</span>算日
      </h1>
      
      <div className="relative z-10 flex flex-col items-center gap-2 mb-10">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-zen-gold to-transparent"></div>
        <p className="text-lg md:text-xl text-gray-600 font-serif tracking-wide">
          顺天时 · 得地利 · 拥人和
        </p>
        <p className="text-sm text-gray-400 max-w-md leading-relaxed mt-2">
          融合传统八字命理与现代人工智能，<br className="hidden md:block"/>为您精准推算婚嫁、开业、乔迁等良辰吉日。
        </p>
      </div>
      
      <button 
        onClick={onStart}
        className="relative z-10 group px-10 py-4 bg-[#8E2800] text-[#F9F7F2] font-bold text-lg rounded-full shadow-[0_10px_20px_rgba(142,40,0,0.2)] hover:shadow-[0_15px_25px_rgba(142,40,0,0.3)] transition-all transform hover:-translate-y-1 active:translate-y-0 overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
        <span className="relative flex items-center gap-2">
           立即择吉
        </span>
      </button>

      <div className="mt-16 grid grid-cols-3 gap-8 md:gap-16 text-center relative z-10">
        <div className="flex flex-col items-center gap-2">
           <div className="text-2xl mb-1">🔮</div>
           <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">八字排盘</div>
        </div>
        <div className="flex flex-col items-center gap-2">
           <div className="text-2xl mb-1">📅</div>
           <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">精准择日</div>
        </div>
        <div className="flex flex-col items-center gap-2">
           <div className="text-2xl mb-1">✨</div>
           <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">吉凶分析</div>
        </div>
      </div>
    </div>
  );
};
