import type { InputHTMLAttributes } from "react";

import { mergeClassNames } from "@/src/client/common/utils/class-name/merge-class-names";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={mergeClassNames(
        "rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-black dark:border-zinc-700 dark:bg-zinc-900",
        className
      )}
    />
  );
};

export { Input };
