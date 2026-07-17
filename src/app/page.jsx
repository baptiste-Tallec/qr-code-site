"use client";


import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/LandingFooter";
import FeatureCard from "@/components/FeatureCard";
import {
  QrCode,
  Zap,
  Smartphone,
  Building2,
  ShieldCheck,
  UserRound,
  Palette,
  ArrowRight,
  Play,
  Phone,
  Mail,
  Sparkles
} from "lucide-react";


export default function Home(){


  const router = useRouter();


  return (

    <div className="min-h-screen bg-[#0B0F19] text-white font-sans overflow-x-hidden">

      <Navbar />


      {/* HERO */}

      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-16 items-center">

        <div
          className="absolute top-0 -left-40 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px]"
        />

        <div className="relative">

          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-semibold px-4 py-2 rounded-full">
            <Sparkles size={14}/>
            La carte de visite nouvelle génération
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mt-6">
            Votre carte de visite professionnelle,
            <br/>
            <span className="text-blue-500">toujours dans votre poche.</span>
          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-lg leading-relaxed">
            Créez une carte digitale avec QR code, partagez vos informations
            instantanément et permettez à vos clients de vous contacter en un
            clic.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">

            <button
              onClick={()=>router.push("/register")}
              className="group bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              Créer ma QR Card
              <ArrowRight size={18} className="group-hover:translate-x-1 transition"/>
            </button>

            <a
              href="#comment-ca-marche"
              className="border border-gray-700 hover:bg-white/5 transition px-8 py-4 rounded-xl font-semibold flex items-center gap-2"
            >
              <Play size={18}/>
              Voir une démonstration
            </a>

          </div>

          <div className="flex items-center gap-8 mt-12 text-sm text-gray-500">
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              digital &amp; sans contact
            </div>
            <div className="w-px h-10 bg-gray-800"/>
            <div>
              <p className="text-2xl font-bold text-white">1 scan</p>
              pour tout partager
            </div>
          </div>

        </div>


        {/* HERO CARD PREVIEW */}

        <div className="relative flex justify-center lg:justify-end">

          <div className="absolute w-80 h-80 bg-blue-600/25 rounded-full blur-[100px]"/>

          <div className="hero-float relative bg-[#111827] border border-white/10 rounded-[2rem] p-8 w-80 shadow-2xl">

            <div className="absolute inset-x-8 top-0 h-1 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"/>

            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xs font-bold">
                NS
              </div>
              <span className="text-xs text-gray-500">Carte digitale</span>
            </div>

            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 mx-auto mt-8 flex items-center justify-center text-3xl font-bold border-4 border-white/10">
              AM
            </div>

            <h2 className="text-xl font-bold text-center mt-5">
              Alexandre Martin
            </h2>

            <p className="text-center text-gray-400 text-sm mt-1">
              Directeur Commercial
            </p>

            <p className="text-center font-semibold text-blue-400 text-sm mt-2">
              Nova Studio
            </p>

            <div className="flex gap-3 mt-6">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-semibold">
                <Phone size={14}/>
                Appeler
              </div>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2.5 flex items-center justify-center gap-2 text-xs font-semibold">
                <Mail size={14}/>
                Email
              </div>
            </div>

            <div className="mt-6 bg-white rounded-2xl p-4 flex items-center justify-center">
              <QrCode size={110} className="text-black"/>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              Scanner pour enregistrer le contact
            </p>

          </div>

        </div>

      </section>


      {/* AVANTAGES */}

      <section id="fonctionnalites" className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold">
            Tout ce qu'il faut pour se démarquer
          </h2>
          <p className="text-gray-400 mt-4">
            Une carte professionnelle pensée pour la rapidité, la mobilité et
            la simplicité.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <FeatureCard
            icon={<Zap size={22}/>}
            title="Partage instantané"
            description="Un simple scan permet d'accéder à vos informations."
          />

          <FeatureCard
            icon={<Smartphone size={22}/>}
            title="Compatible mobile"
            description="Fonctionne sur iPhone et Android, sans application à installer."
          />

          <FeatureCard
            icon={<Building2 size={22}/>}
            title="Pour les entreprises"
            description="Gérez facilement les cartes de vos collaborateurs."
          />

          <FeatureCard
            icon={<ShieldCheck size={22}/>}
            title="Simple et sécurisé"
            description="Vos informations restent contrôlées, à tout moment."
          />

        </div>

      </section>


      {/* COMMENT CA MARCHE */}

      <section id="comment-ca-marche" className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold">
            Comment ça marche
          </h2>
          <p className="text-gray-400 mt-4">
            Trois étapes suffisent pour avoir votre carte prête à partager.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {[
            {
              number:"1",
              icon:<UserRound size={24}/>,
              title:"Créez votre profil",
              description:"Renseignez votre nom, poste, entreprise et coordonnées."
            },
            {
              number:"2",
              icon:<Palette size={24}/>,
              title:"Personnalisez votre carte",
              description:"Choisissez un template, une couleur et ajoutez votre logo."
            },
            {
              number:"3",
              icon:<QrCode size={24}/>,
              title:"Partagez votre QR code",
              description:"Vos contacts scannent et enregistrent vos informations en un clic."
            }
          ].map((step)=>(

            <div key={step.number} className="relative text-center bg-[#111827] border border-gray-800 rounded-3xl p-8">

              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-5">
                {step.icon}
              </div>

              <span className="text-blue-500 font-bold text-sm">
                Étape {step.number}
              </span>

              <h3 className="text-xl font-bold mt-2">
                {step.title}
              </h3>

              <p className="text-gray-400 mt-3 leading-relaxed">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* ENTREPRISE */}

      <section id="entreprises" className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <h2 className="text-4xl font-bold leading-tight">
            Une solution idéale pour vos équipes
          </h2>

          <p className="text-gray-400 mt-6 leading-relaxed">
            Créez, personnalisez et gérez les cartes digitales de tous vos
            collaborateurs depuis un seul endroit. Une image de marque
            cohérente, pour toute votre entreprise.
          </p>

          <button
            onClick={()=>router.push("/register")}
            className="mt-8 bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-xl font-semibold flex items-center gap-2"
          >
            Créer un compte entreprise
            <ArrowRight size={18}/>
          </button>
        </div>

        <div className="relative h-80 flex items-center justify-center">

          {["Léa Bernard", "Marc Dubois", "Sofia Rossi"].map((name, i)=>(

            <div
              key={name}
              style={{
                transform:`rotate(${(i-1)*8}deg) translateX(${(i-1)*70}px)`,
                zIndex: i===1 ? 10 : 5
              }}
              className="absolute w-52 bg-[#111827] border border-white/10 rounded-2xl p-5 shadow-2xl"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30"/>
              <p className="font-bold mt-4 text-sm">
                {name}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Nova Studio
              </p>
            </div>

          ))}

        </div>

      </section>


      {/* CTA FINAL */}

      <section id="tarifs" className="max-w-7xl mx-auto px-6 py-10">

        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] px-10 py-20 text-center">

          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"/>

          <h2 className="text-4xl md:text-5xl font-bold relative">
            Prêt à moderniser votre carte de visite ?
          </h2>

          <p className="text-blue-100 mt-4 relative">
            Gratuit pour commencer. Créez votre première carte en quelques minutes.
          </p>

          <button
            onClick={()=>router.push("/register")}
            className="relative mt-8 bg-white text-blue-700 hover:bg-blue-50 transition px-8 py-4 rounded-xl font-bold"
          >
            Créer ma carte gratuitement
          </button>

        </div>

      </section>


      <Footer />


      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }

        .hero-float {
          animation: heroFloat 6s ease-in-out infinite;
        }
      `}</style>

    </div>

  )


}
