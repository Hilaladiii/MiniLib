import * as React from "react";
import { cn } from "@/utils/cn";
import {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

interface IInput<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, IInput<any>>(
  ({ className, type, label, name, register, errors, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label htmlFor={name} className="text-sm font-medium">
            {label}
          </label>
        )}
        <input
          id={name}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
            errors ? "border-red-500" : ""
          )}
          {...register(name)}
          {...props}
        />
        {errors && (
          <span className="text-xs text-red-500">{errors.message}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
