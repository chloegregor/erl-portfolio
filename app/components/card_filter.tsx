'use client';
import CardGrid from "@/app/components/card_grid";
import {useState} from "react";

interface Work {
  id: number;
  title: string;
  type: string;
  photos: { url: string }[];
}

export default function CardFilter({ works, tags }: { works: Work[], tags: string[]}) {

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const filtered_works = works.filter((work) => work.type === selectedTag || selectedTag === null);

  return(
    <>
     <div className="flex  gap-2 h-[4em] p-10 w-full fixed bg-white z-1000">
      <button className="" onClick={() => setSelectedTag(null)}>Tous</button>
    {tags.map((tag, index) => (
      <button onClick={() => setSelectedTag(tag)} key={index} className="">{tag}</button>
    ))}
    </div>
    <div className ="pl-15 pr-15 mt-30">
      <div className="grid grid-cols-6 gap-[4em]">
        { works.map((work) => (
            <CardGrid key={work.id} work={work} opacity={filtered_works.includes(work) ? false : true} />
          ))
        }
      </div>
    </div>
    </>
  )
}
