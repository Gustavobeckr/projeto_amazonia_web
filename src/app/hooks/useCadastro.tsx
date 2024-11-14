import { LatLng } from "leaflet";
import { useState } from "react";
import { ArvoreCommandFormData } from "../components/Form/arvore/ValidacaoCadastroArvore";

export const useCadastroArvore = () => {
  const [position, setPosition] = useState<LatLng[] | null>(null);
  const [listaLugares, setListaLugares] = useState<LatLng[]>([]);
  const [serviceError] = useState(null);

  async function cadastrarArvore(
    data: ArvoreCommandFormData
  ): Promise<boolean> {
    console.log(listaLugares);
    return true;
  }

  return {
    position,
    setPosition,
    serviceError,
    setListaLugares,
    listaLugares,
    cadastrarArvore,
  };
};
