'use client';
import CardGrid from "@/app/components/card_grid";
import {useState} from "react";
import Work from "@/app/components/work"

interface Work {
  id: number;
  title: string;
  type: string;
  illustration:string
  photos: { url: string }[];
}

export default function CardFilter({ works, tags }: { works: Work[], tags: string[]}) {

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const handleClickTag = (tag: string) => {
    if ( tag === "Tous") {
      setSelectedTag(null)
      setSelectedWork(null)
    }
    else {
      setSelectedTag(tag)
      setSelectedWork(null)
    }
  }
  const filtered_works = works.filter((work) => work.type === selectedTag || selectedTag === null);

  return(
    <>
     <div className="flex  gap-2 h-[4em] p-10 w-full fixed bg-white z-1000">
      <button className="" onClick={() => handleClickTag("Tous")}>Tous</button>
    {tags.map((tag, index) => (
      <button onClick={() => handleClickTag(tag)} key={index} className="">{tag}</button>
    ))}
    </div>
    <div className="pl-15 pr-15 mt-30">
      <div className =" ">
        <div className={` grid grid-cols-6 gap-[4em] ${selectedWork ? "hidden" : "grid"}`}>
          { works.map((work) => (
              <CardGrid key={work.id} work={work} opacity={filtered_works.includes(work) ? false : true} selectWork={() => setSelectedWork(work)} />
            ))
          }
        </div>
      <div className={`${selectedWork ? "block" : "invisible" } w-full`}>
        <Work work={selectedWork}/>
      </div>
      </div>
    </div>

    </>
  )
}
