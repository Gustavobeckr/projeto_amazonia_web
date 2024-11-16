import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface SelectInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  enum: string[];
}

export function SelectInput(props: SelectInputProps) {
  const { register } = useFormContext();

  return (
    <select
      id={props.name}
      className="border border-zinc-300 h-10 max-w-full rounded-lg shadow-sm p-1"
      {...register(props.name)}
    >
      {props.enum.map((value, index) => {
        return (
          <option value={value} key={index}>
            {value}
          </option>
        );
      })}
    </select>
  );
}
