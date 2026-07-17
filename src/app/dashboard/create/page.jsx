"use client";

import { Save, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import CardPreview from "@/components/CardPreview";


export default function CreateCard(){


const router = useRouter();



const [card,setCard] = useState({

first_name:"",
last_name:"",
job:"",
company:"",
email:"",
phone:"",
linkedin:"",
website:"",

photo:"",
photo_url:"",

company_logo:"",
logo_preview:"",

template:"premium",

theme_color:"#2563eb",

slug:""

});





// CHARGE LES PREFERENCES UTILISATEUR

useEffect(()=>{

loadPreferences();

},[]);






async function loadPreferences(){


const {

data:{user}

}=await supabase.auth.getUser();



if(user){


const prefs = user.user_metadata || {};



setCard(prev=>({

...prev,


template:
prefs.default_template || prev.template,


theme_color:
prefs.primary_color || prev.theme_color


}));


}



}








function update(field,value){

setCard(prev=>({

...prev,

[field]:value

}));

}









async function uploadFile(file,bucket){


const {

data:{user}

}=await supabase.auth.getUser();



if(!user)return null;




const extension=file.name.split(".").pop();



const fileName=

`${user.id}/${Date.now()}.${extension}`;





const {error}=await supabase.storage

.from(bucket)

.upload(fileName,file);




if(error){

console.log(error);

return null;

}





const {data}=supabase.storage

.from(bucket)

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



const url=await uploadFile(file,"card-images");


if(url){

setCard(prev=>({

...prev,

photo_url:url

}));

}


}









async function handleLogo(e){

const file=e.target.files[0];


if(!file)return;



setCard(prev=>({

...prev,

logo_preview:URL.createObjectURL(file)

}));




const url=await uploadFile(file,"card-images");


if(url){

setCard(prev=>({

...prev,

company_logo:url

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

phone:card.phone,

linkedin:card.linkedin,

website:card.website,


photo_url:card.photo_url,

company_logo:card.company_logo,


template:card.template,

theme_color:card.theme_color,


slug:slug

});







if(error){

alert(error.message);

return;

}



alert("Carte créée avec succès !");


router.push("/dashboard");

router.refresh();


}









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
gap-10
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


Logo entreprise


<input

type="file"

accept="image/*"

className="hidden"

onChange={handleLogo}

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

placeholder="Téléphone"

value={card.phone}

onChange={(e)=>update("phone",e.target.value)}

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







<input

className="input-style"

placeholder="Site entreprise"

value={card.website}

onChange={(e)=>update("website",e.target.value)}

/>









<select

className="input-style"

value={card.template}

onChange={(e)=>update("template",e.target.value)}

>


<option value="premium">

Premium Dark

</option>


<option value="minimal">

Minimal

</option>


<option value="gradient">

Gradient

</option>


</select>









<div className="text-white">


<p>Couleur</p>



<input

type="color"

value={card.theme_color}

onChange={(e)=>update("theme_color",e.target.value)}

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
flex
justify-center
items-start
">


<CardPreview

card={{

...card,

job_title:card.job,

photo_url:card.photo_url,

company_logo:card.company_logo

}}

/>


</div>







</div>



</div>

)


}