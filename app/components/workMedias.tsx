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
        <Image src={medias[currentIndex].url} alt={`media${currentIndex}`} fill priority className="object-contain object-left"/>

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
        <Image src={media.url} alt="photo thumbnail" fill className="object-cover"/>
      )
    )
  }

  if (medias.length >= 1) {
    return (
      <div className="  flex lg:flex-row  flex-col gap-2 ">
        <div className="lg:order-2 w-full flex flex-col gap-2 lg:relative">
          <div className="aspect-3/2 flex-1 relative ">
            {renderMedia()}
          </div>
          <p className=" lg:absolute lg:-bottom-8  text-gray-400 text-[0.9em]">
            {renderCaption()}
          </p>
        </div>

        <div className=" lg:w-[70px] w-full  overflow-y-scroll">
        {medias.length > 1 && (
            <div className=" flex lg:flex-col flex-row gap-2">
              {medias.map ((media, index) => {
                return (
                    <div key={index}className={`  relative flex aspect-3/2 w-full cursor-pointer`} onClick={() => setCurrentIndex(index)}>
                      {renderThumbnails (media)}
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
