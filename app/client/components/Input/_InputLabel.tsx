import { twMerge } from "tailwind-merge";
import type { LabelHTMLAttributes } from "react";

type InputLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function InputLabel({ children, className, ...rest }: InputLabelProps) {
  return (
    <label
      className={twMerge(
        "text-md font-semibold whitespace-nowrap w-min text-neutral-950 dark:text-neutral-50",
        className
      )}
      {...rest}
    >
      {children}
    </label>
  );
}
