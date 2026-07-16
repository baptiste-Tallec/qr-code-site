"use client";


import {useState} from "react";
import {supabase} from "@/lib/supabase";
import {useRouter} from "next/navigation";
import {UserPlus} from "lucide-react";



export default function Register(){


const router = useRouter();


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");







async function register(){



const {error}=await supabase.auth.signUp({


email,

password,


options:{


emailRedirectTo:

`${window.location.origin}/login`


}


});







if(error){


alert(error.message);

return;


}






alert(

"Compte créé ! Vérifie ton email puis connecte-toi."

);





router.push("/login");



}








return(


<div className="

min-h-screen

bg-[#0B0F19]

flex

items-center

justify-center

p-6

">








<div className="

bg-[#111827]

border

border-gray-800

rounded-3xl

p-8

w-full

max-w-md

shadow-xl

">







<h1 className="

text-4xl

font-bold

text-white

mb-3

">

Créer un compte

</h1>






<p className="

text-gray-400

mb-8

">

Crée ta carte digitale professionnelle

</p>









<input


className="input-style"


placeholder="Email"


value={email}


onChange={(e)=>setEmail(e.target.value)}


/>









<input


className="input-style mt-4"


placeholder="Mot de passe"


type="password"


value={password}


onChange={(e)=>setPassword(e.target.value)}


/>









<button


onClick={register}



className="

w-full

mt-6

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



<UserPlus size={20}/>


Créer mon compte



</button>









<button


onClick={()=>router.push("/login")}



className="

mt-5

text-gray-400

hover:text-white

w-full

"


>



Déjà un compte ? Se connecter



</button>









</div>






</div>



)


}