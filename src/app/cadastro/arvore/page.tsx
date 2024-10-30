"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { useCadastroArvore } from "../../hooks/useCadastro";
import {
  CadastroFormData,
  cadastroFormSchema,
} from "../../components/Form/arvore/ValidacaoCadastroArvore";
import { Form } from "../../components/Form";
import { parseCookies } from "nookies";
import { redirect, RedirectType } from "next/navigation";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

export default async function CadastroArvore() {
  useEffect(() => {
    const { AMAZONDEX_TOKEN: token } = parseCookies();
    if (!token) {
      redirect("/", RedirectType.replace);
    }
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const { cadastrarArvore, position, setPosition, serviceError } =
    useCadastroArvore();

  const createArvoreForm = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroFormSchema),
  });

  const { register, handleSubmit } = createArvoreForm;

  const onSubmit = async (data: CadastroFormData) => {
    await cadastrarArvore(data);
  };

  return (
    <div className="bg-zinc-100 m-2 p-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-lg  shadow-lg">
      <FormProvider {...createArvoreForm}>
        <Form.Label className="flex mx-2 h-4 items-center font-semibold text-3xl">
          Cadastro de Árvores
        </Form.Label>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col my-4 mx-2"
        >
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
                  className=" border border-zinc-300 rounded-sm shadow-sm p-1 max-w-full"
                  {...register("descrBotanica")}
                />
                <Form.ErrorMessage field="descrBotanica" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="localArvore">
                  Ocorrência natural
                </Form.Label>
                <button
                  type="button"
                  onClick={() => setOpenModal(!openModal)}
                  className="bg-zinc-300 rounded-md p-2 text-sm hover:bg-green-300 max-w-full"
                >
                  Selecione uma localização
                </button>
                <Modal isOpen={openModal}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-zinc-800 text-lg">
                      Selecione uma localização para a árvore
                    </h1>
                    <a
                      className="hover:text-red-500 hover:shadow-lg rounded-lg m-1"
                      onClick={() => {
                        setPosition(null);
                        setOpenModal(false);
                      }}
                    >
                      <X />
                    </a>
                  </div>

                  <Map position={position} setPosition={setPosition} />
                  <button
                    onClick={() => {
                      setOpenModal(false);
                    }}
                    className="m-4 p-2 bg-emerald-400 rounded-md shadow-md hover:bg-emerald-500"
                    type="button"
                  >
                    Selecionar
                  </button>
                </Modal>
                <Form.ErrorMessage field="localArvore" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="bioReprodutiva">
                  Biologia Reprodutiva
                </Form.Label>
                <Form.Input type="text" name="bioReprodutiva" />
                <Form.ErrorMessage field="bioReprodutiva" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="aspecEco">Aspectos ecológicos</Form.Label>
                <Form.Input type="text" name="aspecEco" />
                <Form.ErrorMessage field="aspecEco" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="regenNatural">
                  Regeneração natural
                </Form.Label>
                <Form.Input type="text" name="regenNatural" />
                <Form.ErrorMessage field="regenNatural" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="paisagismo">Paisagismo</Form.Label>
                <Form.Input type="text" name="paisagismo" />
                <Form.ErrorMessage field="paisagismo" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="imagem">Foto da Árvore</Form.Label>
                <Form.Input
                  className="block max-w-lg text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm 
                        file:bg-zinc-300 
                        hover:file:bg-green-300"
                  type="file"
                  name="imagem"
                  accept="image/*"
                />
                <Form.ErrorMessage field="imagem" />
              </Form.Field>
            </Form.Column>
            <Form.Column>
              <Form.Label className="text-md font-semibold">
                Aproveitamento
              </Form.Label>
              <Form.Field>
                <Form.Label htmlFor="alimentacao">Alimentação</Form.Label>
                <Form.Input type="text" name="alimentacao" />
                <Form.ErrorMessage field="alimentacao" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="bioTec">
                  Biotecnológico energético
                </Form.Label>
                <Form.Input type="text" name="bioTec" />
                <Form.ErrorMessage field="bioTec" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="bioAtividade">Bioatividade</Form.Label>
                <Form.Input type="text" name="bioAtividade" />
                <Form.ErrorMessage field="bioAtividade" />
              </Form.Field>

              <Form.Label className="text-md font-semibold my-4">
                Cultivo em viveiros
              </Form.Label>
              <Form.Field>
                <Form.Label htmlFor="colheita">
                  Colheita e beneficiamento de sementes
                </Form.Label>
                <Form.Input type="text" name="colheita" />
                <Form.ErrorMessage field="colheita" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="prodMudas">Produção de mudas</Form.Label>
                <Form.Input type="text" name="prodMudas" />
                <Form.ErrorMessage field="prodMudas" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="trasnplante">Transplante</Form.Label>
                <Form.Input type="text" name="trasnplante" />
                <Form.ErrorMessage field="trasnplante" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="cuidados">Cuidados especiais</Form.Label>
                <Form.Input type="text" name="cuidados" />
                <Form.ErrorMessage field="cuidados" />
              </Form.Field>
            </Form.Column>
          </div>
          {serviceError && (
            <span className="text-sm text-red-500 mt-1">
              Erro ao tentar cadastrar árvore!
            </span>
          )}
          <button
            type="submit"
            className="flex m-4 p-2 bg-emerald-400 rounded-md w-2/3 shadow-md hover:bg-emerald-500 justify-center self-center"
          >
            Salvar
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
