"use client";

import {useState} from "react";
import {supabase} from "@/lib/supabase";
import {useRouter} from "next/navigation";
import {LogIn} from "lucide-react";


export default function Login(){


const router = useRouter();


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");





async function login(){


const {data,error}=await supabase.auth.signInWithPassword({

email,

password

});





if(error){


if(error.message.includes("Email not confirmed")){


alert(
"Ton email n'est pas encore confirmé. Vérifie ta boîte mail."
);


}

else{


alert(error.message);


}


return;


}




router.push("/dashboard");



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

Connexion

</h1>




<p className="
text-gray-400
mb-8
">

Accède à ta QR Card

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

onClick={login}

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

<LogIn size={20}/>

Se connecter

</button>







<button

onClick={()=>router.push("/register")}

className="
mt-5
text-gray-400
hover:text-white
w-full
"

>

Pas encore de compte ? Créer un compte

</button>






</div>



</div>


)


}