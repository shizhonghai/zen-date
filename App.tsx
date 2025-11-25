import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { InputForm } from './components/InputForm';
import { ResultView } from './components/ResultView';
import { Loading } from './components/Loading';
import { UserInput, PredictionResult } from './types';
import { calculateAuspiciousDays } from './services/geminiService';

enum AppState {
  HERO,
  INPUT,
  LOADING,
  RESULT,
  ERROR
}

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.HERO);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (data: UserInput) => {
    setAppState(AppState.LOADING);
    try {
      const prediction = await calculateAuspiciousDays(data);
      setResult(prediction);
      setAppState(AppState.RESULT);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "An unknown error occurred");
      setAppState(AppState.ERROR);
    }
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.HERO:
        return <HeroSection onStart={() => setAppState(AppState.INPUT)} />;
      
      case AppState.INPUT:
        return (
          <InputForm 
            onSubmit={handleFormSubmit} 
            onBack={() => setAppState(AppState.HERO)} 
          />
        );
      
      case AppState.LOADING:
        return <Loading />;
      
      case AppState.RESULT:
        return result ? (
          <ResultView 
            result={result} 
            onReset={() => setAppState(AppState.HERO)} 
          />
        ) : null;

      case AppState.ERROR:
        return (
          <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-red-100 max-w-md mx-auto mt-20">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">推算失败</h3>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <button 
              onClick={() => setAppState(AppState.INPUT)}
              className="px-6 py-2 bg-zen-text text-white rounded-lg hover:bg-gray-800"
            >
              返回重试
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-10">
      <header className="py-6 px-6 flex items-center justify-between sticky top-0 z-50 bg-[#F9F7F2]/90 backdrop-blur-sm">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setAppState(AppState.HERO)}
        >
          <div className="w-8 h-8 bg-zen-red text-white flex items-center justify-center rounded-md font-serif font-bold">
            禅
          </div>
          <span className="font-serif font-bold text-lg text-zen-text tracking-wide">
            ZenDate
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-4 md:pt-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;