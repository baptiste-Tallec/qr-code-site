"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  CreditCard,
  Settings,
  LogOut,
  QrCode
} from "lucide-react";


export default function DashboardLayout({ children }) {

  const router = useRouter();


  async function logout(){

    await supabase.auth.signOut();

    router.push("/login");

  }


  return (

    <div className="min-h-screen bg-[#0B0F19] text-white flex">


      {/* Sidebar */}

      <aside className="w-72 bg-[#111827] border-r border-gray-800 flex flex-col">


        <div className="p-6 border-b border-gray-800">


          <div className="flex items-center gap-3">


            <div className="bg-blue-600 p-2 rounded-xl">

              <QrCode size={25}/>

            </div>


            <h1 className="text-xl font-bold">

              QR Card

            </h1>


          </div>


        </div>



        <nav className="flex-1 p-5 space-y-3">


          <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
          >

            <LayoutDashboard size={20}/>

            Dashboard

          </Link>



          <Link
          href="/dashboard/create"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
          >

            <CreditCard size={20}/>

            Ma carte

          </Link>




          <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
          >

            <Settings size={20}/>

            Paramètres

          </Link>



        </nav>



        <div className="p-5">


          <button

          onClick={logout}

          className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          bg-red-500/10
          text-red-400
          border
          border-red-500/20
          p-3
          rounded-xl
          hover:bg-red-500
          hover:text-white
          transition
          "

          >

            <LogOut size={18}/>

            Déconnexion

          </button>


        </div>


      </aside>




      {/* Content */}


      <main className="flex-1 p-8">


        {children}


      </main>



    </div>

  );

}