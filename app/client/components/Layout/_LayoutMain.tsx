import { twMerge } from "tailwind-merge";
import type { ReactNode } from "react";

type LayoutMainProps = {
  children: ReactNode;
  className?: string;
};

export function LayoutMain({ children, className }: LayoutMainProps) {
  return (
    <main className={twMerge("w-[100vw] h-[100vh]", className)}>
      {children}
    </main>
  );
}
