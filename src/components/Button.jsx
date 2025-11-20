import React from 'react';
import { cn } from '../utils/cn';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 border-transparent',
        secondary: 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/30 border-transparent',
        outline: 'bg-transparent border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300',
        ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 border-transparent shadow-none',
        danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30 border-transparent',
    };

    const sizes = {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
    };

    return (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 border',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
