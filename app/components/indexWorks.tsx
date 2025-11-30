'use client';
import {useState} from "react";
import {EditForm} from "./editForm";
import {deleteWorkById} from "@/app/actions/works";
import Image from "next/image";

export function IndexWorks({ works }) {

  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col gap-4 p-2">
      <h2>projet Publiés</h2>
        <div className="flex flex-col">
          <div className="grid border grid-cols-20 h-[2em]">
            <p className="border-r col-span-2 p-[0.2em] text-center">Type</p>
            <p className=" border-r col-span-4 p-[0.2em] text-center ">Titre</p>
            <p className="border-r col-span-4 p-[0.2em] text-center">sous-titre</p>
            <p className="border-r col-span-6 p-[0.2em] text-center "> Contenu</p>
            <div className="border-r col-span-1 text-center">
              <p>photos</p>
            </div>
            <div className ="border-r col-span-1 text-center">
              <p>vidéos</p>
            </div>

          </div>
          {works.map((work) => (
            <div className ="grid border-l border-b grid-cols-20 h-[2em]" key={work.id}>
              <p className="border-r col-span-2 p-[0.2em] ">{work.type}</p>
              <p className=" border-r col-span-4 p-[0.2em] ">{work.title}</p>
              <p className=" border-r col-span-4 p-[0.2em] ">{work.subtitle}</p>
              <p className="border-r col-span-6 p-[0.2em] overflow-y-hidden"> {work.description}</p>
              <div className="border-r col-span-1 text-center">
                <p>{work.photos.length}</p>
              </div>
              <div className ="border-r col-span-1 text-center">
                <p>{work.videos.length}</p>
              </div>
              <button className="border-r cursor-pointer col-span-1 text-center" onClick={() => setSelectedWorkId(work.id)}>Editer</button>
              {selectedWorkId === work.id && (
                <EditForm work={work} onClose={() => setSelectedWorkId(null)} />
              )}
              <button onClick={() => deleteWorkById(work.id)}className="cursor-pointer col-span-1 text-center border-r">Supprimer</button>

            </div>
          ))}
        </div>
    </div>
  );
}
