
'use server'
import  prisma  from '@/lib/prisma';
import { revalidatePath } from 'next/cache';





export async function deletePhotoById(id: number) {
    await prisma.photo.delete({
      where: { id: id },
    });
    revalidatePath('/admin/works');
    return { ok: true};
}

export async function deleteVideoById(id: number) {
    await prisma.video.delete({
      where: { id: id },
    });
    revalidatePath('/admin/works');
    return { ok: true};
}
