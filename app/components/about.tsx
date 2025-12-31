import {Contact} from "./contact";

interface AboutPageProps {
  cv: string;
  portfolio: string;
  email: string;
  tel: string;
}

export function AboutPage({cv, portfolio, email, tel}: AboutPageProps) {


  return(
    <div className="flex flex-col lg:flex-row gap-2 relative" >
      <a href={cv} target="_blank">CV</a>
      <a href={portfolio} target="_blank">Portfolio</a>
      <Contact email={email} tel={tel}/>
    </div>

  );
}
