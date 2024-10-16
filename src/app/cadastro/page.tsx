"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const cadastroSchema = z.object({
  nomeArvore: z.string().min(1, "Nome da árvore é obrigatório!"),
  descrBotanica: z.string().min(1, "Descrição da botânica é obrigatório!"),
});

export type CadastroSchema = z.infer<typeof cadastroSchema>;

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroSchema>({ resolver: zodResolver(cadastroSchema) });

  const onSubmit = (data: CadastroSchema) => {
    console.log(data);
  };

  return (
    <div className="bg-white m-2 p-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-lg h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-xs gap-4"
      >
        <div className="flex flex-col gap-1">
          <label className="text-zinc-800 text-sm">Nome da árvore</label>
          <input
            className="bg-zinc-200 border border-zinc-300 h-10 w-60 rounded-sm shadow-sm p-1"
            type="text"
            {...register("nomeArvore")}
          />
          <p className="text-sm text-red-400">{errors.nomeArvore?.message}</p>
          <label className="text-zinc-800 text-sm">Descrição botânica</label>
          <input
            className="bg-zinc-200 border border-zinc-300 h-10 w-60 rounded-sm shadow-sm p-1"
            type="textarea"
            {...register("descrBotanica")}
          />
          <p className="text-sm text-red-400">
            {errors.descrBotanica?.message}
          </p>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
