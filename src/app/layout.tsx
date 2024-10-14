import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navBar";

export const metadata: Metadata = {
  title: "Projeto Amazônia",
  description: "Cadastre árvores da amazônia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="bg-green-50 text-zinc-50">{children}</main>
      </body>
    </html>
  );
}
