import { twMerge } from "tailwind-merge";
import type { InputHTMLAttributes } from "react";
import { useActionData } from "@remix-run/react";

type InputFieldProps = {
  disabledErrorBorder?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputField({
  disabledErrorBorder,
  children,
  className,
  ...rest
}: InputFieldProps) {
  const actionData = useActionData();
  const inputIsError = rest?.name
    ? !!actionData?.fieldErrors?.[rest?.name]
    : false;

  return (
    <input
      className={twMerge(
        "text-md bg-neutral-50 focus:border-cyan-600 rounded-md p-3 outline-none border-2 border-transparent dark:bg-neutral-800 font-semibold ",
        className,
        inputIsError && !disabledErrorBorder
          ? "border-red-600 dark:border-red-700"
          : ""
      )}
      {...rest}
    />
  );
}
