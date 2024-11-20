import { z } from "zod";

const mimeTypePermitido = ["image/png", "image/jpeg"];

const FotoArvoreCommandSchema = z.object({
  fotoId: z.number().nullable(),
  descricao: z.string(),
});

const OcorrenciaNaturalCommandSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});

export const ArvoreCommandSchema = z.object({
  nome: z.string().min(1, "Nome da árvore é obrigatório."),
  descricaoBotanica: z.string({
    required_error: "Descrição para a árvore é obrigatório.",
  }),
  aspectosEcologicos: z.string(),
  regeneracaoNatural: z.string(),
  biologiaReprodutivaTipo: z
    .string()
    .toUpperCase()
    .transform((value) =>
      value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    ),
  biologiaReprodutivaDescr: z.string(),
  ocorrenciaNaturalCommand: z.array(OcorrenciaNaturalCommandSchema, {
    required_error:
      "Deve ser selecionado no mínimo um lugar para ocorrência natural.",
  }),
  fotoArvoreCommand: z.array(FotoArvoreCommandSchema).nullable(),
  cultivoDescr: z.string(),
  cultivoCuidadosAgua: z.string().toUpperCase(),
  cultivoCuidadosSolo: z.string(),
  paisagismoDescr: z.string(),
  aproveitamentoDescr: z.string(),
  aproveitamentoBioTecComposicao: z.string(),
  aproveitamentoBioTecBioProdutos: z.string(),
  aproveitamentoAlimentacaoDadosNutricionas: z.string(),
  aproveitamentoAlimentacaoFormaConsumo: z.string(),
  aproveitamentoBioAtividadeDescr: z.string(),
});

export type ArvoreCommandFormData = z.infer<typeof ArvoreCommandSchema>;
