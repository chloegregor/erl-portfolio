
import {getTraductionsByLocale} from "@/app/actions/traductions";
import Tags from "../components/tags";

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {

  const result = await params;
  const locale = result.lang;

  // Logique de récupération de données dépendante de la langue :
  const traductions = await getTraductionsByLocale(locale);
  const alltags = traductions.map((work) => work.type);
  const tags = Array.from(new Set(alltags));

  return (
    <>
      <nav className=" ">
        <Tags tags={tags} locale={locale} />
      </nav>
      {children}

    </>
  );
}
