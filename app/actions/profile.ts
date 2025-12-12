'use server'
import  prisma  from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateProfile(telephone: string, email: string, cv: string, portfolio: string) {

    const profile = await prisma.profile.findFirst();
    if (profile) {
      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          telephone: telephone,
          email: email,
          cv: cv,
          portfolio: portfolio,
        },
      });
    } else {
      await prisma.profile.create({
        data: {
          telephone: telephone,
          email: email,
          cv: cv,
          portfolio: portfolio,
        },
      });
    }
    revalidatePath('/admin');
    return { ok: true};
}
