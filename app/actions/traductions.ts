'use server'
import  prisma  from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

export async function getAllTraductions() {
    const traductions = await prisma.language.findMany(
      {
        include: { work: {
          include: { photos: true, videos: true
        } }
      }
    }
    );
    return traductions;
  }

export async function getTraductionById(id: number) {
    const traduction = await prisma.language.findUnique({
      where: { id: id },
      include: { work: {
        include: { photos: true, videos: true
      } }
    }
    });
    return traduction;
}

export async function getTraductionsByLocale (locale: string) {
    const traductions = await prisma.language.findMany({
      where: { locale: locale },
      include: { work: {
        include: { photos: true, videos: true
      } }
    }
    });
    return traductions;
}

export async function createTraduction(formData: FormData) {
    const locale = formData.get('locale') as string;
    const title =formData.get('title') as string;
    const subtitle =formData.get('subtitle') as string;
    const description = formData.get('description') as string;
    const workId = Number(formData.get('workId'));
    const slug = slugify(title, { lower: true, strict: true });

    const newTraduction = await prisma.language.create({
      data: {
        locale: locale,
        title: title,
        slug : slug,
        subtitle: subtitle,
        description: description,
        work: { connect: { id: workId } }
      }
  })
    revalidatePath('/admin');
    return { ok: true};
  }

export async function updateTraduction(formData: FormData) {
    const id = Number(formData.get('id'));
    const title =formData.get('title') as string;
    const subtitle =formData.get('subtitle') as string;
    const description = formData.get('description') as string;

    await prisma.language.update({
      where: { id: id },
      data: {
        title: title,
        subtitle: subtitle,
        description: description,
      }
    });
    revalidatePath('/admin');
    return { ok: true};
}
