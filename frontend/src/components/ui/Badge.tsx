import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'olive' | 'sand' | 'charcoal' | 'outline';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const base = 'inline-flex items-center font-sans uppercase font-medium tracking-[0.14em] transition-colors';
  
  const sizeStyles = {
    sm: 'text-[9px] px-2.5 py-1',
    md: 'text-[10px] px-3 py-1.5',
  };

  const variants = {
    default: 'bg-[#F2EDE4] text-[#181716] border border-[#E4DCD0]',
    sand: 'bg-[#EAE4D7] text-[#2A2724]',
    olive: 'bg-[#EEF1EB] text-[#4A5442] border border-[#D5DDCF]',
    charcoal: 'bg-[#181716] text-[#FBF9F5]',
    outline: 'bg-transparent text-[#757069] border border-[#E7E2D8]',
  };

  return (
    <span className={`${base} ${sizeStyles[size]} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

