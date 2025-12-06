
interface Video {
  url: string;
}

export default function Vimeo({videos} : {videos: Video[]}) {

  if (videos.length === 0) {
    return null;
  }

  function videoId (url:string) {
    if (!url) {
      return null;
  }else {
      return url.split('/').pop();
    }
  }

  return (
    <>

    {videos.map((video, index) => {
        const id = videoId(video.url);
        if (!id) {
          return null;
        }

      return (
        <div key={index} className=" relative w-full h-[230px]  ">
          <iframe className="absolute top-0 left-0 w-full h-full"
        src={`https://player.vimeo.com/video/${id}`}
        loading ="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Vimeo Video Player"
      ></iframe>
        </div>
      )
    })}
    </>
  );

}
