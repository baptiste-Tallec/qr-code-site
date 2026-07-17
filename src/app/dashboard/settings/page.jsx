"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  User,
  Shield,
  LogOut,
  Save,
  Settings
} from "lucide-react";
import { useRouter } from "next/navigation";


export default function SettingsPage(){


const router = useRouter();


const [user,setUser] = useState(null);

const [password,setPassword] = useState("");

const [confirmPassword,setConfirmPassword] = useState("");

const [loading,setLoading] = useState(true);


const [template,setTemplate] = useState("premium");

const [color,setColor] = useState("#2563eb");

const [language,setLanguage] = useState("fr");




useEffect(()=>{

loadUser();

},[]);





async function loadUser(){


const {
data:{user}
}=await supabase.auth.getUser();



if(user){

setUser(user);


const prefs = user.user_metadata || {};


if(prefs.default_template) setTemplate(prefs.default_template);

if(prefs.primary_color) setColor(prefs.primary_color);

if(prefs.language) setLanguage(prefs.language);

}


setLoading(false);


}







async function changePassword(){


if(!password){

alert("Entre un nouveau mot de passe");

return;

}



if(password !== confirmPassword){

alert("Les mots de passe ne correspondent pas");

return;

}





const {error}=await supabase.auth.updateUser({

password

});





if(error){

alert(error.message);

return;

}





alert("Mot de passe modifié avec succès");


setPassword("");

setConfirmPassword("");



}








async function savePreferences(){


const {error}=await supabase.auth.updateUser({

data:{

default_template:template,

primary_color:color,

language:language

}

});


if(error){

alert(error.message);

return;

}


alert("Préférences sauvegardées avec succès");


}




async function logout(){


await supabase.auth.signOut();


router.push("/login");


}







if(loading){


return(

<div className="text-white">

Chargement...

</div>

)

}








return (

<div className="max-w-4xl">


<h1 className="
text-4xl
font-bold
text-white
mb-3
">

Paramètres

</h1>


<p className="
text-gray-400
mb-10
">

Gérez votre compte et vos préférences.

</p>









{/* COMPTE */}


<div className="
bg-[#111827]
border
border-gray-800
rounded-3xl
p-8
mb-8
">


<div className="
flex
items-center
gap-3
mb-6
">


<User size={24}/>


<h2 className="
text-2xl
font-bold
text-white
">

Mon compte

</h2>


</div>





<div className="space-y-4">


<div>

<p className="text-gray-500">

Email

</p>


<p className="text-white">

{user?.email}

</p>


</div>






<div>

<p className="text-gray-500">

Compte créé

</p>


<p className="text-white">

{
new Date(user?.created_at)
.toLocaleDateString("fr-FR")
}

</p>


</div>



</div>


</div>









{/* SECURITE */}


<div className="
bg-[#111827]
border
border-gray-800
rounded-3xl
p-8
mb-8
">


<div className="
flex
items-center
gap-3
mb-6
">


<Shield size={24}/>


<h2 className="
text-2xl
font-bold
text-white
">

Sécurité

</h2>


</div>






<input

className="input-style mb-4"

type="password"

placeholder="Nouveau mot de passe"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>





<input

className="input-style mb-5"

type="password"

placeholder="Confirmer le mot de passe"

value={confirmPassword}

onChange={(e)=>setConfirmPassword(e.target.value)}

/>






<button

onClick={changePassword}

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


Changer le mot de passe


</button>



</div>









{/* PREFERENCES */}


<div className="
bg-[#111827]
border
border-gray-800
rounded-3xl
p-8
mb-8
">


<div className="
flex
items-center
gap-3
mb-6
">


<Settings size={24}/>


<h2 className="
text-2xl
font-bold
text-white
">

Préférences

</h2>


</div>







<div className="space-y-5">





<div>


<p className="text-gray-400 mb-2">

Template par défaut

</p>



<select

className="input-style"

value={template}

onChange={(e)=>setTemplate(e.target.value)}

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


</div>








<div>


<p className="text-gray-400 mb-2">

Couleur principale

</p>



<input

type="color"

value={color}

onChange={(e)=>setColor(e.target.value)}

className="
w-16
h-10
rounded
cursor-pointer
"

/>


</div>








<div>


<p className="text-gray-400 mb-2">

Langue

</p>



<select

className="input-style"

value={language}

onChange={(e)=>setLanguage(e.target.value)}

>


<option value="fr">

Français

</option>


<option value="en">

English

</option>


</select>


</div>







<button

onClick={savePreferences}

className="
w-full
bg-blue-600
hover:bg-blue-500
rounded-xl
p-4
text-white
font-semibold
"

>

Sauvegarder les préférences

</button>





</div>


</div>









{/* DECONNEXION */}


<div className="
bg-[#111827]
border
border-red-900
rounded-3xl
p-8
">


<h2 className="
text-2xl
font-bold
text-white
mb-4
">

Déconnexion

</h2>





<button

onClick={logout}

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


<LogOut size={20}/>


Se déconnecter


</button>



</div>







</div>


);


}