"use client";
import Image from 'next/image';
import {useState} from 'react';
import Vimeo from './vimeo';

interface Media {
  url: string;
  titre?: string;
  thumbnail?: string;
}
interface WorkMediaProps {
  medias: Media[];
  photos_caption: string | null;
  videos_caption: string | null;
}

export default function WorkMedia({medias, photos_caption, videos_caption}: WorkMediaProps) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const renderMedia = () => {
    return (
      medias[currentIndex].thumbnail ? (
        <div className="">
          <Vimeo url={medias[currentIndex].url} />
        </div>
      ) : (
        <Image src={medias[currentIndex].url} alt={`media${currentIndex}`} fill priority className="object-contain object-bottom"/>

      )
    )
  }

  const renderCaption = () => {
    const currentMedia = medias[currentIndex];
    if (currentMedia.thumbnail) {
      return videos_caption || "";
    } else {
      return photos_caption || "";
    }
  }

  const renderThumbnails = (media: Media) => {
    return (
      media.thumbnail ? (
          <Image src={media.thumbnail} alt="video thumbnail" fill className=" "/>
      ) : (
        <Image src={media.url} alt="photo thumbnail" fill className="object-contain"/>
      )
    )
  }

  if (medias.length >= 1) {
    return (
      <div className=" flex lg:flex-row flex-col gap-5">

        <p className="  lg:w-[20%] order-2 lg:order-0  lg:self-end lg:-left-55 lg:bottom-0  lg:whitespace-pre-wrap lg:text-end ">
          {renderCaption()}
        </p>
        <div className=" aspect-3/2 flex-1 relative  ">
          {renderMedia()}
        </div>

        <div className=" order-3 min-h-[70px] lg:w-[20%] overflow-y-scroll">
        {medias.length > 1 && (
            <div className=" lg:w-[50%] lg:ml-3 flex lg:flex-col flex-row gap-2">
              {medias.map ((media, index) => {
                return (
                  <div key={index} className='flex flex-col  '>
                    <div className={`relative flex  w-[70%] aspect-3/2 cursor-pointer ${index % 2 === 0 ? "self-start" : "self-end"}`} onClick={() => setCurrentIndex(index)}>
                      {renderThumbnails (media)}
                    </div>
                  </div>
                )
              }
              )}

            </div>

        )}
        </div>
      </div>



    );
  }
}
