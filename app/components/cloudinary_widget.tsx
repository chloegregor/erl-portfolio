'use client';

import { CldUploadWidget } from "next-cloudinary";
import { useState, useEffect } from "react";

interface CloudinaryWidgetProps {
  handleUpload: (urls: [string, string][]) => void;
}

export default function CloudinaryWidget({handleUpload}: CloudinaryWidgetProps) {

  const [url, setUrl] = useState<[string, string][]>([]);

  useEffect(() => {
    if (url.length > 0) {
      handleUpload(url);
    }
  }, [url]);

  return (

    <CldUploadWidget uploadPreset="erl_uploads"
    config={{
      cloud:{
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      }
    }}
    options={{
      multiple: true,
      sources: ['local']
    }}
    onSuccess={
      (result => {
              const infos = result?.info;
              if (typeof infos === "object" && infos !== null && "secure_url" in infos) {
                const newUrl: [string, string] = [infos.secure_url, infos.original_filename];
                setUrl((prev) => [...prev, newUrl]);
              }
        }
      )
    }
  >
    {({ open }) => {
      return (
        <button type="button" onClick={() => open?.()} className="border p-1">
          Ajouter des photos
        </button>
      );
    }}

  </CldUploadWidget>
  )
}
