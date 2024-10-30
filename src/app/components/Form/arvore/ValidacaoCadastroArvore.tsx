import { LatLng } from "leaflet";
import { z } from "zod";

const mimeTypePermitido = ["image/png", "image/jpeg"];

export const cadastroFormSchema = z.object({
  nomeArvore: z.string().min(3, "Nome da árvore é obrigatório!"),
  descrBotanica: z.string().min(3, "Descrição da botânica é obrigatório!"),
  bioReprodutiva: z.string(),
  aspecEco: z.string(),
  regenNatural: z.string(),
  alimentacao: z.string(),
  bioTec: z.string(),
  bioAtividade: z.string(),
  paisagismo: z.string(),
  colheita: z.string(),
  prodMudas: z.string(),
  trasnplante: z.string(),
  cuidados: z.string(),
  localArvore: z
    .custom<LatLng>()
    .refine(
      (value) => value == null,
      "Selecione uma local de ocorrêcia natural para a árvore!"
    ),
  imagem: z
    .custom<FileList>()
    .transform((list) => list.item(0))
    .refine(
      (file) => mimeTypePermitido.includes(file!.type),
      "São permitidas apenas imagens do tipo png e jpeg!"
    ),
});

export type CadastroFormData = z.infer<typeof cadastroFormSchema>;
