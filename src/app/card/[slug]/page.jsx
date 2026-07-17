import { supabase } from "@/lib/supabase";
import CardQRCode from "@/components/CardQRCode";
import AddContactButton from "@/components/AddContactButton";
import ShareCardButton from "@/components/ShareCardButton";



export default async function PublicCard({params}){


const {slug} = await params;




const {data:card,error}=await supabase

.from("digital_cards")

.select("*")

.eq("slug", slug)

.maybeSingle();




console.log("Slug reçu :", slug);

console.log("Carte trouvée :", card);

console.log("Erreur :", error);







if(error || !card){


return (

<div

className="
min-h-screen
bg-[#0B0F19]
flex
items-center
justify-center
text-white
"

>

<h1 className="text-3xl font-bold">

Carte introuvable

</h1>


</div>

);


}








function formatLink(link){

if(!link) return "";

return link.startsWith("http")

?

link

:

`https://${link}`;

}








return (


<div

className="
min-h-screen
bg-[#0B0F19]
flex
items-center
justify-center
p-6
"

>









<div

style={{

borderTop:
`10px solid ${card.theme_color || "#2563eb"}`

}}


className="
bg-white
rounded-3xl
shadow-2xl
p-8
max-w-sm
w-full
text-center
text-black
"

>









{/* LOGO ENTREPRISE */}


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










{/* PHOTO */}



<div

className="
w-28
h-28
rounded-full
bg-gray-200
mx-auto
overflow-hidden
flex
items-center
justify-center
"

>


{

card.photo_url ?


<img

src={card.photo_url}

className="
w-full
h-full
object-cover
"

/>


:

<span className="text-5xl">

👤

</span>


}


</div>









{/* NOM */}


<h1 className="text-3xl font-bold mt-6">


{card.first_name}

{" "}

{card.last_name}


</h1>









{/* POSTE */}


<p className="text-gray-500 mt-3">


{card.job_title}


</p>









{/* ENTREPRISE */}


<p className="font-semibold mt-4">


{card.company}


</p>









{/* LIENS */}



<div className="mt-8 space-y-3">







{/* TELEPHONE */}


{

card.phone &&


<a

href={`tel:${card.phone}`}


style={{

backgroundColor:
card.theme_color || "#2563eb"

}}


className="
block
text-white
rounded-xl
p-3
font-semibold
"

>

📞 Téléphone

</a>


}









{/* EMAIL */}


{

card.email &&


<a

href={`mailto:${card.email}`}


style={{

backgroundColor:
card.theme_color || "#2563eb"

}}


className="
block
text-white
rounded-xl
p-3
font-semibold
"

>

✉ Email

</a>


}









{/* LINKEDIN */}


{

card.linkedin &&


<a

href={formatLink(card.linkedin)}

target="_blank"


style={{

backgroundColor:
card.theme_color || "#2563eb"

}}


className="
block
text-white
rounded-xl
p-3
font-semibold
"

>

🔗 LinkedIn

</a>


}









{/* SITE ENTREPRISE */}



{

card.website &&


<a

href={formatLink(card.website)}

target="_blank"


style={{

backgroundColor:
card.theme_color || "#2563eb"

}}


className="
block
text-white
rounded-xl
p-3
font-semibold
"

>

🌐 Site entreprise

</a>


}







</div>










{/* AJOUT CONTACT */}



<AddContactButton

card={card}

/>



<ShareCardButton

card={card}

/>









{/* QR CODE */}



<div className="mt-6">


<CardQRCode

url={`${
process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}/card/${card.slug}`}

/>


</div>







</div>








</div>


);


}