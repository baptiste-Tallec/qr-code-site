"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { Save, Trash2, Upload, Eye } from "lucide-react";
import CardPreview from "@/components/CardPreview";


export default function EditCard(){


const params = useParams();

const router = useRouter();

const id = params.id;



const [card,setCard] = useState(null);

const [preview,setPreview] = useState("");

const [logoPreview,setLogoPreview] = useState("");







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

setPreview(data.photo_url || "");

setLogoPreview(data.company_logo || "");


}







function update(field,value){

setCard(prev=>({

...prev,

[field]:value

}));

}








async function uploadFile(file){


const {

data:{user}

}=await supabase.auth.getUser();



if(!user)return null;





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




setPreview(URL.createObjectURL(file));



const url=await uploadFile(file);



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




setLogoPreview(URL.createObjectURL(file));



const url=await uploadFile(file);



if(url){

setCard(prev=>({

...prev,

company_logo:url

}));

}


}










async function save(){



const {error}=await supabase

.from("digital_cards")

.update({


first_name:card.first_name,

last_name:card.last_name,

job_title:card.job_title,

company:card.company,


phone:card.phone,

email:card.email,

linkedin:card.linkedin,

website:card.website,


photo_url:card.photo_url,

company_logo:card.company_logo,


template:card.template,

theme_color:card.theme_color


})

.eq("id",id);







if(error){

alert(error.message);

return;

}




alert("Carte sauvegardée");


router.push("/dashboard");

router.refresh();


}










async function deleteCard(){


const confirmDelete = confirm(

"Supprimer cette carte ?"

);



if(!confirmDelete)return;





const {error}=await supabase

.from("digital_cards")

.delete()

.eq("id",id);





if(error){

alert(error.message);

return;

}



router.push("/dashboard");


}








if(!card){


return (

<div className="text-white">

Chargement...

</div>

)

}








return (


<div>


<h1 className="
text-4xl
font-bold
text-white
mb-10
">

Modifier ma carte

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
gap-3
items-center
bg-[#0B0F19]
border
border-gray-700
rounded-xl
p-3
text-white
cursor-pointer
">


<Upload size={18}/>

Changer photo


<input

type="file"

accept="image/*"

className="hidden"

onChange={handlePhoto}

/>


</label>





<label className="
flex
gap-3
items-center
bg-[#0B0F19]
border
border-gray-700
rounded-xl
p-3
text-white
cursor-pointer
">


<Upload size={18}/>

Changer logo


<input

type="file"

accept="image/*"

className="hidden"

onChange={handleLogo}

/>


</label>









<input

className="input-style"

value={card.first_name || ""}

placeholder="Prénom"

onChange={(e)=>update("first_name",e.target.value)}

/>






<input

className="input-style"

value={card.last_name || ""}

placeholder="Nom"

onChange={(e)=>update("last_name",e.target.value)}

/>







<input

className="input-style"

value={card.job_title || ""}

placeholder="Poste"

onChange={(e)=>update("job_title",e.target.value)}

/>







<input

className="input-style"

value={card.company || ""}

placeholder="Entreprise"

onChange={(e)=>update("company",e.target.value)}

/>







<input

className="input-style"

value={card.phone || ""}

placeholder="Téléphone"

onChange={(e)=>update("phone",e.target.value)}

/>







<input

className="input-style"

value={card.email || ""}

placeholder="Email"

onChange={(e)=>update("email",e.target.value)}

/>







<input

className="input-style"

value={card.linkedin || ""}

placeholder="LinkedIn"

onChange={(e)=>update("linkedin",e.target.value)}

/>







<input

className="input-style"

value={card.website || ""}

placeholder="Site entreprise"

onChange={(e)=>update("website",e.target.value)}

/>









<select

className="input-style"

value={card.template || "premium"}

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









<input

type="color"

value={card.theme_color || "#2563eb"}

onChange={(e)=>update("theme_color",e.target.value)}

/>










<button

onClick={save}

className="
w-full
bg-blue-600
p-4
rounded-xl
text-white
font-semibold
flex
justify-center
gap-2
"

>

<Save size={20}/>

Sauvegarder

</button>










<button

onClick={deleteCard}

className="
w-full
bg-red-600
p-4
rounded-xl
text-white
font-semibold
flex
justify-center
gap-2
"

>


<Trash2 size={20}/>


Supprimer


</button>










<button

onClick={()=>router.push(`/card/${card.slug}`)}

className="
w-full
bg-gray-700
p-4
rounded-xl
text-white
font-semibold
flex
justify-center
gap-2
"

>

<Eye size={20}/>

Voir la carte

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

photo_url:card.photo_url,

company_logo:card.company_logo

}}

/>


</div>








</div>



</div>


)

}
