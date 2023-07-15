import { twMerge } from "tailwind-merge";
import type { ReactNode } from "react";

type InputContainerProps = {
  children: ReactNode;
  className?: string;
};

export function InputContainer({ children, className }: InputContainerProps) {
  return (
    <div className={twMerge("flex flex-col space-y-1", className)}>
      {children}
    </div>
  );
}
