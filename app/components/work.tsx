
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

function Arrowprev ({slug}: {slug?: string}) {
  if (!slug) {
    return (
    <div className="rotate-180">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width={50}
          height={92}
          fill="none"
          viewBox="0 0 24 24"

        >
        <path
          stroke="#6666"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.600}
          d="M20 12H4m16 0-6 6m6-6-6-6"
        />
      </svg>
    </div>

    )
  }
  return (
    <div className="rotate-180">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={92}
        fill="none"
        viewBox="0 0 24 24"

      >
      <path
        stroke="#171717"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.600}
        d="M20 12H4m16 0-6 6m6-6-6-6"
      />
      </svg>
    </div>

  )

}

function Arrownext ({slug}: {slug?: string}) {
  if (!slug) {
    return (
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={50}
          height={92}
          fill="none"
          viewBox="0 0 24 24"

        >
          <path
            stroke="#6666"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.600}
            d="M20 12H4m16 0-6 6m6-6-6-6"
          />
        </svg>
      </div>

    )
  }
  return (
    <div className="">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={92}
        fill="none"
        viewBox="0 0 24 24"

      >
      <path
        stroke="#171717"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.600}
        d="M20 12H4m16 0-6 6m6-6-6-6"
      />
      </svg>
    </div>

  )

}
export default function Work({trad, next, prev, locale}: {trad: Trad, next: string, prev: string, locale: string}) {

  if (trad === null) {
    return
  }

  const work =trad.work
  const photos = work.photos
  const videos = work.videos
  const medias = [...photos, ...videos]

  function url (slug:string) {
    if (!slug) {
      return "#"
    }
    return `/${locale}/${slug}/?tag=${trad.type}`
  }


  return (
    <div className= "lg:mx-[100px] pl-4 pr-4 h-full flex flex-col gap-2 " key={trad.id}>
      <span className=" flex flex-col gap-2 ">
        <div id="" className={` flex text-justify`}>
          <h2 id=""className=" text-[1.5em]">{trad.title}</h2>
          <span className=" ml-2 self-end mb-[4px]">{work.year}</span>
        </div>
        <div className="h-[50px]">
          <h3 className=" text-[1em] italic lg:mr-[70%]">{trad.subtitle}</h3>
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
        <p className="whitespace-pre-wrap text-justify mt-[7%] lg:mr-[50%] ">{trad?.description}</p>
        <div className=" mt-[7%] flex ">

        <a className={prev ? "" : "disabled"} href={url(prev)}><Arrowprev slug={prev}/></a>

          <span className="ml-auto">
            <a className={next ? "" : "disabled"} href={url(next)}><Arrownext slug={next}/></a>
          </span>
        </div>
    </div>
  );
}
