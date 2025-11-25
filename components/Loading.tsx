import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-zen-red rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-2xl animate-pulse">
          ☯
        </div>
      </div>
      <h3 className="text-xl font-serif text-zen-text mb-2">正在推演天机...</h3>
      <p className="text-sm text-gray-500 animate-pulse">排盘中 · 查神煞 · 定吉凶</p>
    </div>
  );
};