'use client';

import { CldUploadWidget } from "next-cloudinary";
import { useState, useEffect } from "react";


export default function CloudinaryWidget({handleUpload}) {

  const [url, setUrl] = useState<[string, string][]>([]);

  useEffect(() => {
    if (url.length > 0) {
      handleUpload(url);
    }
  }, [url]);

  return (

    <CldUploadWidget
    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}
    upload={{multiple:true}}
    options={{
      multiple: true,
      sources: ['local']
    }}
    onSuccess={
      (result => {
        const newurl = result?.info?.secure_url;
        const newname = result?.info?.original_filename;
        setUrl([[newurl, newname]]);

      })
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
