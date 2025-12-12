import Image from "next/image";


export  default function Vimeo({ url } : {url: string}) {

  const id = url.split('/').pop();

  return (
    <>
        <iframe className="absolute aspect-16/9 bottom-0 w-full "
          src={`https://player.vimeo.com/video/${id}`}
          loading ="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Vimeo Video Player"
        ></iframe>
    </>
  );

}
