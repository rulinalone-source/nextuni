import React from 'react';

interface NextVarsityLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const NextVarsityLogo: React.FC<NextVarsityLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const fontSizes = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-4xl sm:text-5xl',
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-xs sm:text-sm',
  };

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      {/* Pure Code Wordmark matching the 2nd image */}
      <div className={`font-display font-black tracking-tight leading-none ${fontSizes[size]}`}>
        <span className="text-[#006a4e]">Next</span>
        <span className="text-[#de2b3c]">Varsity</span>
      </div>

      {showSubtitle && (
        <div className={`flex items-center gap-1 font-medium text-slate-500 mt-0.5 tracking-tight ${subSizes[size]}`}>
          <span>বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি প্ল্যাটফর্ম</span>
          <svg className="w-2.5 h-2.5 text-[#006a4e]/70 shrink-0 inline" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
          </svg>
        </div>
      )}
    </div>
  );
};
