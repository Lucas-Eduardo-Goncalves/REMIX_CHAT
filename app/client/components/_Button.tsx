import { twMerge } from "tailwind-merge";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...rest }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-cyan-600 disabled:bg-cyan-700 hover:bg-cyan-700 transition-all text-lg font-semibold p-3 rounded-md",
        className
      )}
      {...rest}
    />
  );
}
