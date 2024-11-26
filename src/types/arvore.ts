export type ArvoreCommand = {
  id?: number;
  nome: string;
  descricaoBotanica: string;
  aspectosEcologicos: string;
  regeneracaoNatural: string;
  biologiaReprodutivaCommand: BiologiaReprodutivaCommand;
  ocorrenciaNaturalCommand: OcorrenciaNaturalCommand[];
  fotoArvoreCommand: FotoArvoreCommand[] | null;
  cultivoCommand: CultivoCommand;
  paisagismoCommand: PaisagismoCommand;
  aproveitamentoCommand: AproveitamentoCommand;
};

export type AproveitamentoCommand = ComboCommand & {
  biotecnologiaCommand: BiotecnologiaCommand;
  alimentacaoCommand: AlimentacaoCommand;
  bioatividadeCommand: BioatividadeCommand;
};

export type AlimentacaoCommand = {
  id?: number;
  dadosNutricionais: string;
  formasConsumo: string;
};

export type BioatividadeCommand = ComboCommand;

export type BiologiaReprodutivaCommand = {
  id?: number;
  tipo: string;
  descricao: string;
};

export type BiotecnologiaCommand = {
  id?: number;
  composicao: string;
  potenciaBioprodutos: string;
};

export type ComboCommand = {
  id?: number;
  descricao: string;
};

export type CuidadosEspeciaisCommand = ComboCommand & {
  tipoCuidado: TipoCuidadoEnum;
};

export type CultivoCommand = ComboCommand & {
  cuidadosEspeciaisCommand: CuidadosEspeciaisCommand[];
};

export type FotoArvoreCommand = {
  id?: number;
  fotoId: number | null;
  descricao: string;
};

export type OcorrenciaNaturalCommand = {
  id?: number;
  latitude: string;
  longitude: string;
};

export type PaisagismoCommand = ComboCommand;

export type PaisagismoFotoCommand = {
  id?: number;
  fotoId?: number;
};

export enum BiologiaReprodutivaEnum {
  FRUTIFICACAO = "Frutificação",
  DISPERSAO = "Dispersão",
}

export enum TipoCuidadoEnum {
  AGUA = "AGUA",
  SOLO = "SOLO",
}
