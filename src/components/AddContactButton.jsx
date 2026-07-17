"use client";


import { UserPlus } from "lucide-react";



export default function AddContactButton({card}){


function downloadContact(){


const vcard = 
`
BEGIN:VCARD
VERSION:3.0
FN:${card.first_name} ${card.last_name}
N:${card.last_name};${card.first_name}

ORG:${card.company || ""}

TITLE:${card.job_title || ""}

TEL;TYPE=CELL:${card.phone || ""}

EMAIL:${card.email || ""}

URL:${card.website || ""}

NOTE:LinkedIn ${card.linkedin || ""}

END:VCARD
`;





const blob = new Blob(

[vcard],

{

type:"text/vcard"

}

);





const url = URL.createObjectURL(blob);





const link = document.createElement("a");


link.href=url;


link.download = 

`${card.first_name}-${card.last_name}.vcf`;



document.body.appendChild(link);


link.click();


document.body.removeChild(link);



URL.revokeObjectURL(url);



}







return (


<button

onClick={downloadContact}

className="
w-full
mt-5
bg-black
text-white
rounded-xl
p-3
font-semibold
flex
items-center
justify-center
gap-2
hover:opacity-80
transition
"

>


<UserPlus size={20}/>


Ajouter aux contacts


</button>


);


}