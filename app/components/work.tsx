
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
    url: string | null;
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
    <div className= "mx-[7%] h-full flex flex-col gap-0  " key={trad.id}>
      <span className=" flex flex-col gap-2 ">
        <div id="" className={` flex text-justify`}>
          <h2 id=""className=" text-[1.5em]">{trad.title}</h2>
          <span className=" ml-2 self-end mb-[4px]">{work.year}</span>
        </div>
        <div className="h-[50px]">
          <h3 className=" text-[1em] italic mr-[70%]">{trad.subtitle}</h3>
          {work.url && (
            <a href={work.url} target="_blank" className="text-[0.9em] text-blue-700 underline underline-offset-3 cursor-pointer">{work.url}</a>
          )}
        </div>
      </span>
      {medias.length > 0 && (

        <div className="mt-[2%]">
        <WorkMedias medias={medias} videos_caption={trad.videos_caption} photos_caption={trad.photos_caption}/>
        </div>

        )}
        <p className="whitespace-pre-wrap text-justify mt-[7%] mr-[50%] ">{trad?.description}</p>
    </div>
  );
}
