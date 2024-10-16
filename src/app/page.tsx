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
      <div className="bg-white m-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-lg h-screen">
        <div className="flex p-2">
          <h1 className="text-black text-xl">Árvores Cadastradas</h1>
        </div>
        <div className="flex p-2 flex-col ">
          {list.map((item) => {
            return (
              <a
                key={item.id}
                href="/detalhes"
                className="flex p-1 h-20 my-1 bg-green-50 rounded-lg items-center space-x-2  hover:bg-green-100 hover:font-bold"
              >
                <TreeDeciduous />
                <h1 className="text-black text-sm">{item.title}</h1>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
