import Image from 'next/image';
import {useState, useEffect} from 'react';

interface Work {
  id: number;
  title: string;
  subtitle: string
  description: string
  illustration: string;
  photos: string[];
  videos: string[];
}

export default function Work({ work}: { work: Work}) {
  if (work === null) {
    return
  }
  console.log("work", work) 
  return (
    <div className= "flex flex-col  items-center justify-center" key={work.id}>
      <div id="" className={` flex flex-col items-center justify-center text-justify gap-3 `}>
        <h2 id=""className=" text-[1em]">{work.title}</h2>
        <h3>{work?.subtitle}</h3>
        <p>{work.description}</p>
        {work.photos?.map((photo, index) => (
          <div key={index} className=" h-[400px] w-[600px] flex items-center justify-center my-5">
            <img src={photo.url} alt={work.title} className=" max-h-full max-w-full object-cover"/>
          </div>
        ))}
        </div>
    </div>
  );
}
