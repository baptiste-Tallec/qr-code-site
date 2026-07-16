"use client";

import {useState} from "react";
import {supabase} from "@/lib/supabase";


export default function Register(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");


async function register(){

const {data,error}=await supabase.auth.signUp({

email,
password

});


if(error){
alert(error.message)
}
else{

alert("Compte créé")

}

}


return(

<div className="p-10">

<h1 className="text-3xl font-bold">
Créer un compte
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

onClick={register}

>

Créer mon compte

</button>


</div>


)


}