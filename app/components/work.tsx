
import WorkPhoto from "./workPhotos";
import Vimeo from "./vimeo"

interface Trad {
  id: number;
  type: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  photos_caption: string | null;
  videos_caption: string | null;
  work: {
    year: string | null;
    photos: {
      url: string;
      titre: string;
    }[];
    videos: {
      url: string;
    }[];
  } ;
}

export default function Work({trad}: {trad: Trad | null}) {

  if (trad === null) {
    return
  }

  const work =trad.work

  return (
    <div className= "mx-50 flex flex-col gap-10 " key={trad.id}>
      <span className=" flex flex-col gap-2 ">
        <div id="" className={` flex text-justify`}>
          <h2 id=""className=" text-[1.5em]">{trad.title}</h2>
          <span className=" ml-2 self-end mb-[4px]">{work.year}</span>
        </div>
        <div>
          <h3 className=" text-[1.2em] italic">{trad.subtitle}</h3>
        </div>
      </span>
      <div className="  flex ">
        <div className="fit-content mx-auto relative">
        <p className=" absolute w-50 -left-60 bottom-0 whitespace-pre-wrap text-end ">{trad?.photos_caption}</p>
        <WorkPhoto photos={work.photos}/>
        </div>
      </div>
      <p className="whitespace-pre-wrap text-justify mt-10 mr-100 ">{trad?.description}</p>
      <div className=" flex justify-end relative">
        <div className="grid grid-cols-2 gap-2 w-[60%] relative ">
          <Vimeo videos={work.videos}/>
        <p className=" whitespace-pre-wrap absolute w-50 -left-60 bottom-0 text-end ">{trad?.videos_caption}</p>
        </div>
      </div>
    </div>
  );
}
