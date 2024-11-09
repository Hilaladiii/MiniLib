import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "black" | "white";
  className?: string;
}
export default function Button({
  children,
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
      {children}
    </button>
  );
}
