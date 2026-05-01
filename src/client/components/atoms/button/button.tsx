import type { ButtonHTMLAttributes, ReactNode } from "react";

import { mergeClassNames } from "@/src/client/common/utils/class-name/merge-class-names";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={mergeClassNames(
        "h-11 rounded-md bg-black text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-black",
        className
      )}
    >
      {children}
    </button>
  );
};

export { Button };
