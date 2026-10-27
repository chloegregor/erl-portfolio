'use client'
import { useEffect} from "react";
import { usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";


export default function Tags ({tags, locale,}: {tags: string[], locale: string}) {

const pathname = usePathname();

const searchParams = useSearchParams();

const currentTag = searchParams.get('tag') || "tout";


const tagColor: Record<string, [string, string]> = {
  Realisations: ["text-green-400", "hover:text-green-400"],
  Performances: ["text-green-400", "hover:text-green-400"],
  Workshops: ["text-green-400", "hover:text-green-400"],
  Presse: ["text-green-400", "hover:text-green-400"],
  Publications: ["text-green-400", "hover:text-green-400"],

};

 useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant'});
  }, [pathname]);


  return (

    <div className="flex gap-2
    ">
    <span className=" flex flex-col lg:flex-row gap-2">
      <Link href={`/${locale}`}  className={` ${currentTag === "tout" ? "text-red-600" : "hover:text-red-600"}`} scroll={true}> {locale === "fr" ? "Tout voir" : "See all"}</Link>
      <Link href={`/${locale}/?tag=realisations`} className={currentTag === "realisations" || currentTag === "Exhibitions" ? tagColor["Realisations"][0] : tagColor["Realisations"][1]}>{locale === 'fr' ? "Réalisations" : "Works"}</Link>
      <Link href={`/${locale}/?tag=performances`} className={currentTag === "performances" ? tagColor["Performances"][0] : tagColor["Performances"][1]}>Performances</Link>
    </span>
    <span className=" flex flex-col lg:flex-row gap-2">
      <Link href={`/${locale}/?tag=workshops`} className={currentTag === "workshops" ? tagColor["Workshops"][0] : tagColor["Workshops"][1]}>Workshops</Link>
      <Link href={`/${locale}/?tag=presse`} className={currentTag === "presse" || currentTag === "Press" ? tagColor["Presse"][0] : tagColor["Presse"][1]}>{locale === 'fr' ? "Presse" : "Press"}</Link>
      <Link href={`/${locale}/?tag=publications`} className={currentTag === "publications" ? tagColor["Publications"][0] : tagColor["Publications"][1]}>Publications</Link>
    </span>
    </div>
  )
}
