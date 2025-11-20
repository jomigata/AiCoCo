variants[variant],
    sizes[size],
    className
            )}
disabled = { isLoading || props.disabled}
{...props }
        >
    { isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
{ children }
        </button >
    );
});

Button.displayName = 'Button';

export default Button;
