import React from 'react';

interface AdBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed' | 'sticky-bottom';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  format = 'horizontal',
  className = ''
}) => {
  return (
    <div className={`my-6 mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-dashed border-slate-300 bg-gradient-to-b from-slate-50 to-slate-100/70 p-3 text-center shadow-xs transition-all hover:border-slate-400 ${className}`}>
      <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
          Advertisement
        </span>
        <span className="text-[10px] text-slate-400">Google AdSense Space</span>
      </div>

      {format === 'horizontal' && (
        <div className="flex h-[90px] w-full items-center justify-center rounded-lg bg-white/80 p-2 text-slate-500 shadow-2xs">
          <div className="text-center">
            <p className="text-xs font-medium text-slate-700">Responsive Leaderboard Banner (728 × 90)</p>
            <p className="text-[11px] text-slate-400">Auto-responsive display ad slot</p>
          </div>
        </div>
      )}

      {format === 'rectangle' && (
        <div className="flex h-[250px] w-full items-center justify-center rounded-lg bg-white/80 p-4 text-slate-500 shadow-2xs">
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">Medium Rectangle Ad (300 × 250)</p>
            <p className="text-xs text-slate-400">Sidebar / In-Article Ad Unit</p>
          </div>
        </div>
      )}

      {format === 'in-feed' && (
        <div className="flex h-[80px] w-full items-center justify-center rounded-lg bg-white/80 p-2 text-slate-500 shadow-2xs">
          <div className="text-center">
            <p className="text-xs font-medium text-slate-700">In-Feed Native Ad Unit</p>
            <p className="text-[11px] text-slate-400">All Tools Sponsored Content Area</p>
          </div>
        </div>
      )}

      {format === 'sticky-bottom' && (
        <div className="flex h-[60px] w-full items-center justify-center rounded-lg bg-white/95 p-2 text-slate-500 shadow-sm">
          <p className="text-xs font-medium text-slate-700">Sticky Bottom Anchor Ad (320 × 50 / 728 × 90)</p>
        </div>
      )}
    </div>
  );
};
