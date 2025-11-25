import Image from "next/image";
import prisma  from "@/lib/prisma";



export default async function Home() {
  const works = await prisma.work.findMany({include: {photos: true}});

  return (
    <div>
      <h1>My Works</h1>
     { works.map((work) => (
        <div key={work.id}>
          <h2>{work.title}</h2>
          <p>{work.description}</p>
          {work.photos.length > 0 &&
            work.photos.map((photo) => (
              <Image key={photo.id} src={photo.url} alt={work.title} width={300} height={200} />
            ))
          }
        </div>
      ))
    }
    </div>
  );
}
