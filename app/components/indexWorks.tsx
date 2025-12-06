'use client';
import {useState} from "react";
import {EditForm} from "./editForm";
import {deleteWorkById} from "@/app/actions/works";

interface Work {
  id: number;
  year: string;
  illustration: string;
  url: string;
  photos: { id: number; url: string; titre: string }[];
  videos: { id: number; url: string }[];
  languages: { id: number; type: string; locale: string;
    title: string; subtitle: string | null; description: string | null;
    photos_caption: string | null; videos_caption: string | null
  }[];
}

export function IndexWorks({ works }: { works: Work[] }) {


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
            <div className ="grid border-l border-b grid-cols-20 h-[40px]" key={work.id}>
              <p className="border-r col-span-2 p-[0.2em] truncate ">{work.languages.find(lang => lang.locale === 'fr')?.type}</p>
              <p className=" border-r col-span-4 p-[0.2em] truncate ">{work.languages.find(lang => lang.locale === 'fr')?.title}</p>
              <p className=" border-r col-span-4 p-[0.2em] truncate ">{work.languages.find(lang => lang.locale === 'fr')?.subtitle}</p>
              <p className="border-r col-span-6 p-[0.2em] truncate"> {work.languages.find(lang => lang.locale === 'fr')?.description}</p>
              <div className="border-r col-span-1 text-center">
                <p>{work.photos.length}</p>
              </div>
              <div className ="border-r col-span-1 text-center">
                <p>{work.videos.length}</p>
              </div>
              <button className="border-r cursor-pointer col-span-1 text-center" onClick={() => setSelectedWorkId(work.id)}>editer</button>
              {selectedWorkId === work.id && (
                <EditForm workToEdit={work} onClose={() => setSelectedWorkId(null)} />
              )}
              <button onClick={() => deleteWorkById(work.id)}className="cursor-pointer col-span-1 text-center border-r border-black text-red-500">Poubelle</button>

            </div>
          ))}
        </div>
    </div>
  );
}
