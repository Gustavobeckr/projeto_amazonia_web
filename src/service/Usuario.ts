"use server";
import { axiosRequest } from "@/lib/axios";
import { redirect, RedirectType } from "next/navigation";

export async function loginRequest(
  login: string,
  senha: string
): Promise<dataRespostaLoginDTO> {
  try {
    const response = await axiosRequest.post("auth", {
      login,
      senha,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao realizar login: " + error);
  }
}

export async function cadastrar() {}

export async function logout() {
  const { cookies } = await import("next/headers");
  const cookiesData = cookies();
  cookiesData.delete("AMAZONDEX_TOKEN");
  redirect("/", RedirectType.replace);
}

export type RespostaLoginDTO = {
  timestamp: string;
  status: number;
  error: string;
  path: string;
  data: dataRespostaLoginDTO;
};
export type dataRespostaLoginDTO = {
  id: number;
  login: string;
  role: string;
  token: string;
};
