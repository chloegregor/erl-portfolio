import Image from 'next/image';
import {useState, useEffect} from 'react';

interface Work {
  id: number;
  title: string;
  illustration: string;
  images: string[];
  videos: string[];
}

export default function Work({ work }: { work: Work}) {
  return (
    <div className={`h-[10em] flex flex-col  items-center justify-center`} key={work.id}>
      <div id="card" className={`h-[60%] w-[70%]  flex flex-col items-center justify-center gap-3 `}>
        <h2 id="font"className=" text-[0.5em]">{work.title}</h2>
        </div>
    </div>
  );
}
