import React from 'react';
import { useEventEase } from '../context/EventEaseContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useEventEase();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isWarning = toast.type === 'warning';

  return (
    <div 
      role="status" 
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in transition-all"
    >
      <div className={`flex items-start gap-3 p-4 rounded-xl shadow-xl border ${
        isSuccess 
          ? 'bg-white border-[#E8A5B2] text-[#232120]' 
          : isWarning 
          ? 'bg-[#FFF7ED] border-[#FDBA74] text-[#9A3412]' 
          : 'bg-white border-[#E8E1D9] text-[#232120]'
      }`}>
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#6B1728]" />}
          {isWarning && <AlertCircle className="w-5 h-5 text-[#C2410C]" />}
          {!isSuccess && !isWarning && <Info className="w-5 h-5 text-[#6B1728]" />}
        </div>
        <div className="flex-1 text-sm font-medium pr-2 leading-relaxed">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
