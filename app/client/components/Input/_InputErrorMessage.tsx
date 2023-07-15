import { twMerge } from "tailwind-merge";
import type { ReactNode } from "react";

type InputErrorMessageProps = {
  content?: ReactNode;
  className?: string;
};

export function InputErrorMessage({
  content,
  className,
}: InputErrorMessageProps) {
  if (!content) return <></>;
  return (
    <label
      className={twMerge(
        "text-sm font-semibold whitespace-nowrap w-min text-red-600 dark:text-red-700",
        className
      )}
    >
      {content}
    </label>
  );
}
