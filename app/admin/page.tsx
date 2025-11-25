
import prisma from "@/lib/prisma";
import {IndexWorks} from "../components/indexWorks";
import {CreateForm} from "../components/createForm";


export default async function AdminPage() {
  const works = await prisma.work.findMany({include: {photos: true, videos: true}});
  

  return (
    <>
      <div>
        <h1>Admin Page</h1>
      </div>
        <CreateForm />
      <div>
        <IndexWorks works={works} />
      </div>

    </>
  );
}
