import NextLink from "next/link";
import type { ComponentProps } from "react";

import { mergeClassNames } from "@/src/client/common/utils/string";

interface LinkProps extends ComponentProps<typeof NextLink> {
  variant?: "primary" | "secondary";
}

const Link = ({ className = "", variant = "primary", ...props }: LinkProps) => {
  return (
    <NextLink
      {...props}
      className={mergeClassNames(
        "inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium transition",
        variant === "primary" &&
          "bg-black text-white hover:opacity-90 dark:bg-zinc-100 dark:text-black",
        variant === "secondary" &&
          "border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900",
        className
      )}
    />
  );
};

export { Link };
