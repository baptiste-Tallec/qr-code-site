"use client";


import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import CardQRCode from "@/components/CardQRCode";
import AddContactButton from "@/components/AddContactButton";



export default function DashboardCard(){


const params = useParams();

const id = params.id;


const [card,setCard]=useState(null);

const cardRef = useRef(null);






useEffect(()=>{

loadCard();

},[]);







async function loadCard(){


const {data,error}=await supabase

.from("digital_cards")

.select("*")

.eq("id",id)

.single();




if(error){

console.log(error);

return;

}



setCard(data);


}










async function downloadCard(){


if(!cardRef.current)return;


const image = await toPng(cardRef.current,{

cacheBust:true

});



const link=document.createElement("a");


link.download=

`${card.first_name}-${card.last_name}-card.png`;


link.href=image;


link.click();


}









if(!card){

return(

<div className="text-white">

Chargement...

</div>

)

}









let cardStyle="";



if(card.template==="minimal"){


cardStyle=`

background:white;

color:black;

`;

}


else if(card.template==="gradient"){


cardStyle=`

background:linear-gradient(
135deg,
${card.theme_color},
#111827
);

color:white;

`;

}


else{


cardStyle=`

background:#111827;

color:white;

`;

}









return (


<div className="
min-h-screen
bg-[#0B0F19]
flex
items-center
justify-center
p-6
">







<div className="w-full max-w-sm">








<div

ref={cardRef}

style={{

background:

card.template==="gradient"

?

`linear-gradient(135deg, ${card.theme_color}, #111827)`

:

card.template==="minimal"

?

"white"

:

"#111827"

}}

className="
rounded-[32px]
p-8
shadow-2xl
text-center
border
border-white/10
"

>









{
card.company_logo &&

<img

src={card.company_logo}

className="
w-16
h-16
object-contain
mx-auto
mb-5
"

/>

}











{
card.photo_url ?

<img

src={card.photo_url}

className="
w-32
h-32
rounded-full
object-cover
mx-auto
border-4
border-white/20
"

/>


:

<div

className="
w-32
h-32
rounded-full
bg-gray-300
mx-auto
flex
items-center
justify-center
text-5xl
"

>

👤

</div>


}











<h1

className={

card.template==="minimal"

?

"text-3xl font-bold mt-6 text-black"

:

"text-3xl font-bold mt-6 text-white"

}

>


{card.first_name}

{" "}

{card.last_name}


</h1>









<p

className={

card.template==="minimal"

?

"text-gray-500 mt-2"

:

"text-gray-300 mt-2"

}

>

{card.job_title}

</p>











<p

className="font-semibold mt-4"

style={{

color:

card.template==="minimal"

?

card.theme_color

:

card.theme_color

}}

>

{card.company}

</p>









<div className="mt-8 space-y-3">





{

card.phone &&

<a

href={`tel:${card.phone}`}

className="

block

rounded-xl

p-3

font-semibold

"

style={{

backgroundColor:

card.theme_color,

color:"white"

}}

>

📞 Téléphone

</a>


}




{

card.website &&

<a

href={

card.website.startsWith("http")

?

card.website

:

`https://${card.website}`

}

target="_blank"

className="

block

rounded-xl

p-3

font-semibold

"

style={{

backgroundColor:

card.theme_color,

color:"white"

}}

>

🌐 Site entreprise

</a>


}




{

card.email &&

<a

href={`mailto:${card.email}`}

className="

block

rounded-xl

p-3

font-semibold

"

style={{

backgroundColor:

card.theme_color,

color:"white"

}}

>

✉ Email

</a>


}









{

card.linkedin &&


<a

href={card.linkedin}

target="_blank"

className="

block

rounded-xl

p-3

font-semibold

"

style={{

backgroundColor:"#2563eb",

color:"white"

}}

>

🔗 LinkedIn

</a>


}





</div>



<AddContactButton

card={card}

/>









<div className="
mt-8
bg-white
rounded-3xl
p-4
inline-block
">


<CardQRCode

url={`${window.location.origin}/card/${card.slug}`}

/>


</div>







<p className="
text-xs
opacity-60
mt-4
">

Scanner pour enregistrer le contact

</p>










</div>









<button

onClick={downloadCard}

className="
mt-6
w-full
bg-blue-600
hover:bg-blue-500
text-white
p-4
rounded-xl
font-semibold
flex
justify-center
items-center
gap-2
"

>


<Download size={20}/>


Télécharger ma carte


</button>









</div>



</div>


)



}