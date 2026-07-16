"use client";


import {useRouter} from "next/navigation";
import {
QrCode,
UserRound,
Palette,
Contact
} from "lucide-react";



export default function Home(){


const router = useRouter();





return(


<div className="

min-h-screen

bg-[#0B0F19]

text-white

">







{/* HERO */}



<section className="

max-w-6xl

mx-auto

px-6

py-24

">








<div className="

text-center

max-w-3xl

mx-auto

">





<h1 className="

text-5xl

md:text-6xl

font-bold

leading-tight

">


Votre carte professionnelle

<br/>


<span className="text-blue-500">

digitale avec QR Code

</span>



</h1>








<p className="

text-gray-400

text-lg

mt-6

">


Créez votre carte de visite numérique,
partagez vos informations instantanément
et restez connecté avec vos contacts.


</p>








<div className="

flex

justify-center

gap-4

mt-10

">






<button


onClick={()=>router.push("/register")}


className="

bg-blue-600

hover:bg-blue-500

px-8

py-4

rounded-xl

font-semibold

"


>


Créer ma carte


</button>







<button


onClick={()=>router.push("/login")}


className="

border

border-gray-700

hover:bg-gray-800

px-8

py-4

rounded-xl

font-semibold

"


>


Se connecter


</button>







</div>



</div>










{/* CARD PREVIEW */}



<div className="

mt-20

flex

justify-center

">





<div className="

bg-white

text-black

rounded-3xl

p-8

w-80

shadow-2xl

border-t-8

border-blue-600

">






<div className="

w-24

h-24

rounded-full

bg-gray-200

mx-auto

flex

items-center

justify-center

text-4xl

">


👤


</div>







<h2 className="

text-2xl

font-bold

text-center

mt-5

">


Jean Dupont


</h2>






<p className="

text-center

text-gray-500

">


Développeur Web


</p>







<p className="

text-center

font-semibold

mt-3

">


Entreprise


</p>






<div className="

mt-6

bg-blue-600

text-white

rounded-xl

p-3

text-center

">


QR CODE


</div>






</div>





</div>







</section>









{/* FEATURES */}



<section className="

max-w-6xl

mx-auto

px-6

pb-24

">





<div className="

grid

md:grid-cols-3

gap-6

">







<div className="

bg-[#111827]

border

border-gray-800

rounded-3xl

p-6

">

<QrCode size={35}/>


<h3 className="

text-xl

font-bold

mt-5

">


QR Code dynamique


</h3>


<p className="

text-gray-400

mt-3

">


Un seul QR Code pour partager votre profil.


</p>


</div>









<div className="

bg-[#111827]

border

border-gray-800

rounded-3xl

p-6

">


<UserRound size={35}/>


<h3 className="

text-xl

font-bold

mt-5

">


Profil professionnel


</h3>


<p className="

text-gray-400

mt-3

">


Nom, entreprise, email et réseaux sociaux.


</p>


</div>









<div className="

bg-[#111827]

border

border-gray-800

rounded-3xl

p-6

">


<Palette size={35}/>


<h3 className="

text-xl

font-bold

mt-5

">


Personnalisation


</h3>


<p className="

text-gray-400

mt-3

">


Adaptez votre carte à votre image.


</p>


</div>









</div>






</section>







</div>


)


}