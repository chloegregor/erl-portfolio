'use client'
import { useEffect} from "react";
import { usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";


export default function Tags ({tags, locale,}: {tags: string[], locale: string}) {

const pathname = usePathname();
console.log("Current pathname:", pathname);

const searchParams = useSearchParams();

const currentTag = searchParams.get('tag') || "tout";
console.log("Current tag in Tags component:", currentTag);


const tagColor: Record<string, [string, string]> = {
  Expositions: ["text-green-400", "hover:text-green-400"],
  Exhibitions: ["text-green-400", "hover:text-green-400"],
  Performances: ["text-pink-400", "hover:text-pink-400"],
  Workshops: ["text-blue-500", "hover:text-blue-500"],
  Presse: ["text-orange-500", "hover:text-orange-500"],
  Publications: ["text-yellow-500", "hover:text-yellow-500"],

};

 useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant'});
  }, [pathname]);


  return (

    <div className="flex gap-2
    ">
    <span className=" flex flex-col lg:flex-row gap-2">
      <Link href={`/${locale}`}  className={` ${currentTag === "tout" ? "text-purple-800" : "hover:text-purple-800"}`} scroll={true}> {locale === "fr" ? "Tout voir" : "See all"}</Link>
      <Link href={`/${locale}/?tag=expositions`} className={currentTag === "expositions" || currentTag === "Exhibitions" ? tagColor["Expositions"][0] : tagColor["Expositions"][1]}>{locale === 'fr' ? "Éxpositions" : "Exhibitions"}</Link>
      <Link href={`/${locale}/?tag=performances`} className={currentTag === "performances" ? tagColor["Performances"][0] : tagColor["Performances"][1]}>Performances</Link>
    </span>
    <span className=" flex flex-col lg:flex-row gap-2">
      <Link href={`/${locale}/?tag=workshops`} className={currentTag === "workshops" ? tagColor["Workshops"][0] : tagColor["Workshops"][1]}>Workshops</Link>
      <Link href={`/${locale}/?tag=presse`} className={currentTag === "presse" || currentTag === "Press" ? tagColor["Presse"][0] : tagColor["Presse"][1]}>{locale === 'fr' ? "Presse" : "Press"}</Link>
      <Link href={`/${locale}/?tag=publications`} className={currentTag === "publications" ? tagColor["Publications"][0] : tagColor["Publications"][1]}>Publication</Link>
    </span>
    </div>
  )
}
