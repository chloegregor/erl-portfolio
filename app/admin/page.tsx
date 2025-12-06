
import {getAllWorks} from "@/app/actions/works";
import {IndexWorks} from "../components/indexWorks";
import {CreateForm} from "../components/createForm";


export default async function AdminPage() {
  const works = await getAllWorks();

  return (
  <div className="p-5">
    <div className="mb-10 ">
      <h1>Coucou Elo</h1>
    </div>
    <div className="">
      <div className=" h-10">
        <CreateForm />
      </div>
      <div className="">
        <IndexWorks works={works} />
      </div>
    </div>

  </div>
  );
}
