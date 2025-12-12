
import {getTraductionsByLocale} from "@/lib/db";
import {getProfile} from "@/lib/db";
import Tags from "../components/tags";
import LanguageButtons from "@/app/components/language_buttons";
import {AboutPage} from "@/app/components/about";


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

  const profile =  await getProfile();

  return (
    <>
      <header>
      <div className ="fixed top-0 right-0 z-[1000]">
        <LanguageButtons currentLanguage={locale} />
      </div>
    <div className=" p-4 fixed bg-fond w-full z-[100]">
      <h1 className="lg:text-3xl text-[1.3em] ">Élodie Rougeaux-Léaux</h1>
    </div>
    </header>
      <nav className="flex flex-wrap  items-center lg:h-[150px] pl-4 pr-4 pt-[4em] w-full fixed bg-fond z-50 justify-between">
          <span>
            <Tags tags={tags} locale={locale} />
          </span>
        {profile && (
        <span>
          <AboutPage cv={profile.cv } portfolio={profile.portfolio} email={profile.email} tel={profile.telephone}/>
        </span>
          )}
      </nav>
      <div className=" w-full mb-[100px]">
        {children}
      </div>

    </>
  );
}
