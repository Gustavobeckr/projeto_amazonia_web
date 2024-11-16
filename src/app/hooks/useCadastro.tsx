import { LatLng } from "leaflet";
import { useState } from "react";
import { ArvoreCommandFormData } from "../components/Form/arvore/ValidacaoCadastroArvore";
import { criarArvore } from "@/service/arvore";

export const useCadastroArvore = () => {
  const [position, setPosition] = useState<LatLng[] | null>(null);
  const [listaLugares, setListaLugares] = useState<
    { lat: string; lng: string }[]
  >([]);
  const [serviceError, setServiceError] = useState<boolean>(false);

  async function cadastrarArvore(
    data: ArvoreCommandFormData
  ): Promise<boolean> {
    try {
      await criarArvore(data, listaLugares);
      return true;
    } catch (error) {
      setServiceError(true);
      return false;
    }
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
