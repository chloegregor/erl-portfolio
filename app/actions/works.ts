'use server'
import  prisma  from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


export async function getAllWorks() {
    const works = await prisma.work.findMany({include: {photos: true, videos: true}});
    return works;
}

export async function getWorkById(id: number) {
    const work = await prisma.work.findUnique({
      where: { id: id },
      include: { photos: true, videos: true },
    });
    return work;
}

export async function createWork(formData: FormData) {
    const type = formData.get('type') as string;
    const title =formData.get('titre') as string;
    const subtitle =formData.get('subtitle') as string;
    const description = formData.get('description') as string;
    const photosurls = formData.getAll('photosurls') as string[];
    const phototitles = formData.getAll('phototitles') as string[];
    const videos = formData.getAll('video') as string[];
    const illustration = formData.get('illustration') as string;

    const newWork = await prisma.work.create({
      data: {
        type: type,
        title: title,
        subtitle: subtitle,
        description: description,
        illustration: illustration,
        photos: {
          create : photosurls.map((url) => ({ url: url, titre: phototitles[photosurls.indexOf(url)] })),
        },
        videos: {
          create : videos.map((url) => ({ url: url })),
        }

      }
  })
    revalidatePath('/admin/works');
    return { ok: true};
  }

export async function updateWork(formData: FormData) {
    const id = Number(formData.get('id'));
    const title =formData.get('titre') as string;
    const description = formData.get('description') as string;
    const photosurls = formData.getAll('photosurls') as string[];
    const phototitles = formData.getAll('phototitles') as string[];
    const videos = formData.getAll('video') as string[];
    const illustration = formData.get('illustration') as string;
    console.log("updating with pictures", photosurls);


    await prisma.work.update({
      where: { id: id },
      data: {
        title: title,
        description: description,
        illustration: illustration,
        photos: {
          create : photosurls.map((url) => ({ url: url, titre: phototitles[photosurls.indexOf(url)] })),
        },
        videos: {
          create : videos.map((url) => ({ url: url })),
        }
      },
    });
    revalidatePath('/admin/works');
    return { ok: true};
}

export async function deleteWorkById(id: number) {
    await prisma.work.delete({
      where: { id: id },
    });
    revalidatePath('/admin/works');
    return { ok: true};
}
