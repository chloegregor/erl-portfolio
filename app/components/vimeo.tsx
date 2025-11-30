
export default function Vimeo({url} : {url: string}) {

  const videoId = url.split('/').pop();

  if (!videoId) {
    return null;
  }

  return (
    <iframe
      src={`https://player.vimeo.com/video/${videoId}`}
      width="100"
      height="100"
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      title="Vimeo Video Player"
    ></iframe>
  );

}
