'use client';
import {useState, useEffect} from "react";
import {createWork} from "@/app/actions/works";
import  CloudinaryWidget  from "./cloudinary_widget";
import Image from "next/image";

export function CreateForm () {
  const [isClicked, setIsClicked] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<[string, string][]>([]);
  const [urlVideos, setUrlVideos] = useState<string[]>([]);
  const [uploadIsClicked , setUploadIsClicked] = useState(false);
  console.log("uploaded photos", uploadedPhotos);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    setUploadIsClicked(true);
    const formData = new FormData();
    const form = event.currentTarget;
    const videoInputs = form.querySelectorAll('input[name="video"]');
    videoInputs.forEach((input) => {
      if (input instanceof HTMLInputElement && input.value.trim() !== '') {
        formData.append('video', input.value);
      }
    });
    formData.append("titre", form.title.value);
    formData.append("description", form.description.value);
    if (uploadedPhotos.length > 0)
      uploadedPhotos.forEach((photo) => {
        formData.append("photosurls", photo[0]);
      });
      console.log("formData before adding files", formData)


      console.log("formData", formData)

    const result = await createWork(formData);
    if (!result.ok) {
      alert("Erreur lors de la création du projet.");
      return;
    }
    if (result.ok) {
      setUrlVideos([]);
      form.reset();
      setUploadedPhotos([]);

    }
  }

  function deleteFromEverywhere(url: string) {
    setUploadedPhotos(prev => prev.filter(photo => photo[0] !== url));


  }



  return (
    <>
      <button className="border" onClick={() => setIsClicked(!isClicked)}>
        {isClicked ? "Masquer" : "Ajouter un projet"}
      </button>

      {isClicked && (
        <form onSubmit={handleSubmit}  method="POST" encType="multipart/form-data" className="flex flex-col gap-[1em] mt-[1em]">
          <div className="flex flex-col gap-[2em]">
            <div><label htmlFor="title">Title:</label>
              <input type="text" className="border" id="title" name="title" required />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea className="border" id="description" name="description" required></textarea>
            </div>
            <div>
              <span>photos:</span>
              {uploadedPhotos.length > 0 && (
                <div className="flex gap-2">
                  {uploadedPhotos.map((photo, index) => (
                      <span className="underline" key={index}>{photo[1]}
                      <Image src={photo[0]} alt={photo[1]} width={50} height={50} />
                      <button onClick={() => deleteFromEverywhere(photo[0])}>x</button>
                      </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <CloudinaryWidget handleUpload={handleUpload} />
            </div>
            <div className="">


            </div>
            <div id="videoInputs" className="flex gap-2">
              <label htmlFor="video">Url vidéo</label>
              <input type="text" className="border" id="video" name="video" />
            </div>
            <div>
              <p onClick={addVideo}>Ajouter une vidéo</p>
            </div>
          </div>

          <div>
            <button type="submit">Publier</button>
          </div>
        </form>)
      }

    </>
    )
}
