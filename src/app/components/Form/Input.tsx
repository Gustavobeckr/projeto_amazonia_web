import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function Input(props: InputProps) {
  const { register } = useFormContext();

  return (
    <input
      id={props.name}
      className="border border-zinc-300 h-10 max-w-full rounded-lg shadow-sm p-1"
      {...register(props.name)}
      {...props}
    />
  );
}
