import { TreeDeciduous } from "lucide-react";

export default function Home() {
  const list = [
    { id: 1, title: "Arvore 1" },
    { id: 2, title: "Arvore 2" },
    { id: 3, title: "Arvore 3" },
    { id: 4, title: "Arvore 4" },
    { id: 5, title: "Arvore 5" },
  ];

  return (
    <>
      <div className="bg-zinc-100 m-2 max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 rounded-lg h-screen shadow-xl">
        <div className="flex p-2">
          <h1 className="text-black text-2xl">Árvores Cadastradas</h1>
        </div>
        <div className="flex gap-2 flex-col ">
          {list.map((item) => {
            return (
              <a
                key={item.id}
                href={`/detalhes/` + item.id}
                className="flex p-1 h-20 my-1 bg-green-700 rounded-lg items-center space-x-2  hover:bg-green-800 hover:font-bold shadow-md"
              >
                <TreeDeciduous className="text-white" />
                <h1 className="text-white text-lg">{item.title}</h1>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
