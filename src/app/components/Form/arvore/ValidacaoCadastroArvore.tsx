import { z } from "zod";

const mimeTypePermitido = ["image/png", "image/jpeg"];

const BiologiaReprodutivaEnum = z.enum(["ANGIOSPERMA", "GYMNOSPERMA"]);
const TipoCuidadoEnum = z.enum(["PODA", "IRRIGACAO", "ADUBACAO"]);

const FotoArvoreCommandSchema = z.object({
  id: z.number().nullable(),
  fotoId: z.number(),
  descricao: z.string().nullable(),
});

const OcorrenciaNaturalCommandSchema = z.object({
  id: z.number().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
});

const BiotecnologiaCommandSchema = z.object({
  id: z.number().nullable(),
  composicao: z.string().nullable(),
  potenciaBioprodutos: z.string().nullable(),
});

const AlimentacaoCommandSchema = z.object({
  id: z.number().nullable(),
  dadosNutricionais: z.string().nullable(),
  formasConsumo: z.string().nullable(),
});

const BioatividadeCommandSchema = z.object({
  id: z.number().nullable(),
  descricao: z.string().nullable(),
});

const BiologiaReprodutivaCommandSchema = z.object({
  id: z.number().nullable(),
  tipo: BiologiaReprodutivaEnum,
  descricao: z.string().nullable(),
});

const CuidadosEspeciaisCommandSchema = z.object({
  id: z.number().nullable(),
  descricao: z.string().nullable(),
  tipoCuidado: TipoCuidadoEnum,
});

const CultivoCommandSchema = z.object({
  id: z.number().nullable(),
  descricao: z.string().nullable(),
  cuidadosEspeciaisCommand: z.array(CuidadosEspeciaisCommandSchema).nullable(),
});

const PaisagismoFotoCommandSchema = z.object({
  id: z.number().nullable(),
  fotoId: z.number(),
});

const PaisagismoCommandSchema = z.object({
  id: z.number().nullable(),
  descricao: z.string().nullable(),
  paisagismoFotoCommand: PaisagismoFotoCommandSchema.nullable(),
});

const AproveitamentoCommandSchema = z.object({
  id: z.number().nullable(),
  descricao: z.string().nullable(),
  biotecnologiaCommand: BiotecnologiaCommandSchema.nullable(),
  alimentacaoCommand: AlimentacaoCommandSchema.nullable(),
  bioatividadeCommand: BioatividadeCommandSchema.nullable(),
});

export const ArvoreCommandSchema = z.object({
  id: z.number().nullable(),
  nome: z.string().nullable(),
  descricaoBotanica: z.string().nullable(),
  aspectosEcologicos: z.string().nullable(),
  regeneracaoNatural: z.string().nullable(),
  biologiaReprodutivaCommand: BiologiaReprodutivaCommandSchema.nullable(),
  ocorrenciaNaturalCommand: z.array(OcorrenciaNaturalCommandSchema).nullable(),
  fotoArvoreCommand: z.array(FotoArvoreCommandSchema).nullable(),
  cultivoCommand: CultivoCommandSchema.nullable(),
  paisagismoCommand: PaisagismoCommandSchema.nullable(),
});

export type ArvoreCommandFormData = z.infer<typeof ArvoreCommandSchema>;
