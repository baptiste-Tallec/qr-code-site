"use client";


import { useState } from "react";
import { Share2 } from "lucide-react";


export default function ShareCardButton({card}){


const [copied,setCopied] = useState(false);




async function handleShare(){


const url = `${window.location.origin}/card/${card.slug}`;


const shareData = {

title:`La carte de ${card.first_name} ${card.last_name}`,

text:`${card.first_name} ${card.last_name} - ${card.job_title} chez ${card.company}`,

url

};



if(navigator.share){


try{

await navigator.share(shareData);

}catch(err){

// utilisateur a annulé le partage, rien à faire

}


}else{


await navigator.clipboard.writeText(url);


setCopied(true);


setTimeout(()=>setCopied(false),2000);


}


}




return (


<div>


<button

onClick={handleShare}


style={{

backgroundColor:

card.theme_color || "#2563eb"

}}


className="
w-full
mt-3
text-white
rounded-xl
p-3
font-semibold
flex
items-center
justify-center
gap-2
"

>


<Share2 size={18}/>


Partager ma carte


</button>



{

copied &&

<p className="text-sm text-green-600 mt-2">

Lien copié !

</p>

}


</div>


);


}
