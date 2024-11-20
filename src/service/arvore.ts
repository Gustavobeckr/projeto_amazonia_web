import { ArvoreCommandFormData } from "@/app/components/Form/arvore/ValidacaoCadastroArvore";
import { axiosRequest } from "@/lib/axios";
import {
  ArvoreCommand,
  BiologiaReprodutivaEnum,
  TipoCuidadoEnum,
} from "@/types/arvore";
import { parseCookies } from "nookies";

export async function criarArvore(
  data: ArvoreCommandFormData,
  listaLugares: { latitude: string; longitude: string }[]
) {
  try {
    const { AMAZONDEX_TOKEN: token } = parseCookies();
    const response = await axiosRequest.post(
      "/arvore",
      montarBodyCriarArvore(data, listaLugares),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao cadastrar árvore: " + error);
  }
}

function montarBodyCriarArvore(
  data: ArvoreCommandFormData,
  listaLugares: { latitude: string; longitude: string }[]
): ArvoreCommand {
  return {
    nome: data.nome,
    descricaoBotanica: data.descricaoBotanica,
    aspectosEcologicos: data.aspectosEcologicos,
    regeneracaoNatural: data.regeneracaoNatural,
    biologiaReprodutivaCommand: {
      tipo: data.biologiaReprodutivaTipo as BiologiaReprodutivaEnum,
      descricao: data.biologiaReprodutivaDescr,
    },
    ocorrenciaNaturalCommand: listaLugares,
    fotoArvoreCommand: data.fotoArvoreCommand,
    cultivoCommand: {
      descricao: data.cultivoDescr,
      cuidadosEspeciaisCommand: [
        {
          descricao: data.cultivoCuidadosAgua,
          tipoCuidado: TipoCuidadoEnum.AGUA,
        },
        {
          descricao: data.cultivoCuidadosSolo,
          tipoCuidado: TipoCuidadoEnum.SOLO,
        },
      ],
    },
    paisagismoCommand: {
      descricao: data.paisagismoDescr,
    },
  };
}

export async function uploadFotoArvoreService(foto: Blob): Promise<number> {
  try {
    const { AMAZONDEX_TOKEN: token } = parseCookies();

    const formData = new FormData();
    formData.append("file", foto);
    const response = await axiosRequest.post("arquivo/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Erro ao fazer upload: " + error);
  }
}