"use client";

import { QRCodeCanvas } from "qrcode.react";


export default function CardPreview({card}){


if(!card) return null;




return (

<div className="
bg-black
rounded-[45px]
p-4
shadow-2xl
border
border-gray-700
w-[320px]
">


<div

className="
rounded-[35px]
p-5
min-h-[650px]
flex
items-center
justify-center
"

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

>



<div className="w-full text-center">






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

card.photo_url

?

<img

src={card.photo_url}

className="
w-28
h-28
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
w-28
h-28
rounded-full
bg-white/20
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

"text-black text-2xl font-bold mt-5"

:

"text-white text-2xl font-bold mt-5"

}

>

{card.first_name || "Votre prénom"}

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

{card.job_title || "Votre poste"}

</p>








<p

className="font-semibold mt-3"

style={{

color:card.theme_color

}}

>

{card.company || "Entreprise"}

</p>








<div className="
mt-6
space-y-2
">






{

card.phone &&

<a

href={`tel:${card.phone}`}

className="
block
bg-green-600
text-white
rounded-xl
p-2
text-sm
"

>

📞 {card.phone}

</a>

}





{

card.email &&

<a

href={`mailto:${card.email}`}

className="
block
bg-black
text-white
rounded-xl
p-2
text-sm
"

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
bg-blue-600
text-white
rounded-xl
p-2
text-sm
"

>

🔗 LinkedIn

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
bg-purple-600
text-white
rounded-xl
p-2
text-sm
"

>

🌐 Site entreprise

</a>

}



</div>









<div className="
mt-6
bg-white
rounded-3xl
p-3
inline-block
">


<QRCodeCanvas

value={

card.slug

?

`${window.location.origin}/card/${card.slug}`

:

"preview"

}

size={130}

/>


</div>






<p className="
text-xs
opacity-60
mt-4
">

Scanner pour enregistrer

</p>





</div>


</div>


</div>


)

}