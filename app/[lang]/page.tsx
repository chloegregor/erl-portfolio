import CardFilter from "@/app/components/card_filter";
import {getTraductionsByLocale} from "@/app/actions/traductions";

export default async function Home({params, searchParams}: {params: Promise<{ lang: string }>,
  searchParams: Promise<{ [key: string]: string | undefined }>}) {

  const searchprms = await searchParams;
  const tag = searchprms.tag || "";

  const result = await params;
  const locale = result.lang;

  const traductions = await getTraductionsByLocale(locale);
  const filtered_traductions = tag ? traductions.filter((trad) => trad.type === tag) : traductions;

  const alltags = traductions.map((work) => work.type);
  const tags = Array.from(new Set(alltags));


  return (
    <>
    <CardFilter traductions={traductions} filtered_traductions={filtered_traductions} />
    </>

  );
}
