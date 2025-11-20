import React from 'react';
import { cn } from '../utils/cn';

const Input = React.forwardRef(({ 
  className, 
  type = 'text', 
  label,
  error,
  helperText,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
          'disabled:bg-gray-100 disabled:cursor-not-allowed',
          error 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-gray-300 hover:border-gray-400',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

