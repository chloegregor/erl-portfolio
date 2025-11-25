'use server'
import  prisma  from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createWork(formData: FormData) {
    const title =formData.get('titre') as string;
    const description = formData.get('description') as string;
    const photosurls = formData.getAll('photosurls') as string[];
    const videos = formData.getAll('video') as string[];

    console.log("Creating work with:", { title, description, photosurls, videos });
    const newWork = await prisma.work.create({
      data: {
        title: title,
        description: description,
        photos: {
          create : photosurls.map((url) => ({ url: url })),
        },
        videos: {
          create : videos.map((url) => ({ url: url })),
        }

      }
  })
    revalidatePath('/admin/works');
    return { ok: true};
  }

