import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={`rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-black dark:border-zinc-700 dark:bg-zinc-900 ${className}`.trim()}
    />
  );
};

export { Input };
