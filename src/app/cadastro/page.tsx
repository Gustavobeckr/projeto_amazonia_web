"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../components/Form";
import Modal from "../components/Modal";
import { useState } from "react";
import { MapPin, X } from "lucide-react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const mimeTypePermitido = ["image/png", "image/jpeg"];

const cadastroFormSchema = z.object({
  nomeArvore: z.string().min(3, "Nome da árvore é obrigatório!"),
  descrBotanica: z.string().min(3, "Descrição da botânica é obrigatório!"),
  imagem: z
    .custom<FileList>()
    .transform((list) => list.item(0))
    .refine(
      (file) => mimeTypePermitido.includes(file?.type!),
      "São permitidas apenas imagens do tipo png e jpeg!"
    ),
});

export type CadastroFormData = z.infer<typeof cadastroFormSchema>;

export default function Cadastro() {
  const [openModal, setOpenModal] = useState(false);

  const createArvoreForm = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroFormSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = createArvoreForm;

  const onSubmit = (data: CadastroFormData) => {
    console.log(data.imagem);
  };

  return (
    <div className="bg-zinc-100 m-2 p-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-lg h-screen shadow-lg">
      <FormProvider {...createArvoreForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <div className="flex flex-row gap-5">
            <Form.Column>
              <Form.Field>
                <Form.Label htmlFor="nomeArvore">Nome da árvore</Form.Label>
                <Form.Input type="text" name="nomeArvore" />
                <Form.ErrorMessage field="nomeArvore" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="descrBotanica">
                  Descrição botânica
                </Form.Label>
                <textarea
                  rows={3}
                  className=" border border-zinc-300 rounded-sm shadow-sm p-1"
                  {...register("descrBotanica")}
                />
                <Form.ErrorMessage field="descrBotanica" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="nomeArvore">Ocorrência natural</Form.Label>
                <button
                  type="button"
                  onClick={() => setOpenModal(!openModal)}
                  className="bg-zinc-300 rounded-md p-2  text-sm hover:bg-zinc-400"
                >
                  Selecione uma localização
                </button>
                <Modal isOpen={openModal} mapaEscolherLocal={true}>
                  <header className="flex items-center justify-between">
                    <h1 className="text-zinc-800 text-lg">
                      Selecione uma localização para a árvore
                    </h1>
                    <a
                      className="hover:text-red-500 hover:shadow-lg rounded-lg m-1"
                      onClick={() => setOpenModal(!openModal)}
                    >
                      <X />
                    </a>
                  </header>

                  <Map />
                </Modal>
                <Form.ErrorMessage field="nomeArvore" />
              </Form.Field>
            </Form.Column>
            <Form.Column>
              <Form.Field>
                <Form.Label htmlFor="imagem">Foto da Árvore</Form.Label>
                <Form.Input
                  className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-zinc-300 
                        hover:file:bg-green-300"
                  type="file"
                  name="imagem"
                  accept="image/*"
                />
                <Form.ErrorMessage field="imagem" />
              </Form.Field>
            </Form.Column>
          </div>
          <button
            type="submit"
            className="m-4 p-2 bg-emerald-400 rounded-md shadow-md hover:bg-emerald-500"
          >
            Salvar
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
