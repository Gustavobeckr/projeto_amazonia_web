"use client";
import { TreeDeciduous, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [isSelect, setIsSelect] = useState(false);
  if (pathname == "/") {
    return <></>;
  }
  return (
    <nav className="bg-green-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center ">
            <div className="flex-shrink-0">
              <a href="/" className="text-green-50 hover:text-green-400 ">
                <TreeDeciduous />
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <a
                href="/home"
                className="text-green-50 hover:bg-white hover:text-black p-2 rounded-lg"
              >
                Home
              </a>
              <a
                href="/cadastro/arvore"
                className="text-green-50 hover:bg-white hover:text-black p-2 rounded-lg"
              >
                Cadastrar
              </a>
              <a
                href="/sobre"
                className="text-green-50 hover:bg-white hover:text-black p-2 rounded-lg"
              >
                Sobre
              </a>
              <a
                href="/ajuda"
                className="text-green-50 hover:bg-white hover:text-black p-2 rounded-lg"
              >
                Ajuda
              </a>
            </div>
          </div>
          <div className="md:hidden flex items:center">
            <button
              className="inline-flex items-center justifycenter p-2 rounded text-white
            hover:text-black "
              onClick={() => setIsSelect(!isSelect)}
            >
              {isSelect ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {isSelect && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/home"
              className="text-green-50 block hover:bg-white hover:text-black p-2 rounded-lg"
            >
              Home
            </a>
            <a
              href="/cadastro/arvore"
              className="text-green-50 block hover:bg-white hover:text-black p-2 rounded-lg"
            >
              Cadastrar
            </a>
            <a
              href="/sobre"
              className="text-green-50 block hover:bg-white hover:text-black p-2 rounded-lg"
            >
              Sobre
            </a>
            <a
              href="/ajuda"
              className="text-green-50 block hover:bg-white hover:text-black p-2 rounded-lg"
            >
              Ajuda
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
