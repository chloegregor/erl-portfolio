import  CloudinaryWidget  from "./cloudinary_widget";
import {updateWork} from '@/app/actions/works';
import {deletePhotoById, deleteVideoById} from '@/app/actions/photos_videos';
import {useState, useEffect} from "react";
import Image from "next/image";

interface Work {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  illustration: string;
  photos: { id: number; url: string; titre: string }[];
  videos: { id: number; url: string }[];
}

interface EditFormProps {
  work: Work;
  onClose: () => void;
}

export function EditForm({ work, onClose }: EditFormProps ) {

  const photos = work.photos;
  const videos = work.videos;

  const [uploadedPhotos, setUploadedPhotos] = useState<[string, string][]>([]);
  const [urlVideos, setUrlVideos] = useState<string[]>([]);
  const [illustration, setIllustration] = useState<string>(work.illustration);





  function handleUpload(urls: [string, string][]){
    setUploadedPhotos((prev) => [...prev, ...urls]);
 }

 function addVideo() {
    const container = document.getElementById('videoInputs');
    if (container) {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = 'video';
      input.className = 'border';
      container.appendChild(input);
    }
  }

 function deleteFromEverywhere(url: string) {
    setUploadedPhotos(prev => prev.filter(photo => photo[0] !== url));
    setUrlVideos(prev => prev.filter(videoUrl => videoUrl !== url));
  }
   const  handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const form = event.currentTarget;
    const videoInputs = form.querySelectorAll('input[name="video"]');
    videoInputs.forEach((input) => {
      if (input instanceof HTMLInputElement && input.value.trim() !== '') {
        formData.append('video', input.value);
      }
    });
    formData.append("id", work.id.toString());
    formData.append("titre", form.titre.value);
    formData.append("description", form.description.value);
    formData.append("illustration", illustration);
    if (uploadedPhotos.length > 0)
      uploadedPhotos.forEach((photo) => {
        formData.append("photosurls", photo[0]);
        formData.append("phototitles", photo[1]);
      });
      console.log("formData before adding files", formData)
    const result = await updateWork(formData);
    if (!result.ok) {
      alert("Erreur lors de la mise à jour du projet.");
      return;
    }
    if (result.ok) {
      setUrlVideos([]);
      form.reset();
      setUploadedPhotos([]);
      onClose();

    }
  }

  return (
    <>

    <div className="absolute overflow-scroll bg-white  p-[1em] left-50 right-50 top-30 bottom-30 shadow-2xl">
      <form onSubmit={handleSubmit}  className="flex flex-col gap-[1em] mt-[1em] relative ">
        <button className="absolute top-0 right-0 z-10 cursor-pointer" onClick={onClose} type="button">Fermer</button>
        <h2 className="text-[2em] text-center">Edition</h2>
        <div className="mt-[2em] flex flex-col gap-[2em]">

          <input type="hidden" name="id" value={work.id} />
          <input type="hidden" name="_method" />
          <div>
            <label htmlFor={`type-${work.id}`}>Type: </label>
            <input
              type="text"
              className="border w-[50%]"
              id={`type-${work.id}`}
              name="type"
              defaultValue={work.type}
              required
            />
          </div>
          <div>
            <label className="" htmlFor={`title-${work.id}`}>Titre: </label>
            <input
              type="text"
              className="border w-[50%]"
              id={`title-${work.id}`}
              name="titre"
              defaultValue={work.title}
              required
            />
          </div>
          <div>
            <div className ="flex gap-2">
            <label htmlFor={`subtitle-${work.id}`}>Sous-titre: </label>
            <input type="radio" id="illustration" name="illustration" defaultChecked={work.illustration == "subtitle"} onClick={() => setIllustration("subtitle")} />
            </div>
            <input
              type="text"
              className="border w-[50%]"
              id={`subtitle-${work.id}`}
              name="subtitle"
              defaultValue={work.subtitle}
            />
          </div>
          <div>
            <div className="flex gap-2">
            <label htmlFor={`description-${work.id}`}>Description:</label>
            <input type="radio" id="illustration" name="illustration" defaultChecked={work.illustration == "description"} onClick={() => setIllustration('description')}/>
            </div>
            <textarea
              className="border border w-full h-[20em]"
              id={`description-${work.id}`}
              name="description"
              defaultValue={work.description}
              required
            ></textarea>
          </div>
          <span>Photos:</span>
          <div className="flex gap-2">
            {photos && photos.length > 0 && (
              <div className="flex ">
                <div className="flex gap-2">
                  {photos.map((photo) => (
                    <div className="flex gap-2" key={photo.id}>
                      <p className="underline">{photo.titre}</p>
                      <input type="radio" id="illustration" name="illustration" defaultChecked={work.illustration == photo.url} onClick={() => setIllustration(photo.url)} />
                      <button type="button" className="text-red-500"onClick={() => deletePhotoById(photo.id)}>x</button>
                    </div>
                  ))
                  }
                </div>
              </div>
            )}
            {uploadedPhotos.length > 0 && (
              <div className=" ">
                {uploadedPhotos.map((photo, index) => (
                    <div className="flex gap-2" key={index}>
                      <p className="underline">{photo[1]}</p>
                      <input type="radio" id="illustration" name="illustration" defaultChecked={work.illustration == photo[0]} onClick={()=> setIllustration(photo[0])} />
                    <button type="button" className="text-red-500" onClick={() => deleteFromEverywhere(photo[0])}>x</button>
                    </div>
                ))}
              </div>
            )}
          </div>
          <div>
          <CloudinaryWidget handleUpload={handleUpload} />
          </div>

          {videos && videos.length > 0 && (
            <div>
              <span>Vidéos:</span>
              <div className="flex flex-col gap-2">
                {videos.map((video) => (
                  <div key={video.id}>
                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                      {video.url}
                    </a>
                    <button onClick={() => deleteVideoById(video.id)}>x</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div id="videoInputs" className="flex flex-wrap gap-2">
            <label htmlFor="video">Url vidéo</label>
            <input type="text" className="border" id="video" name="video" />
          </div>
            <div>
              <button className="border p-1" type="button" onClick={addVideo}>Ajouter une vidéo</button>
            </div>
        </div>
        <div className="flex justify-end ">
          <button className="border p-1 cursor-pointer" type="submit">Publier</button>
        </div>
      </form>
    </div>


    </>
  )
}
