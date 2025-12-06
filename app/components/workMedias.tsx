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
          <Image src={media.thumbnail} alt="video thumbnail" fill className="object-contain"/>
      ) : (
        <Image src={media.url} alt="photo thumbnail" fill className="object-contain"/>
      )
    )
  }

  console.log("WORK media", medias);
  if (medias.length >= 1) {
    return (
        <div className=" h-[600px] w-[600px]  relative ">
          <p className=" absolute w-50 -left-55 bottom-0 whitespace-pre-wrap text-end ">
            {renderCaption()}
          </p>
          {renderMedia()}

            {medias.length > 1 && (
              <div className=" absolute pr-7 -right-100 w-[250px] h-[600px] overflow-y-scroll flex flex-col gap-1">
                {medias.map ((media, index) => {
                  return (
                    <div key={index} className='flex flex-col '>
                      <div className={`relative flex h-[120px] w-[120px] cursor-pointer ${index % 2 === 0 ? "self-start" : "self-end"}`} onClick={() => setCurrentIndex(index)}>
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
