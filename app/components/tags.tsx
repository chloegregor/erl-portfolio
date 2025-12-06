'use client'
import {useRouter} from "next/navigation";

export default function Tags ({tags, locale}: {tags: string[], locale: string}) {

  const router = useRouter();


  function handleClickTag(tag: string) {

    console.log("Clicked tag:", tag);
    const newUrl = tag === "tous" ? `/${locale}` : `/${locale}/?tag=${tag}`;
    router.push(newUrl);
  }



  return (

    <div className="flex gap-2 h-40 items-center  pl-4 pt-[4em]  w-full fixed bg-fond z-50">
      <button className="" onClick={() => handleClickTag("tous")}>{locale === "fr" ? "Voir tout" : "See all"}</button>
    {tags.map((tag, index) => (
      <button onClick={() => handleClickTag(tag)} key={index} className="">{tag}</button>
    ))}
    </div>
  )
}
