import { LatLng } from "leaflet";
import { useState } from "react";
import { ArvoreCommandFormData } from "../components/Form/arvore/ValidacaoCadastroArvore";
import { criarArvore, uploadFotoArvoreService } from "@/service/arvore";

export const useCadastroArvore = () => {
  const [position, setPosition] = useState<LatLng[] | null>(null);
  const [listaLugares, setListaLugares] = useState<
    { latitude: string; longitude: string }[]
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

  async function uploadFotoArvore(foto: Blob): Promise<number | false> {
    try {
      const fotoId = await uploadFotoArvoreService(foto);
      return fotoId;
    } catch (error) {
      setServiceError(true);
      return false;
    }
  }

  return {
    position,
    setPosition,
    serviceError,
    listaLugares,
    setListaLugares,
    cadastrarArvore,
    uploadFotoArvore,
  };
};
