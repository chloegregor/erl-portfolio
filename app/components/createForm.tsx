'use client';
import {useState, useEffect} from "react";
import {createWork} from "@/app/actions/works";
import  CloudinaryWidget  from "./cloudinary_widget";
import Image from "next/image";

export function CreateForm () {
  const type = ["performance", "exposition", 'travaux', 'workshop', 'textes', 'publications'];
  const [isClicked, setIsClicked] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<[string, string][]>([]);
  const [urlVideos, setUrlVideos] = useState<string[]>([]);
  const [illustration, setIllustration] = useState<string | null>(null);

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
    setIsClicked(false);
    const formData = new FormData();
    const form = event.currentTarget;
    const videoInputs = form.querySelectorAll('input[name="video"]');
    videoInputs.forEach((input) => {
      if (input instanceof HTMLInputElement && input.value.trim() !== '') {
        formData.append('video', input.value);
      }
    });
    formData.append("type", (form.type as HTMLSelectElement).value);
    formData.append("titre", form.title.value);
    formData.append("subtitle", form.subtitle.value);
    formData.append("description", form.description.value);
    formData.append("illustration", illustration);
    if (uploadedPhotos.length > 0)
      uploadedPhotos.forEach((photo) => {
        formData.append("photosurls", photo[0]);
        formData.append("phototitles", photo[1]);
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
    setUrlVideos(prev => prev.filter(videoUrl => videoUrl !== url));
  }



  return (
    <>
      <button className={`${isClicked ? "hidden" : "block p-1 border"} `} onClick={() => setIsClicked(true)}>
        Ajouter un projet
      </button>

      {isClicked && (
          <div className="absolute overflow-scroll bg-white  p-[1em] left-50 right-50 top-30 bottom-30 shadow-2xl z-10">
            <form onSubmit={handleSubmit}  method="POST" encType="multipart/form-data" className="flex flex-col gap-[1em] mt-[2em] relative">
              <button className="absolute top-0 right-0 cursor-pointer" onClick={() => setIsClicked(false)}>Fermer</button>
              <h2 className="text-[2em] text-center">Création</h2>
              <div className=" mt-[2em] flex flex-col gap-[2em]">
                <div  className="">
                  <label htmlFor="type">Type de projet :</label>
                  <select id="type" name="type" className="border w-[20%]">
                    <option value="performance">Performance</option>
                    <option value="exposition">Exposition</option>
                    <option value="travaux">Travaux</option>
                    <option value="workshop">Workshop</option>
                    <option value="textes">Textes</option>
                    <option value ="publications">Publications</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="title">Titre:</label>
                  <input type="text" className="border w-[50%]" id="title" name="title" required />
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <label htmlFor="subtitle">Sous-titre:</label>
                    <input type="radio" id="illustration" name="illustration" required onChange={(e) => {setIllustration("subtitle");}} />
                    <label htmlFor="illustration">Définir comme illustration.</label>
                  </div>
                  <input type="text" className="border w-[50%]" id="subtitle" name="subtitle"  />
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-3">
                    <label htmlFor="description">Contenu:</label>
                    <input type="radio" id="illustration" name="illustration" onChange={(e) => {setIllustration("description");}} />
                  </div>
                  <textarea className="border grow h-[20em]" id="description" name="description" required ></textarea>
                </div>
                <div>
                  {uploadedPhotos.length > 0 && (
                    <div className="flex gap-2">
                      {uploadedPhotos.map((photo, index) => (
                          <div className="flex gap-3" key={index}>
                            <span className="underline">{photo[1]}</span>
                            <input type="radio" id="illustration" name="illustration" onChange={(e) => {setIllustration(photo[0]);}} />
                            <button className="text-red-500 cursor-pointer" onClick={() => deleteFromEverywhere(photo[0])}>x</button>
                          </div>
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
                  <label htmlFor="video">Url vidéo : </label>
                  <input type="text" className="border" id="video" name="video" />
                </div>
                <div>
                  <button className="border p-1 cursor-pointer" type="button" onClick={addVideo}>Ajouter une vidéo</button>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="border p-1 cursor-pointer" type="submit">Publier</button>
              </div>
            </form>
          </div>
        )
      }

    </>
    )
}
