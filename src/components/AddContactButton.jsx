"use client";


export default function AddContactButton({card}){


function downloadContact(){


const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${card.first_name} ${card.last_name}
N:${card.last_name};${card.first_name};;;
ORG:${card.company || ""}
TITLE:${card.job_title || ""}
EMAIL:${card.email || ""}
URL:${card.linkedin || ""}
END:VCARD`;





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

`${card.first_name}_${card.last_name}.vcf`;



document.body.appendChild(link);


link.click();


document.body.removeChild(link);



URL.revokeObjectURL(url);



}





return (

<button

onClick={downloadContact}



style={{

backgroundColor:
card.theme_color || "#2563eb"

}}



className="
block
w-full
text-white
rounded-xl
p-3
font-semibold
mt-3
"

>

📇 Ajouter aux contacts

</button>

);


}