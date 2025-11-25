
import React from 'react';
import { PredictionResult, AuspiciousDay, BaZiChart } from '../types';
import { Sparkles, CalendarCheck, AlertCircle, RefreshCcw, User, ScrollText, Star } from 'lucide-react';

interface ResultViewProps {
  result: PredictionResult;
  onReset: () => void;
}

const BaziPillar: React.FC<{ label: string; val: string }> = ({ label, val }) => (
  <div className="flex flex-col items-center">
    <div className="w-full bg-black/5 border-b border-black/10 py-1 text-[10px] text-gray-500 font-medium uppercase tracking-wider">
      {label}
    </div>
    <div className="flex-1 flex items-center justify-center py-3 w-full">
      <div className="writing-vertical-lr text-xl font-serif font-bold text-gray-800 leading-loose tracking-widest">
        {val}
      </div>
    </div>
  </div>
);

const BaziCard: React.FC<{ bazi: BaZiChart }> = ({ bazi }) => (
  <div className="bg-[#F9F7F2] rounded-lg overflow-hidden border border-[#D4AF37]/30 shadow-md flex flex-col min-w-[260px] max-w-[300px] flex-1 relative">
    {/* Header */}
    <div className="bg-[#8E2800] text-[#F9F7F2] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full border border-[#F9F7F2]/30 flex items-center justify-center">
          <span className="text-xs font-serif">命</span>
        </div>
        <div>
          <div className="text-sm font-bold">{bazi.name}</div>
          {bazi.role && <div className="text-[10px] opacity-80">{bazi.role}</div>}
        </div>
      </div>
      <div className="text-right">
        <div className="text-[10px] opacity-70">元神</div>
        <div className="font-bold text-sm text-[#D4AF37]">{bazi.element}</div>
      </div>
    </div>

    {/* Pillars */}
    <div className="grid grid-cols-4 divide-x divide-[#D4AF37]/20 bg-white flex-1">
      <BaziPillar label="年柱" val={bazi.yearPillar} />
      <BaziPillar label="月柱" val={bazi.monthPillar} />
      <BaziPillar label="日柱" val={bazi.dayPillar} />
      <BaziPillar label="时柱" val={bazi.hourPillar} />
    </div>

    {/* Footer */}
    <div className="bg-[#F9F7F2] px-4 py-2 border-t border-[#D4AF37]/20 flex justify-between items-center text-xs text-gray-600">
      <span>身强: <span className="font-medium text-[#8E2800]">{bazi.strength}</span></span>
      <div className="w-2 h-2 rounded-full bg-[#8E2800]/20"></div>
    </div>
    
    {/* Decorative Corner */}
    <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#D4AF37]/10 rounded-tl-3xl"></div>
  </div>
);

const DayCard: React.FC<{ day: AuspiciousDay; index: number }> = ({ day, index }) => {
  const isHighScoring = day.score >= 90;
  
  return (
    <div 
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Left: Date Visual */}
        <div className={`w-full md:w-32 flex-shrink-0 flex flex-col items-center justify-center p-4 text-white ${isHighScoring ? 'bg-gradient-to-b from-[#C0392B] to-[#8E2800]' : 'bg-gradient-to-b from-[#D4AF37] to-[#B7950B]'}`}>
          <span className="text-xs opacity-80 uppercase tracking-widest mb-1">吉分</span>
          <span className="text-3xl font-serif font-bold mb-2">{day.score}</span>
          <div className="w-8 h-px bg-white/30 mb-2"></div>
          <span className="text-sm font-medium">{day.auspiciousLevels}</span>
        </div>

        {/* Right: Details */}
        <div className="flex-1 p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-serif font-bold text-gray-800 group-hover:text-[#8E2800] transition-colors">
              {day.date}
            </h3>
            {isHighScoring && <Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />}
          </div>
          
          <p className="text-gray-600 text-sm mb-4 leading-relaxed border-l-2 border-[#D4AF37]/30 pl-3">
            {day.reason}
          </p>
          
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {day.activities.map((act, i) => (
                <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-100 flex items-center gap-1">
                   <CalendarCheck className="w-3 h-3" /> {act}
                </span>
              ))}
            </div>
            
            {day.conflicts && (
              <div className="flex items-center gap-2 mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded inline-block">
                <AlertCircle className="w-3 h-3" />
                <span>冲煞: {day.conflicts}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ResultView: React.FC<ResultViewProps> = ({ result, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto pb-20 animate-fade-in">
      
      {/* Header Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-zen-text mb-2">
          天机运筹 · 吉日良辰
        </h2>
        <div className="h-1 w-20 bg-zen-gold mx-auto rounded-full"></div>
      </div>

      {/* Bazi Charts Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6 px-2">
          <ScrollText className="w-5 h-5 text-[#8E2800]" />
          <h3 className="font-serif font-bold text-xl text-gray-800">命盘分析</h3>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {result.bazis.map((bazi, idx) => (
            <BaziCard key={idx} bazi={bazi} />
          ))}
        </div>
      </div>

      {/* General Advice Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#D4AF37]/20 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 to-transparent -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-[#F9F7F2] flex items-center justify-center border border-[#D4AF37]">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h3 className="font-serif font-bold text-xl text-gray-800">大师批注</h3>
        </div>
        
        <div className="relative z-10 text-gray-700 leading-loose text-justify whitespace-pre-wrap font-serif text-lg">
          {result.generalAdvice}
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-6">
         <div className="flex items-center justify-between px-2 mb-2">
            <div className="flex items-center gap-3">
              <CalendarCheck className="w-5 h-5 text-[#8E2800]" />
              <h3 className="font-serif font-bold text-xl text-gray-800">精选吉日</h3>
            </div>
            <span className="text-xs text-gray-500">共找到 {result.days.length} 个吉日</span>
         </div>
        
        <div className="grid gap-6">
          {result.days.map((day, idx) => (
            <DayCard key={idx} day={day} index={idx} />
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="mt-16 text-center">
        <button 
          onClick={onReset}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-3 bg-white text-gray-600 border border-gray-200 rounded-full transition-all hover:bg-gray-50 hover:border-zen-gold hover:text-zen-text shadow-sm hover:shadow-md overflow-hidden"
        >
          <RefreshCcw className="w-4 h-4 transition-transform group-hover:rotate-180" />
          <span className="font-medium">重新测算其他事宜</span>
        </button>
      </div>
    </div>
  );
};
