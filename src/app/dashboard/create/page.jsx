"use client";

import { Save, Upload } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function CreateCard(){

const router = useRouter();


const [card,setCard] = useState({

first_name:"",
last_name:"",
job:"",
company:"",
email:"",
linkedin:"",
photo:"",
photo_url:"",
slug:"",
theme_color:"#2563eb"

});




function update(field,value){

setCard(prev=>({

...prev,

[field]:value

}));

}






async function uploadPhoto(file){


const {

data:{user}

}=await supabase.auth.getUser();



if(!user) return null;




const extension=file.name.split(".").pop();


const fileName=

`${user.id}/${Date.now()}.${extension}`;





const {error}=await supabase.storage

.from("card-images")

.upload(fileName,file);





if(error){

console.log(error);

return null;

}





const {data}=supabase.storage

.from("card-images")

.getPublicUrl(fileName);



return data.publicUrl;


}







async function handlePhoto(e){


const file=e.target.files[0];


if(!file)return;




setCard(prev=>({

...prev,

photo:URL.createObjectURL(file)

}));




const url = await uploadPhoto(file);



if(url){

setCard(prev=>({

...prev,

photo_url:url

}));

}


}








async function saveCard(){


const {

data:{user}

}=await supabase.auth.getUser();





if(!user){

alert("Connexion nécessaire");

return;

}





const slug =

`${card.first_name}-${card.last_name}-${Date.now()}`

.toLowerCase()

.replaceAll(" ","-");








const {error}=await supabase

.from("digital_cards")

.insert({

user_id:user.id,

first_name:card.first_name,

last_name:card.last_name,

job_title:card.job,

company:card.company,

email:card.email,

linkedin:card.linkedin,

photo_url:card.photo_url,

theme_color:card.theme_color,

slug:slug

});






if(error){

alert(error.message);

return;

}





router.push(`/card/${slug}`);


}







const cardUrl = card.slug

?

`${window.location.origin}/card/${card.slug}`

:

"";








return (

<div>


<h1 className="
text-4xl
font-bold
text-white
mb-10
">

Créer ma QR Card

</h1>





<div className="
grid
lg:grid-cols-2
gap-8
">






<div className="
bg-[#111827]
border
border-gray-800
rounded-3xl
p-8
space-y-5
">








<label className="
flex
items-center
gap-3
bg-[#0B0F19]
border
border-gray-700
rounded-xl
p-3
text-white
cursor-pointer
">

<Upload size={18}/>

Ajouter une photo


<input

type="file"

accept="image/*"

className="hidden"

onChange={handlePhoto}

/>


</label>








<input

className="input-style"

placeholder="Prénom"

value={card.first_name}

onChange={(e)=>update("first_name",e.target.value)}

/>






<input

className="input-style"

placeholder="Nom"

value={card.last_name}

onChange={(e)=>update("last_name",e.target.value)}

/>







<input

className="input-style"

placeholder="Poste"

value={card.job}

onChange={(e)=>update("job",e.target.value)}

/>







<input

className="input-style"

placeholder="Entreprise"

value={card.company}

onChange={(e)=>update("company",e.target.value)}

/>







<input

className="input-style"

placeholder="Email"

value={card.email}

onChange={(e)=>update("email",e.target.value)}

/>







<input

className="input-style"

placeholder="LinkedIn"

value={card.linkedin}

onChange={(e)=>update("linkedin",e.target.value)}

/>







<div className="text-white">

<p className="mb-2">

Couleur de la carte

</p>


<input

type="color"

value={card.theme_color}

onChange={(e)=>update("theme_color",e.target.value)}

className="
w-16
h-10
rounded
cursor-pointer
"

/>


</div>









<button

onClick={saveCard}

className="
w-full
bg-blue-600
hover:bg-blue-500
rounded-xl
p-4
text-white
font-semibold
flex
justify-center
gap-2
"

>

<Save size={20}/>

Créer ma carte

</button>






</div>












<div className="
bg-[#111827]
border
border-gray-800
rounded-3xl
p-8
flex
justify-center
items-center
">








<div

style={{

borderTop:`8px solid ${card.theme_color}`

}}

className="
bg-white
rounded-3xl
p-8
text-center
text-black
w-full
max-w-sm
"

>






{

card.photo ?

<img

src={card.photo}

className="
w-24
h-24
rounded-full
mx-auto
object-cover
"

/>

:

<div className="
w-24
h-24
rounded-full
bg-gray-200
mx-auto
flex
items-center
justify-center
text-4xl
">

👤

</div>

}





<h2 className="text-2xl font-bold mt-5">

{card.first_name || "Votre prénom"}

{" "}

{card.last_name}

</h2>





<p className="text-gray-500">

{card.job || "Votre poste"}

</p>






<p className="font-semibold mt-3">

{card.company || "Entreprise"}

</p>






<button

style={{

backgroundColor:card.theme_color

}}

className="
mt-6
w-full
text-white
rounded-xl
p-3
"

>

✉ Email

</button>








<QRCodeCanvas

value={

`${typeof window !== "undefined" ? window.location.origin : ""}/card/${card.slug || "preview"}`

}

size={150}

/>







</div>





</div>







</div>


</div>


);


}