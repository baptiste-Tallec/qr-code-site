"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { Save, Trash2, Upload } from "lucide-react";


export default function EditCard(){


const params = useParams();

const router = useRouter();

const id = params.id;



const [card,setCard] = useState(null);

const [preview,setPreview] = useState("");






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

}








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




const url = await uploadPhoto(file);




if(url){


setCard(prev=>({

...prev,

photo_url:url

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

email:card.email,

linkedin:card.linkedin,

photo_url:card.photo_url

})

.eq("id",id);






if(error){

alert(error.message);

return;

}





alert("Carte modifiée");


router.push("/dashboard");


}








async function deleteCard(){



const confirmDelete = confirm(

"Supprimer définitivement cette carte ?"

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





alert("Carte supprimée");


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
mb-8
">

Modifier ma carte

</h1>








<div className="
bg-[#111827]
border
border-gray-800
rounded-3xl
p-8
max-w-xl
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

Changer la photo


<input

type="file"

accept="image/*"

className="hidden"

onChange={handlePhoto}

/>


</label>








{

preview &&

<img

src={preview}

className="
w-28
h-28
rounded-full
object-cover
"

/>

}








<input

className="input-style"

value={card.first_name || ""}

onChange={(e)=>update("first_name",e.target.value)}

placeholder="Prénom"

/>







<input

className="input-style"

value={card.last_name || ""}

onChange={(e)=>update("last_name",e.target.value)}

placeholder="Nom"

/>







<input

className="input-style"

value={card.job_title || ""}

onChange={(e)=>update("job_title",e.target.value)}

placeholder="Poste"

/>







<input

className="input-style"

value={card.company || ""}

onChange={(e)=>update("company",e.target.value)}

placeholder="Entreprise"

/>







<input

className="input-style"

value={card.email || ""}

onChange={(e)=>update("email",e.target.value)}

placeholder="Email"

/>







<input

className="input-style"

value={card.linkedin || ""}

onChange={(e)=>update("linkedin",e.target.value)}

placeholder="LinkedIn"

/>









<button

onClick={save}

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
items-center
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
hover:bg-red-500
rounded-xl
p-4
text-white
font-semibold
flex
justify-center
items-center
gap-2
"

>

<Trash2 size={20}/>

Supprimer la carte

</button>







</div>


</div>


);


}