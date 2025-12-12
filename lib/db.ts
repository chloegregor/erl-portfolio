import prisma from "@/lib/prisma";
import {cache} from "react";

export async function getProfile() {
  const profile = await prisma.profile.findFirst();
  return profile;
}


export const getTraductionsByLocale = cache(async (locale: string) =>  {
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
                id: true,
                thumbnail: true
              }
            }
          }
        }


      }
    });
    return traductions;
});

export const  getTraductionBySlugAndLocale = cache(async (slug: string, locale: string) => {
    const traduction = await prisma.language.findUnique({
      where: {
        locale: locale,
        slug: slug,
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
            url: true,
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
                id: true,
                thumbnail: true
              }
            }
          }
        }
      }
    });
    return traduction;
  });

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

    export async function getAllTraductionsRoutes () {
    const traductions = await getAllTraductions();
    const routing_infos = traductions.map((trad) => ({
      locale: trad.locale,
      slug: trad.slug
    }))
    return routing_infos;
  }
