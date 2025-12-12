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
        <div className=" aspect-3/2  w-[60%] mx-auto relative  ">
          <p className=" absolute w-50 -left-55 bottom-0 whitespace-pre-wrap text-end ">
            {renderCaption()}
          </p>
          {renderMedia()}

            {medias.length > 1 && (
              <div className=" absolute flex  pr-7 -right-70 w-[250px] h-[600px] overflow-y-scroll flex-col gap-2">
                {medias.map ((media, index) => {
                  return (
                    <div key={index} className='flex flex-col  '>
                      <div className={`relative flex  w-[90px] aspect-3/2 cursor-pointer ${index % 2 === 0 ? "self-start" : "self-end"}`} onClick={() => setCurrentIndex(index)}>
                        {renderThumbnails (media)}
                      </div>
                    </div>
                  )
                }
                )}
              </div>
            )}
        </div>


    );
  }
}
