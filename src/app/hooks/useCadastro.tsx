import { LatLng } from "leaflet";
import { useState } from "react";
import { CadastroFormData } from "../components/Form/arvore/ValidacaoCadastroArvore";

export const useCadastroArvore = () => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [serviceError] = useState(null);

  async function cadastrarArvore(data: CadastroFormData): Promise<boolean> {
    console.log(data);
    return true;
  }

  return {
    position,
    setPosition,
    serviceError,
    cadastrarArvore,
  };
};
