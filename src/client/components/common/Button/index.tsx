import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`h-11 rounded-md bg-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-black ${className}`.trim()}
    >
      {children}
    </button>
  );
};

export { Button };
