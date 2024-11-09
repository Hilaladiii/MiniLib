import { InputHTMLAttributes } from "react";
import {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

interface IInput<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldError;
}
export default function Input<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  ...props
}: IInput<T>) {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        {...register(name)}
        {...props}
        className="px-4 py-2 rounded-xl border border-border200 placeholder:text-xs bg-white"
      />
      {errors && (
        <span className="text-xs text-red-500 mt-1">{errors.message}</span>
      )}
    </div>
  );
}
