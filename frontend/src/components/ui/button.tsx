import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  variant: "black" | "white";
  className?: string;
}
export default function Button({
  label,
  variant,
  className,
  ...props
}: IButton) {
  const variants = {
    black:
      "bg-black text-white hover:bg-black/70 disabled:bg-black/60 transition",
    white: "bg-white text-black",
  };
  return (
    <button
      {...props}
      className={cn(
        "w-full rounded-xl py-2  font-semibold",
        variants[variant],
        className
      )}
    >
      {label}
    </button>
  );
}
