
import WorkMedias from "./workMedias";

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
      thumbnail: string;
    }[];
  } ;
}

export default function Work({trad}: {trad: Trad}) {

  if (trad === null) {
    return
  }

  const work =trad.work
  const photos = work.photos
  const videos = work.videos
  const medias = [...photos, ...videos]

  return (
    <div className= "mx-50 flex flex-col gap-10 " key={trad.id}>
      <span className=" flex flex-col gap-2 ">
        <div id="" className={` flex text-justify`}>
          <h2 id=""className=" text-[1.5em]">{trad.title}</h2>
          <span className=" ml-2 self-end mb-[4px]">{work.year}</span>
        </div>
        <div>
          <h3 className=" text-[1.2em] italic w-[600px]">{trad.subtitle}</h3>
        </div>
      </span>
      <div className="  flex">
        <div className="fit-content mx-auto relative">
        <WorkMedias medias={medias} videos_caption={trad.videos_caption} photos_caption={trad.photos_caption}/>
        </div>
      </div>
        <p className="whitespace-pre-wrap text-justify mt-30 mr-120 ">{trad?.description}</p>
    </div>
  );
}
