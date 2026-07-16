"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { QrCode } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <nav className="w-full border-b border-gray-800 bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <Link
          href="/"
          className="flex items-center gap-3 text-white font-bold text-2xl"
        >
          <QrCode className="text-blue-500" size={32} />
          QR Card
        </Link>

        <div className="flex items-center gap-8">

          <Link
            href="/"
            className="text-gray-300 hover:text-white transition"
          >
            Accueil
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-xl text-white"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Connexion
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-xl text-white"
              >
                Créer gratuitement
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}