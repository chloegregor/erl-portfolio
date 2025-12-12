// app/layout.tsx
// CE FICHIER EST STATIQUE ET GÈRE L'ENVELOPPE GLOBALE ET LES BOUTONS DE LANGUE.
import LocalFont from 'next/font/local';
import type { Metadata } from "next";
import "./globals.css";

export const enbyGertrude = LocalFont({
  src: "../public/fonts/Enby_Gertrude_roman.woff2",
});

export const metadata: Metadata = {
  title: "Élodie Rougeaux-Léaux",
  description: "Portfolio de Élodie Rougeaux-Léaux",
};



export default function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen flex flex-col ${enbyGertrude.className} `}
      >
        <div className="flex-1 ">
          {children}
        </div>
        <footer>
          <div className=" w-full text-end">
            <p className="text-sm "></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
