'use client';

import {useState} from "react";


export function Contact({ email, tel}) {

  const [isClicked, setIsClicked] = useState(false);
  const startEmail = email.slice(0, (email.indexOf("@")));
  const endEmail = email.slice(email.indexOf("@")+1);
  console.log(startEmail, endEmail);

  return (
    <div>
    <button className='cursor-pointer ' onClick={()=> setIsClicked(!isClicked)}>
      Contact
    </button>
    {isClicked && (
      <div className=" flex gap-2 absolute right-0">
        <p>{startEmail}@{endEmail}</p>
        <p>{tel}</p>
      </div>
    )}
    </div>
  );
}
