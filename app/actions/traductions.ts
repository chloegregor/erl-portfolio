'use server'
import  prisma  from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

type Language = {
  id: number;
  title: string;
  subtitle: string;
  type: string;
  description: string;
  locale: string;
  slug: string;
  photos_caption: string;
  videos_caption: string;
  work: {
    year: string;
    illustration: string;
    placement_x: string;
    placement_y: string;
    photos: {
      url: string;
      titre: string;
      id: number;
    }[];
    videos: {
      url: string;
      id: number;
    }[];
  }
}

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
      select: {
        id: true,
        type: true,
        slug: true,
        locale : true,
        title: true,
        subtitle: true,
        description: true,
        photos_caption: true,
        videos_caption: true,
        work: {
          select: {
            year: true,
            placement_x: true,
            placement_y: true,
            illustration: true,
            photos: {
              select: {
                url: true,
                titre: true,
                id: true
              }
            },
            videos: {
              select: {
                url: true,
                id: true
              }
            }
          }
        }


      }
    });
    return traductions;
}

export async function getTraductionBySlugAndLocale(slug: string, locale: string) {
    const traduction = await prisma.language.findUnique({
      where: {
        locale: locale,
        slug: slug
      },
      select: {
         id: true,
        type: true,
        title: true,
        subtitle: true,
        description: true,
        photos_caption: true,
        videos_caption: true,
        workId: true,
        work: {
          select: {
            year: true,
            photos: {
              select: {
                url: true,
                titre: true,
                id: true
              }
            },
            videos: {
              select: {
                url: true,
                id: true
              }
            }
          }
        }
      }
    });
    return traduction;
  }

  export async function getAllTraductionsRoutes () {
    const traductions = await getAllTraductions();
    const routing_infos = traductions.map((trad) => ({
      locale: trad.locale,
      slug: trad.slug
    }))
    return routing_infos;
  }

export async function createTraduction(type: string, title: string, subtitle: string, description: string, locale: string, photos_caption: string, videos_caption: string, workId: number) {
    console.log ("createTraduction called with:", type, title, subtitle, description, locale, workId);
    if (!title) {
      return
    }

    const slug = slugify(title, { lower: true, strict: true });

     await prisma.language.create({
      data: {
        locale: locale,
        type: type,
        title: title,
        photos_caption: photos_caption,
        videos_caption: videos_caption,
        slug : slug,
        subtitle: subtitle,
        description: description,
        work: { connect: { id: workId } }
      }
  })
    revalidatePath('/admin');
    return { ok: true};
  }

export async function updateTraduction(type: string, id: number, title: string, subtitle: string, description: string, photos_caption: string, videos_caption: string) {
    if (id === 0) {
      return
    }
    const slug = slugify(title, { lower: true, strict: true });

    await prisma.language.update({
      where: { id: id },
      data: {
        type: type,
        title: title,
        subtitle: subtitle,
        description: description,
        slug : slug,
        photos_caption: photos_caption,
        videos_caption: videos_caption,
      }
    });
    revalidatePath('/admin');
    return { ok: true};
}
