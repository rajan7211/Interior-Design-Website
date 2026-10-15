import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'olive' | 'ghost' | 'sand';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans uppercase font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus:ring-2 focus:ring-[#5D6853] focus:ring-offset-2';

  const sizeStyles = {
    sm: 'text-[11px] tracking-[0.16em] px-4 py-2.5',
    md: 'text-xs tracking-[0.18em] px-6 py-3.5',
    lg: 'text-xs tracking-[0.22em] px-8 py-4.5',
  };

  const variantStyles = {
    primary: 'bg-[#181716] text-[#FBF9F5] border border-[#181716] hover:bg-[#2A2724] active:bg-[#100F0E]',
    outline: 'bg-transparent text-[#181716] border border-[#181716] hover:bg-[#181716] hover:text-[#FBF9F5]',
    olive: 'bg-[#5D6853] text-[#FBF9F5] border border-[#5D6853] hover:bg-[#4A5442] active:bg-[#3B4235]',
    sand: 'bg-[#F2EDE4] text-[#181716] border border-[#E4DCD0] hover:bg-[#E8E0D3]',
    ghost: 'bg-transparent text-[#181716] hover:bg-black/5 border border-transparent',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
    </button>
  );
};

