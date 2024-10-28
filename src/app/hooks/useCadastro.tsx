import { LatLng } from "leaflet";
import { useState } from "react";
import { CadastroFormData } from "../components/Form/validator/zod";

export const useCadastroArvore = () => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [serviceError, setServiceError] = useState(null);

  async function cadastrarArvore(data: CadastroFormData): Promise<boolean> {
    console.log(position);
    return true;
  }

  return {
    position,
    setPosition,
    serviceError,
    cadastrarArvore,
  };
};
