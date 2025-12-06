// app/layout.tsx
// CE FICHIER EST STATIQUE ET GÈRE L'ENVELOPPE GLOBALE ET LES BOUTONS DE LANGUE.

import type { Metadata } from "next";
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
