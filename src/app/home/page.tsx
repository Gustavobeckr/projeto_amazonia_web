"use client";
import buscarTodasArvores from "@/service/arvore";
import { TreeDeciduous } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function Home() {
  const [listaArvore, setListaArvore] = useState<
    { nome: string; id: string }[]
  >([]);

  useEffect(() => {
    const { AMAZONDEX_TOKEN: token } = parseCookies();
    if (!token) {
      redirect("/", RedirectType.replace);
    }
    buscarArvores();
  }, []);

  async function buscarArvores() {
    const response = await buscarTodasArvores();
    if (response) {
      setListaArvore(response);
    }
  }

  return (
    <>
      <div className="bg-zinc-100 m-2 max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 rounded-lg h-screen shadow-xl">
        <div className="flex p-2">
          <h1 className="text-black text-2xl">Árvores Cadastradas</h1>
        </div>
        <div className="flex gap-2 flex-col ">
          {listaArvore!.map(({ nome, id }, index) => {
            return (
              <a
                key={index}
                href={`/detalhes/` + id}
                className="flex p-1 h-20 my-1 bg-green-700 rounded-lg items-center space-x-2  hover:bg-green-800 hover:font-bold shadow-md"
              >
                <TreeDeciduous className="text-white" />
                <h1 className="text-white text-lg">{nome}</h1>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
