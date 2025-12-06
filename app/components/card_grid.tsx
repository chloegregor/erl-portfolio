'use client';
import Image from 'next/image';


interface Language {
  id: number;
  title: string;
  subtitle: string | null;
  type: string;
  description: string | null;
  work: {
    illustration: string | null;
    placement_x: string;
    placement_y: string;
  }
}

export default function CardGrid({ trad, opacity}: { trad: Language, opacity: boolean}) {

  const italic = trad.work.illustration === "subtitle"
  const work = trad.work;
  const TextKey = trad.work.illustration !== "null" ? trad.work.illustration as keyof Language : "";


    return (
    <div className={`aspect-square flex flex-col  items-${work.placement_x} justify-${work.placement_y}` }key={trad.id}>
      <div id="card"className={`h-[50%] w-[70%]  flex flex-col items-center justify-center gap-3 ${opacity ? "opacity-0" : "opacity-100"}`}>
        <h2 id="font"className=" text-[0.8em]">{trad.title}</h2>
        {work.illustration?.includes("https://") ? (
          <div className="  relative h-[80%] w-[100%]">
            <Image src={TextKey} alt={trad.title} fill className="object-contain"/>
          </div>
        )
          : (
            <div className=" max-w-full ">
              <p className={`text-justify text-[0.4em] line-clamp-5 w-100% ${italic ? "italic" : ""}`}>{TextKey}</p>
            </div>
          )}
      </div>
    </div>
    );
}
