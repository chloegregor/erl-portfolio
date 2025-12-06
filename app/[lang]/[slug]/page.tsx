import { getTraductionBySlugAndLocale } from "@/app/actions/traductions";
import Work from "@/app/components/work";
import { notFound } from "next/navigation";

export default async function SlugPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;

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
