import { twMerge } from "tailwind-merge";
import type { ReactNode } from "react";

type LayoutBodyProps = {
  children: ReactNode;
  className?: string;
};

export function LayoutBody({ children, className }: LayoutBodyProps) {
  return (
    <body
      className={twMerge(
        className,
        "bg-neutral-50 text-neutral-600 dark:bg-neutral-950 dark:text-neutral-200"
      )}
    >
      {children}
    </body>
  );
}
