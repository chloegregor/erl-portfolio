
import {getTraductionsByLocale} from "@/app/actions/traductions";
import Tags from "../components/tags";
import LanguageButtons from "@/app/components/language_buttons";

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {

  const result = await params;
  const locale = result.lang;

  const traductions = await getTraductionsByLocale(locale);
  const alltags = traductions.map((work) => work.type);
  const tags = Array.from(new Set(alltags));

  return (
    <>
      <header>
    <div className=" p-4 fixed bg-fond w-full z-[100]">
      <h1 className="text-2xl ">Elodie Rougeaux-Léaux</h1>
      <div className ="fixed top-0 right-0 z-[1000]">
        <LanguageButtons />
      </div>
    </div>
    </header>
      <nav className=" ">
        <Tags tags={tags} locale={locale} />
      </nav>
      <div className=" mt-24 mb-[300px]">
        {children}
      </div>

    </>
  );
}
