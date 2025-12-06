"use client";
import Image from 'next/image';
import {useState} from 'react';

interface Photos {
  url: string;
  titre: string;
}

export default function WorkPhoto({photos}: {photos: Photos[]}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("work photos component photos:", photos);

  if (photos.length >= 1) {
    return (

        <div className=" h-[600px] w-[600px]  relative ">
          <Image src={photos[currentIndex].url} alt={photos[currentIndex].titre} fill priority className="object-contain object-bottom"/>
            {photos.length > 1 && (
              <div className=" absolute -right-60 w-[200px] h-[600px] overflow-y-scroll flex flex-col gap-1">
                {photos.map ((photo, index) => {
                  return (
                    <div key={index} className='flex flex-col '>
                      <div className={`relative flex h-[120px] w-[120px] cursor-pointer ${index % 2 === 0 ? "self-start" : "self-end"}`} onClick={() => setCurrentIndex(index)}>
                        <Image src={photo.url} alt={`Thumbnail ${index + 1}`} fill className="object-contain"/>
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
