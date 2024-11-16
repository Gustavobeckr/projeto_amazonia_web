import { ArvoreCommandFormData } from "@/app/components/Form/arvore/ValidacaoCadastroArvore";

export async function criarArvore(
  data: ArvoreCommandFormData,
  listaLugares: { lat: string; lng: string }[]
) {}

function montarBodyCriarArvore(
  data: ArvoreCommandFormData,
  listaLugares: { lat: string; lng: string }[]
) {
  return {
    nome: data.nome,
    descricaoBotanica: data.descricaoBotanica,
    aspectosEcologicos: data.aspectosEcologicos,
    regeneracaoNatural: data.regeneracaoNatural,
    biologiaReprodutivaCommand: {
      tipo: data.biologiaReprodutivaTipo,
      descricao: data.biologiaReprodutivaDescr,
    },
    ocorrenciaNaturalCommand: listaLugares,
    fotoArvoreCommand: data.fotoArvoreCommand,
    cultivoCommand: {
      descricao: data.cultivoDescr,
      cuidadosEspeciaisCommand: [
        {
          descricao: data.cultivoCuidadosAgua,
          tipoCuidado: "AGUA",
        },
        {
          descricao: data.cultivoCuidadosSolo,
          tipoCuidado: "SOLO",
        },
      ],
    },
    paisagismoCommand: {
      descricao: data.paisagismoDescr,
    },
  };
}
