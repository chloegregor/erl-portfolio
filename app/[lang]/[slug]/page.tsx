import { getTraductionBySlugAndLocale } from "@/lib/db";
import Work from "@/app/components/work";
import { notFound } from "next/navigation";

export default async function SlugPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  
  const { lang, slug } = await params;

  const trad = await getTraductionBySlugAndLocale(slug, lang);


  if (!trad){
    notFound();}


  return (
    <div className=" w-full mt-[180px]">
      <Work trad={trad} />
    </div>
  )
  ;
}
