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
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <Link
          href="/"
          className="flex items-center gap-3 text-white font-bold text-2xl"
        >
          <span className="bg-blue-600/15 border border-blue-500/30 p-2 rounded-xl">
            <QrCode className="text-blue-500" size={24} />
          </span>
          QR Card
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <a
            href="#fonctionnalites"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Fonctionnalités
          </a>

          <a
            href="#comment-ca-marche"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Comment ça marche
          </a>

          <a
            href="#tarifs"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Tarifs
          </a>

          <a
            href="#entreprises"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Entreprises
          </a>
        </div>

        <div className="flex items-center gap-4">

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-500 transition px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Connexion
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-500 transition px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg shadow-blue-600/20"
              >
                Créer ma carte
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
