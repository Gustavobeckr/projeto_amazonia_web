"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import { useEffect, useState } from "react";
import { Trash, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useCadastroArvore } from "../../hooks/useCadastro";
import {
  ArvoreCommandFormData,
  ArvoreCommandSchema,
} from "../../components/Form/arvore/ValidacaoCadastroArvore";
import { Form } from "../../components/Form";
import { parseCookies } from "nookies";
import { redirect, RedirectType, useRouter } from "next/navigation";
import { Alert, CircularProgress } from "@mui/material";

const RichTextEditor = dynamic(
  () => import("@/app/components/Form/RichTextEditor/RichTextEditor"),
  { ssr: false }
);
const Map = dynamic(() => import("../../components/Map"), { ssr: false });

export default function CadastroArvore() {
  const router = useRouter();

  useEffect(() => {
    const { AMAZONDEX_TOKEN: token } = parseCookies();
    if (!token) {
      redirect("/", RedirectType.replace);
    }
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const [isLoadind, setIsLoading] = useState(false);
  const {
    cadastrarArvore,
    serviceError,
    listaLugares,
    setListaLugares,
    uploadFotoArvore,
  } = useCadastroArvore();

  const createArvoreForm = useForm<ArvoreCommandFormData>({
    resolver: zodResolver(ArvoreCommandSchema),
  });

  const { handleSubmit, control, setValue } = createArvoreForm;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fotoArvoreCommand",
  });

  const uploadFoto = async (index: number, foto: Blob) => {
    const fotoID = await uploadFotoArvore(foto);
    if (fotoID) {
      setValue(`fotoArvoreCommand.${index}.fotoId`, fotoID);
    }
  };

  const onSubmit = async (data: ArvoreCommandFormData) => {
    setIsLoading(true);
    const response = await cadastrarArvore(data);
    setIsLoading(false);
    if (response) {
      router.replace("/home");
    }
  };

  function addNovaFoto() {
    append({ descricao: "", fotoId: null });
  }

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
                <Form.Label htmlFor="nome">Nome da árvore</Form.Label>
                <Form.Input type="text" name="nome" />
                <Form.ErrorMessage field="nome" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="descricaoBotanica">
                  Descrição botânica
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue("descricaoBotanica", richText);
                  }}
                />
                <Form.ErrorMessage field="descricaoBotanica" />
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
                        setOpenModal(false);
                        setListaLugares([]);
                      }}
                    >
                      <X />
                    </a>
                  </div>

                  <Map
                    listaLugares={listaLugares}
                    setListaLugares={setListaLugares}
                  />
                  <button
                    onClick={() => {
                      setOpenModal(false);
                      setValue("ocorrenciaNaturalCommand", listaLugares);
                    }}
                    className="m-4 p-2 bg-emerald-400 rounded-md shadow-md hover:bg-emerald-500"
                    type="button"
                  >
                    Selecionar
                  </button>
                </Modal>
                <Form.ErrorMessage field="ocorrenciaNaturalCommand" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="biologiaReprodutivaTipo">
                  Tipo Biologia Reprodutiva
                </Form.Label>
                <Form.SelectInput
                  name="biologiaReprodutivaTipo"
                  enum={["Frutificação", "Dispersão"]}
                />
                <Form.ErrorMessage field="biologiaReprodutivaTipo" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="biologiaReprodutivaDescr">
                  Descrição Biologia Reprodutiva
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue("biologiaReprodutivaDescr", richText);
                  }}
                />

                <Form.ErrorMessage field="biologiaReprodutivaDescr" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="aspectosEcologicos">
                  Aspectos ecológicos
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue("aspectosEcologicos", richText);
                  }}
                />

                <Form.ErrorMessage field="aspectosEcologicos" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="regeneracaoNatural">
                  Regeneração natural
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue("regeneracaoNatural", richText);
                  }}
                />

                <Form.ErrorMessage field="regeneracaoNatural" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="paisagismoDescr">
                  Descrição Paisagismo
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue("paisagismoDescr", richText);
                  }}
                />

                <Form.ErrorMessage field="paisagismoDescr" />
              </Form.Field>
              <Form.Field>
                <Form.Label
                  htmlFor="fotoArvoreCommand"
                  className="flex flex-row justify-between items-center"
                >
                  Fotos da Árvore
                  <button
                    type="button"
                    className="bg-zinc-300 hover:bg-green-300 p-2 rounded-md"
                    onClick={addNovaFoto}
                  >
                    Adicionar foto
                  </button>
                </Form.Label>
                {fields.map((field, index) => {
                  return (
                    <Form.Field key={field.id}>
                      <Form.Label htmlFor="fotoArvoreCommand.descricao">
                        Descrição da foto
                      </Form.Label>
                      <Form.Input
                        type="text"
                        name={`fotoArvoreCommand.${index}.descricao`}
                        accept="image/*"
                      />
                      <div className="flex flex-row items-center">
                        <input
                          onChange={(e) =>
                            uploadFoto(index, e.target.files![0])
                          }
                          className="rounded-lg shadow-sm p-1 block w-full text-xs text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm
                          file:bg-zinc-300 
                          hover:file:bg-green-300"
                          type="file"
                          accept="image/*"
                        />
                        <a
                          onClick={() => remove(index)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <Trash />
                        </a>
                      </div>
                    </Form.Field>
                  );
                })}
                <Form.ErrorMessage field="fotoArvoreCommand" />
              </Form.Field>
            </Form.Column>
            <Form.Column>
              <Form.Label className="text-md font-semibold">
                Aproveitamento
              </Form.Label>
              <Form.Field>
                <Form.Label htmlFor="aproveitamentoDescr">
                  Alimentação
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue("aproveitamentoDescr", richText);
                  }}
                />

                <Form.ErrorMessage field="aproveitamentoDescr" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="aproveitamentoBioTecComposicao">
                  Composição Biotecnológica
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue("aproveitamentoBioTecComposicao", richText);
                  }}
                />

                <Form.ErrorMessage field="aproveitamentoBioTecComposicao" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="aproveitamentoBioTecBioProdutos">
                  Potência Bioprodutos Biotecnológicos
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue("aproveitamentoBioTecBioProdutos", richText);
                  }}
                />

                <Form.ErrorMessage field="aproveitamentoBioTecBioProdutos" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="aproveitamentoBioAtividadeDescr">
                  Bioatividade
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue("aproveitamentoBioAtividadeDescr", richText);
                  }}
                />

                <Form.ErrorMessage field="aproveitamentoBioAtividadeDescr" />
              </Form.Field>
              <Form.Label className="text-md font-semibold my-4">
                Cultivo em viveiros
              </Form.Label>
              <Form.Field>
                <Form.Label htmlFor="cultivoDescr">
                  Descrição Cultivo
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue("cultivoDescr", richText);
                  }}
                />

                <Form.ErrorMessage field="cultivoDescr" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="cultivoCuidadosAgua">
                  Cuidados Especiais com a água
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue("cultivoCuidadosAgua", richText);
                  }}
                />

                <Form.ErrorMessage field="cultivoCuidadosAgua" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="cultivoCuidadosSolo">
                  Cuidados Especiais com o solo
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue("cultivoCuidadosSolo", richText);
                  }}
                />

                <Form.ErrorMessage field="cultivoCuidadosSolo" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="aproveitamentoAlimentacaoDadosNutricionas">
                  Dados Nutricionais
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue(
                      "aproveitamentoAlimentacaoDadosNutricionas",
                      richText
                    );
                  }}
                />

                <Form.ErrorMessage field="aproveitamentoAlimentacaoDadosNutricionas" />
              </Form.Field>
              <Form.Field>
                <Form.Label htmlFor="aproveitamentoAlimentacaoFormaConsumo">
                  Formas de consumo
                </Form.Label>
                <RichTextEditor
                  textContent={""}
                  onChange={function (richText: string): void {
                    setValue("aproveitamentoAlimentacaoFormaConsumo", richText);
                  }}
                />

                <Form.ErrorMessage field="aproveitamentoAlimentacaoFormaConsumo" />
              </Form.Field>
            </Form.Column>
          </div>
          {serviceError && (
            <span className="text-4x1 text-red-500 m-2 text-center">
              Erro ao tentar cadastrar árvore!
            </span>
          )}

          <button
            type="submit"
            className="flex m-2 p-2 bg-emerald-400 rounded-md w-2/3 shadow-md hover:bg-emerald-500 justify-center self-center"
          >
            {isLoadind ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Salvar"
            )}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
