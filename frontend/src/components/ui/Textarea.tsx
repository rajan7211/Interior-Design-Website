import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full text-left">
        {label && (
          <label 
            htmlFor={textareaId} 
            className="block text-[11px] font-sans font-medium uppercase tracking-[0.16em] text-[#3D3934] mb-2"
          >
            {label}
            {props.required && <span className="text-[#847262] ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`w-full bg-[#FFFFFF] border text-[#181716] p-4 text-sm font-sans placeholder:text-[#A39E96] transition-all duration-200 outline-none resize-y
            ${error ? 'border-red-400 focus:border-red-500 ring-1 ring-red-400' : 'border-[#E7E2D8] hover:border-[#D4CDBC] focus:border-[#181716] focus:ring-1 focus:ring-[#181716]'}
            ${className}`}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-600 font-sans">{error}</p>}
        {!error && helperText && <p className="mt-1.5 text-xs text-[#757069] font-sans">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

