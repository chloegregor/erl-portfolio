import { getTraductionBySlugAndLocale } from "@/app/actions/traductions";
import Work from "@/app/components/work";
import { notFound } from "next/navigation";

export default async function SlugPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;

  console.log("SLUG PAGE PARAMS, ca c'est la page dans [lang][slug] avec le not found si pas de trad", { lang, slug });

  const trad = await getTraductionBySlugAndLocale(slug, lang);

  if (!trad){
    notFound();}


  return (
    <div className="mt-50">
      <Work trad={trad} />
    </div>
  )
  ;
}
