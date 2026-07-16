"use client";

import {useState} from "react";
import {supabase} from "@/lib/supabase";
import {useRouter} from "next/navigation";


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

alert(error.message);

}
else{

router.push("/dashboard");

}


}


return(

<div className="p-10">

<h1 className="text-3xl font-bold">
Connexion
</h1>


<input

className="border p-2 block mt-5"

placeholder="Email"

onChange={(e)=>setEmail(e.target.value)}

/>


<input

className="border p-2 block mt-3"

placeholder="Mot de passe"

type="password"

onChange={(e)=>setPassword(e.target.value)}

/>


<button

className="bg-black text-white p-3 mt-5"

onClick={login}

>

Se connecter

</button>


</div>

)

}
