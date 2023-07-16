import { twMerge } from "tailwind-merge";

type DividerProps = { className?: string };

export function Divider({ className }: DividerProps) {
  return (
    <aside className={twMerge("h-px flex-1 bg-neutral-900 my-4", className)} />
  );
}
