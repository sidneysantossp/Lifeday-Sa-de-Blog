import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 ease-out whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide';

  const variantClasses = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30',
    secondary: 'bg-stone-900 text-white hover:bg-stone-800 shadow-md',
    outline: 'bg-transparent text-emerald-700 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300',
    ghost: 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;