import prisma  from "@/lib/prisma";
import CardFilter from "@/app/components/card_filter";


export default async function Home() {
  const works = await prisma.work.findMany({include: {photos: true}});
  const alltags = works.map((work) => work.type);
  const tags = Array.from(new Set(alltags));



  return (
    <CardFilter works={works} tags={tags} />

  );
}
