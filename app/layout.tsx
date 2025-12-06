// app/layout.tsx
// CE FICHIER EST STATIQUE ET GÈRE L'ENVELOPPE GLOBALE ET LES BOUTONS DE LANGUE.

import type { Metadata } from "next";
import LanguageButtons from "./components/language_buttons"; // Le composant est importé ici
import "./globals.css";

export const metadata: Metadata = {
  title: "Elodie Rougeaux-Léaux",
  description: "Portfolio de Elodie Rougeaux-Léaux",
};



export default function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen flex flex-col `}
      >
        <header>
          {/* Header statique avec les boutons de langue */}
          <div className=" p-4 fixed bg-fond w-full z-[100]">
            <h1 className="text-2xl ">Elodie Rougeaux-Léaux</h1>
            <div className ="fixed top-0 right-0 z-[1000]">
              <LanguageButtons /> {/* <-- Boutons de langue ici */}
            </div>
          </div>
        </header>
        <div className="flex-1 ">
          {children}
        </div>
        <footer>
          <div className=" w-full text-end">
            <p className="text-sm ">© 2024 Elodie Rougeaux-Léaud</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
