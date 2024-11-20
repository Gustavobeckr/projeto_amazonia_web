import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface TextAreaProp extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function TextArea(props: TextAreaProp) {
  const { register } = useFormContext();

  return (
    <textarea
      id={props.name}
      rows={3}
      className=" border border-zinc-300 rounded-sm shadow-sm p-1 max-w-full"
      {...register(props.name)}
    />
  );
}
