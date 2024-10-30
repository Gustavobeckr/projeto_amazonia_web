"use server";
import { axiosRequest } from "@/lib/axios";
import { redirect, RedirectType } from "next/navigation";
import { NextResponse } from "next/server";

export async function loginRequest(
  login: string,
  senha: string
): Promise<dataRespostaLoginDTO> {
  try {
    const { cookies } = await import("next/headers");
    const cookiesData = cookies();
    const response: RespostaLoginDTO = await axiosRequest.post("auth", {
      login,
      senha,
    });
    cookiesData.set("AMAZONDEX_TOKEN", response.data.token);
    return response.data;
  } catch (e) {
    throw new Error("Erro ao realizar login: ");
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
