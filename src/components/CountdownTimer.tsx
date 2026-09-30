import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  label?: string;
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  label = 'Time Remaining Until Deadline:',
  compact = false
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate + 'T23:59:59').getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <div className={`inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 border border-rose-200 ${compact ? 'text-[11px]' : ''}`}>
        <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
        <span>Deadline Expired</span>
      </div>
    );
  }

  const isEndingSoon = timeLeft.days <= 5;

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-bold ${
        isEndingSoon
          ? 'bg-rose-100 text-rose-800 animate-pulse border border-rose-300'
          : 'bg-amber-100 text-amber-900 border border-amber-300'
      }`}>
        <Clock className="h-3 w-3" />
        <span>
          {timeLeft.days}d {timeLeft.hours}h left
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 rounded-xl p-3 ${
      isEndingSoon
        ? 'bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 shadow-2xs'
        : 'bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200'
    }`}>
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <span className="flex items-center gap-1">
          <Clock className={`h-3.5 w-3.5 ${isEndingSoon ? 'text-rose-600 animate-spin' : 'text-amber-600'}`} />
          {label}
        </span>
        {isEndingSoon ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
            Ending Soon!
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
            <CheckCircle2 className="h-3 w-3" />
            Applications Open
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="rounded-lg bg-white/90 p-1.5 shadow-2xs border border-slate-200/80">
          <span className="block text-base font-extrabold text-slate-900">{timeLeft.days}</span>
          <span className="text-[10px] font-semibold text-slate-500 uppercase">Days</span>
        </div>
        <div className="rounded-lg bg-white/90 p-1.5 shadow-2xs border border-slate-200/80">
          <span className="block text-base font-extrabold text-slate-900">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-[10px] font-semibold text-slate-500 uppercase">Hours</span>
        </div>
        <div className="rounded-lg bg-white/90 p-1.5 shadow-2xs border border-slate-200/80">
          <span className="block text-base font-extrabold text-slate-900">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-[10px] font-semibold text-slate-500 uppercase">Minutes</span>
        </div>
        <div className="rounded-lg bg-white/90 p-1.5 shadow-2xs border border-slate-200/80">
          <span className="block text-base font-extrabold text-amber-600 font-mono">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-[10px] font-semibold text-slate-500 uppercase">Seconds</span>
        </div>
      </div>
    </div>
  );
};
