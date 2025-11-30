'use client';
import Image from 'next/image';
import {useState, useEffect} from 'react';


interface Work {
  id: number;
  title: string;
  illustration: string;
}

export default function CardGrid({ work, opacity }: { work: Work, opacity: boolean}) {
  const [place, setPlace] = useState<"center" | "start" | "end"| null>(null);
  console.log("work in card grid", work);


  useEffect(() => {
    const positions: ( | "start" | "end")[] = ["start", "end"];
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];
    setPlace(randomPosition);
  }, []);

  const italic = work.illustration === "subtitle"

  if (!place) {
    return null;
  }

    return (
    <div className={`h-[10em] flex flex-col  items-${place} justify-${place}` }key={work.id}>
      <div id="card" className={`h-[60%] w-[70%]  flex flex-col items-center justify-center gap-3 ${opacity ? "opacity-0" : "opacity-100"}`}>
        <h2 id="font"className=" text-[0.5em]">{work.title}</h2>
        {work.illustration.includes("https://") ? (
          <div className="h-[70%] w-[100%]  flex items-center justify-center">
            <img src={work.illustration} alt={work.title} className=" max-h-full max-w-full object-cover"/>
          </div>
        )
          : (
            <div className=" max-w-full ">
              <p className={`text-justify text-[0.4em] line-clamp-5 w-100% ${italic ? "italic" : ""}`}>{work[work.illustration]}</p>
            </div>
          )}
      </div>
    </div>
    );
}
