interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function PrimaryButton({ children, className, ...rest }: ButtonProps) {
    return (
    <button
    {...rest}
    className={`flex h-12 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-hoverPrimary focus-visible:outline hover:shadow-[0px_0px_32px_rgba(99,_60,_255,_0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hoverPrimary active:bg-primary aria-disabled:cursor-not-allowed aria-disabled:opacity-50
        ${className}`
    }
    >
    {children}
    </button>
);
}
