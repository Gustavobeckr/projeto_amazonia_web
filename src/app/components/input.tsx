import { UseFormRegister } from "react-hook-form";
import { CadastroSchema } from "../cadastro/page";
import { HTMLInputTypeAttribute } from "react";

type InputPropType = {
  register: UseFormRegister<CadastroSchema>;
  label: string;
  name: string;
  type: HTMLInputTypeAttribute | undefined;
};

export default function Input({ register, label }: InputPropType) {
  return (
    <>
      {/* <label className="text-zinc-800 text-sm">{label}</label>
      <input
        className="bg-zinc-200 border border-zinc-300 h-10 w-60 rounded-sm shadow-sm p-1"
        type="text"
        {...register("nomeArvore")}
      />
      <p className="text-sm text-red-400">{errors.nomeArvore?.message}</p> */}
    </>
  );
}
