import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full text-left">
        {label && (
          <label 
            htmlFor={selectId} 
            className="block text-[11px] font-sans font-medium uppercase tracking-[0.16em] text-[#3D3934] mb-2"
          >
            {label}
            {props.required && <span className="text-[#847262] ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`w-full bg-[#FFFFFF] border text-[#181716] px-4 py-3 text-sm font-sans appearance-none cursor-pointer transition-all duration-200 outline-none
              ${error ? 'border-red-400 focus:border-red-500 ring-1 ring-red-400' : 'border-[#E7E2D8] hover:border-[#D4CDBC] focus:border-[#181716] focus:ring-1 focus:ring-[#181716]'}
              ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#757069]">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="mt-1.5 text-xs text-red-600 font-sans">{error}</p>}
        {!error && helperText && <p className="mt-1.5 text-xs text-[#757069] font-sans">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

