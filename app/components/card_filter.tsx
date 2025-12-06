'use client';
import CardGrid from "@/app/components/card_grid";
import {useState} from "react";
import Link from "next/link";

interface Traduction {
  id: number;
  slug: string;
  locale: string;
  type: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  photos_caption: string | null;
  videos_caption: string | null;
  work: {
    illustration: string | null;
    placement_x: string;
    placement_y: string;
  }
}


export default function CardFilter({ traductions, filtered_traductions }: { traductions: Traduction[], filtered_traductions: Traduction[]}) {

  const filtered_works = filtered_traductions
  console.log("filtered_works", filtered_works)
  return(
    <>

    <div className="pl-15 pr-15 mt-50 ">
      <div className =" ">
        <div className={` grid grid-cols-6 gap-[4em]`}>
          { traductions.map((trad) => (
              <Link key={trad.id} href={`/${trad.locale}/${trad.slug}`} className="">
                <CardGrid trad={trad} opacity={filtered_works.includes(trad) ? false : true}  />
              </Link>
            ))
          }
        </div>

      </div>
    </div>

    </>
  )
}
