export type ArvoreCommand = {
  id: number;
  nome: string;
  descricaoBotanica: string;
  aspectosEcologicos: string;
  regeneracaoNatural: string;
  biologiaReprodutivaCommand: BiologiaReprodutivaCommand;
  ocorrenciaNaturalCommand: OcorrenciaNaturalCommand[];
  fotoArvoreCommand: FotoArvoreCommand[];
  cultivoCommand: CultivoCommand;
  paisagismoCommand: PaisagismoCommand;
};

export type AproveitamentoCommand = ComboCommand & {
  biotecnologiaCommand: BiotecnologiaCommand;
  alimentacaoCommand: AlimentacaoCommand;
  bioatividadeCommand: BioatividadeCommand;
};

export type AlimentacaoCommand = {
  id: number;
  dadosNutricionais: string;
  formasConsumo: string;
};

export type BioatividadeCommand = ComboCommand;

export type BiologiaReprodutivaCommand = {
  id: number;
  tipo: BiologiaReprodutivaEnum;
  descricao: string;
};

export type BiotecnologiaCommand = {
  id: number;
  composicao: string;
  potenciaBioprodutos: string;
};

export type ComboCommand = {
  id: number;
  descricao: string;
};

export type CuidadosEspeciaisCommand = ComboCommand & {
  tipoCuidado: TipoCuidadoEnum;
};

export type CultivoCommand = ComboCommand & {
  cuidadosEspeciaisCommand: CuidadosEspeciaisCommand[];
};

export type FotoArvoreCommand = {
  id: number;
  fotoId: number;
  descricao: string;
};

export type OcorrenciaNaturalCommand = {
  id: number;
  latitude: string;
  longitude: string;
};

export type PaisagismoCommand = ComboCommand & {
  paisagismoFotoCommand: PaisagismoFotoCommand;
};

export type PaisagismoFotoCommand = {
  id: number;
  fotoId: number;
};

export enum BiologiaReprodutivaEnum {
  FRUTIFICACAO = "Frutificação",
  DISPERCAO = "Disperção",
}

export enum TipoCuidadoEnum {
  AGUA = "Água",
  SOLO = "Solo",
}
