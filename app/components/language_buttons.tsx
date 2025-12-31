import Link from "next/link";

export default function LanguageButtons({currentLanguage}: {currentLanguage: string}) {
  return (
    <div className ="fixed top-0 right-0 m-4 flex gap-4 z-1000">
      <Link href={"/fr"} className={`text-[0.8em] py-1 hover:underline underline-offset-5 ${currentLanguage === "fr" ? "underline underline-offset-5" : ""}`}>FR</Link>
      <Link href={"/en"} className={`text-[0.8em] py-1 hover:underline underline-offset-5 ${currentLanguage === "en" ? "underline underline-offset-5" : ""}`}>EN</Link>
    </div>
  )
}
