"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";


export default function Dashboard(){


const [cards,setCards] = useState([]);

const [loading,setLoading] = useState(true);





useEffect(()=>{


loadCards();


},[]);






async function loadCards(){


const {

data:{user}

}=await supabase.auth.getUser();




if(!user){

setLoading(false);

return;

}






const {data,error}=await supabase

.from("digital_cards")

.select("*")

.eq("user_id",user.id)

.order("created_at",{ascending:false});





if(error){

console.log(error);

}

else{

setCards(data || []);

}




setLoading(false);


}







if(loading){

return (

<div className="text-white">

Chargement...

</div>

)

}






return (

<div>


<div className="mb-10">


<h1 className="text-4xl font-bold text-white">

Mon Dashboard

</h1>


<p className="text-gray-400 mt-2">

Gérez vos cartes professionnelles.

</p>


</div>








{

cards.length === 0 ?


(

<div className="
bg-[#111827]
border
border-gray-800
rounded-3xl
p-8
text-center
">


<p className="text-gray-400 mb-5">

Vous n'avez encore aucune carte.

</p>




<Link

href="/dashboard/create"

className="
bg-blue-600
px-5
py-3
rounded-xl
text-white
"

>

Créer ma première carte

</Link>


</div>

)


:

(


<div className="grid md:grid-cols-2 gap-6">


{

cards.map((card)=>(


<div

key={card.id}

className="
bg-[#111827]
border
border-gray-800
rounded-3xl
p-6
"

>


<h2 className="text-xl text-white font-bold">

{card.first_name} {card.last_name}

</h2>



<p className="text-gray-400 mt-2">

{card.job_title}

</p>



<p className="text-gray-400">

{card.company}

</p>





<div className="mt-5 flex gap-3">



<Link

href={`/dashboard/card/${card.id}`}

target="_blank"

className="
bg-blue-600
px-4
py-2
rounded-xl
text-white
"

>

Voir

</Link>





<Link

href={`/dashboard/edit/${card.id}`}

className="
bg-gray-700
px-4
py-2
rounded-xl
text-white
"

>

Modifier

</Link>




</div>




</div>


))


}


</div>


)

}


</div>

);


}