export default function Home(){

return (

<main className="min-h-screen flex items-center justify-center">

<div className="text-center">

<h1 className="text-5xl font-bold">
QR Card
</h1>

<p className="mt-4 text-gray-600">
Crée ta carte professionnelle numérique avec un QR Code
</p>

<a
href="/register"
className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-lg"
>
Créer ma carte
</a>

</div>

</main>

)

}