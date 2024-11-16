import { z } from "zod";

const mimeTypePermitido = ["image/png", "image/jpeg"];

const FotoArvoreCommandSchema = z.object({
  fotoId: z
    .custom<FileList>()
    .transform((list) => list.item(0))
    .refine(
      (file) => mimeTypePermitido.includes(file!.type),
      "São permitidas apenas imagens do tipo png e jpeg!"
    )
    .nullable(),
  descricao: z.string().nullable(),
});

const OcorrenciaNaturalCommandSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});

export const ArvoreCommandSchema = z.object({
  nome: z.string(),
  descricaoBotanica: z.string(),
  aspectosEcologicos: z.string(),
  regeneracaoNatural: z.string(),
  biologiaReprodutivaTipo: z.string(),
  biologiaReprodutivaDescr: z.string(),
  //ocorrenciaNaturalCommand: z.array(OcorrenciaNaturalCommandSchema).nullable(),
  fotoArvoreCommand: z.array(FotoArvoreCommandSchema).nullable(),
  cultivoDescr: z.string(),
  cultivoCuidadosAgua: z.string(),
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
