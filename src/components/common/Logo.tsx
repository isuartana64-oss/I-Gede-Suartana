import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const SchoolLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
}) => {
  const sizeMap = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${sizeMap[size]} shrink-0 drop-shadow-sm flex items-center justify-center`}>
        <img
          src="/assets/aistudio/logo_smansel_6b130a51.png"
          alt="Logo Resmi SMAN 1 Selat"
          className="w-full h-full object-contain select-none pointer-events-none filter drop-shadow-sm"
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-extrabold text-base md:text-lg tracking-tight text-slate-800 dark:text-slate-100 leading-tight">
            SMAN 1 SELAT
          </span>
          <span className="text-xs font-medium text-sky-700 dark:text-sky-300">
            Portal Ujian & Sumatif Akhir Semester
          </span>
        </div>
      )}
    </div>
  );
};
