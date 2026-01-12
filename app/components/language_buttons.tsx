import Link from "next/link";

export default function LanguageButtons({currentLanguage}: {currentLanguage: string}) {
  return (
    <div className =" flex gap-4 z-1000">
      <Link href={"/fr"} className={`text-[0.8em] py-1 hover:underline underline-offset-5 decoration-green-400 ${currentLanguage === "fr" ? "underline underline-offset-5 decoration-green-400" : ""}`}>FR</Link>
      <Link href={"/en"} className={`text-[0.8em] py-1 hover:underline underline-offset-5 decoration-green-400 ${currentLanguage === "en" ? "underline underline-offset-5 decoration-green-400" : ""}`}>EN</Link>
    </div>
  )
}
