'use client';
import {useState} from "react";
import {EditForm} from "./editForm";
import Image from "next/image";

export function IndexWorks({ works }: { works: Array<{ id: number; title: string; description: string }> }) {

  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);

  return (
    <div className="w-full">
      <h2>projet Publiés</h2>
        <div className="grid grid-cols-3 gap-4">
          {works.map((work) => (
            <div className ="border" key={work.id}>
              <div>
              <p>{work.title}</p>
              <p>{work.description}</p>
              <div className="flex gap-2">
                {work.photos && work.photos.length > 0 && (
                    work.photos.map((photo) => (
                      <Image key={photo.id} src={photo.url} alt={work.title} width={100} height={100} />
                    ))
                  )}
                </div>
                <div>
                  {work.videos && work.videos.length > 0 && (
                    work.videos.map((video) => (
                      <div key={video.id}>
                        <a href={video.url} target="_blank" rel="noopener noreferrer">{video.url}</a>
                      </div>
                    ))
                  )}
                </div>

              </div>
              <button onClick={() => setSelectedWorkId(work.id)}>Edit</button>
              {selectedWorkId === work.id && (
                <EditForm id={work.id} title={work.title} description={work.description} />
              )}
            </div>
          ))}
        </div>
    </div>
  );
}
