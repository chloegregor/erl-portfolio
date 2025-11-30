
import {getAllWorks} from "@/app/actions/works";
import {IndexWorks} from "../components/indexWorks";
import {CreateForm} from "../components/createForm";


export default async function AdminPage() {
  const works = await getAllWorks();

  return (
  <div className="h-full flex flex-col gap-8">
    <div className=" text-center">
      <h1>Admin Page</h1>
    </div>
    <div className="flex flex-col h-full">
      <div className=" w-full h-[3em]">
        <CreateForm />
      </div>
      <div className="">
        <IndexWorks works={works} />
      </div>
    </div>

  </div>
  );
}
