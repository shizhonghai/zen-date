
import React, { useState } from 'react';
import { UserInput, Gender, PURPOSES, PersonProfile, PurposeDefinition } from '../types';
import { Clock, User, ArrowRight, ChevronLeft, Calendar, CheckCircle2 } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
  onBack: () => void;
}

const emptyProfile = (defaultGender: Gender = Gender.MALE): PersonProfile => ({
  name: '',
  gender: defaultGender,
  birthDate: '',
  birthTime: '12:00',
});

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, onBack }) => {
  const [step, setStep] = useState(1); // 1: Purpose, 2: Details
  const [selectedPurpose, setSelectedPurpose] = useState<PurposeDefinition | null>(null);
  
  const [targetMonth, setTargetMonth] = useState(new Date().toISOString().slice(0, 7));
  
  const [personA, setPersonA] = useState<PersonProfile>(emptyProfile(Gender.MALE));
  const [personB, setPersonB] = useState<PersonProfile>(emptyProfile(Gender.FEMALE));

  const handlePurposeSelect = (purpose: PurposeDefinition) => {
    setSelectedPurpose(purpose);
    setStep(2);
    
    // Default configurations based on purpose
    if (purpose.id === 'wedding') {
        setPersonA(emptyProfile(Gender.MALE));
        setPersonB(emptyProfile(Gender.FEMALE));
    } else {
        setPersonA(emptyProfile(Gender.MALE));
    }
  };

  const handleSubmit = () => {
    if (!selectedPurpose) return;

    const people = [personA];
    const roles = [selectedPurpose.roles.a];

    if (selectedPurpose.requiresTwo && selectedPurpose.roles.b) {
      people.push(personB);
      roles.push(selectedPurpose.roles.b);
    }

    onSubmit({
      purpose: selectedPurpose.id,
      purposeLabel: selectedPurpose.label,
      targetMonth,
      people,
      roles
    });
  };

  const isFormValid = () => {
    const isAValid = personA.name && personA.birthDate;
    const isBValid = !selectedPurpose?.requiresTwo || (personB.name && personB.birthDate);
    return isAValid && isBValid && targetMonth;
  };

  const renderProfileInputs = (
    profile: PersonProfile, 
    setProfile: React.Dispatch<React.SetStateAction<PersonProfile>>, 
    title: string, 
    borderColor: string = 'border-gray-200'
  ) => (
    <div className={`bg-white/50 backdrop-blur-sm p-6 rounded-xl border ${borderColor} shadow-sm hover:shadow-md transition-shadow duration-300`}>
      <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-zen-text text-zen-gold flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
        <h3 className="font-serif font-bold text-lg text-zen-text">
          {title}
        </h3>
      </div>
      
      <div className="space-y-5">
        {/* Name & Gender */}
        <div className="flex gap-4">
          <div className="flex-1 group">
            <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1 group-focus-within:text-zen-red transition-colors">姓名</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:border-zen-red focus:ring-1 focus:ring-zen-red outline-none text-sm transition-all"
              placeholder="请输入姓名"
            />
          </div>
          <div className="w-28">
            <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">性别</label>
            <div className="flex rounded-lg overflow-hidden border border-gray-200 p-0.5 bg-gray-50">
               <button
                  onClick={() => setProfile(prev => ({ ...prev, gender: Gender.MALE }))}
                  className={`flex-1 py-2 text-xs font-medium rounded-md transition-all duration-300 ${
                    profile.gender === Gender.MALE
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  男
                </button>
                <button
                  onClick={() => setProfile(prev => ({ ...prev, gender: Gender.FEMALE }))}
                  className={`flex-1 py-2 text-xs font-medium rounded-md transition-all duration-300 ${
                    profile.gender === Gender.FEMALE
                      ? 'bg-white text-pink-700 shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  女
                </button>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1 group-focus-within:text-zen-red transition-colors">出生日期 (公历)</label>
            <div className="relative">
              <input
                type="date"
                value={profile.birthDate}
                onChange={(e) => setProfile(prev => ({ ...prev, birthDate: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:border-zen-red focus:ring-1 focus:ring-zen-red outline-none text-sm transition-all appearance-none"
              />
            </div>
          </div>
          <div className="group">
            <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1 group-focus-within:text-zen-red transition-colors">出生时辰</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-zen-red transition-colors" />
              <input
                type="time"
                value={profile.birthTime}
                onChange={(e) => setProfile(prev => ({ ...prev, birthTime: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:border-zen-red focus:ring-1 focus:ring-zen-red outline-none text-sm transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
      
      {/* Step Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={step === 2 ? () => setStep(1) : onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 text-gray-600 transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-serif font-bold text-zen-text">
              {step === 1 ? '请选择测算事宜' : selectedPurpose?.label}
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-light">
              {step === 1 ? '知天命，尽人事，顺时而动' : selectedPurpose?.description}
            </p>
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="hidden md:flex items-center gap-2">
          <div className={`h-2 w-8 rounded-full transition-colors ${step >= 1 ? 'bg-zen-red' : 'bg-gray-200'}`}></div>
          <div className={`h-2 w-8 rounded-full transition-colors ${step >= 2 ? 'bg-zen-red' : 'bg-gray-200'}`}></div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-6 md:p-8 min-h-[500px]">
        
        {step === 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {PURPOSES.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePurposeSelect(p)}
                className="group relative flex flex-col items-center p-6 rounded-2xl border border-transparent hover:border-zen-gold/30 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-zen-gold/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-zen-gold/10 transition-colors"></div>
                
                <span className="text-4xl mb-4 transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 filter drop-shadow-sm">
                  {p.icon}
                </span>
                <span className="font-serif font-bold text-lg text-gray-800 mb-1 relative z-10">
                  {p.label.split(' ')[0]}
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-wider relative z-10">
                  {p.label.split(' ')[1].replace(/[()]/g, '')}
                </span>
                
                {/* Subtle decoration */}
                <div className="mt-4 w-8 h-0.5 bg-gray-100 group-hover:bg-zen-gold/50 transition-colors"></div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && selectedPurpose && (
          <div className="space-y-8 animate-fade-in">
            {/* Two Column Layout for Forms */}
            <div className={`grid ${selectedPurpose.requiresTwo ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-8`}>
              {renderProfileInputs(
                personA, 
                setPersonA, 
                selectedPurpose.roles.a,
                selectedPurpose.requiresTwo ? 'border-blue-100 bg-blue-50/10' : undefined
              )}
              
              {selectedPurpose.requiresTwo && selectedPurpose.roles.b && renderProfileInputs(
                personB, 
                setPersonB, 
                selectedPurpose.roles.b,
                'border-pink-100 bg-pink-50/10'
              )}
            </div>

            {/* Bottom Action Area */}
            <div className="bg-gray-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100">
              <div className="flex-1 w-full md:w-auto">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zen-red" /> 
                  预想吉月
                </label>
                <input
                  type="month"
                  value={targetMonth}
                  onChange={(e) => setTargetMonth(e.target.value)}
                  min={new Date().toISOString().slice(0, 7)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-zen-gold focus:ring-2 focus:ring-zen-gold/20 outline-none transition bg-white font-medium text-gray-700"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-zen-text to-gray-800 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span>开始推演</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
