import Link from "next/link";
import { QrCode } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-12 md:grid-cols-5">

          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <QrCode className="text-blue-500" size={24} />
              QR Card
            </div>

            <p className="text-gray-500 mt-4 max-w-xs text-sm">
              La carte de visite digitale professionnelle. Partagez vos
              informations en un scan, sur iPhone comme Android.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              Produit
            </h4>
            <div className="flex flex-col gap-3 text-sm text-gray-500">
              <a href="#fonctionnalites" className="hover:text-white transition">
                Fonctionnalités
              </a>
              <a href="#comment-ca-marche" className="hover:text-white transition">
                Comment ça marche
              </a>
              <a href="#tarifs" className="hover:text-white transition">
                Tarifs
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              Entreprise
            </h4>
            <div className="flex flex-col gap-3 text-sm text-gray-500">
              <a href="#entreprises" className="hover:text-white transition">
                Solutions équipes
              </a>
              <Link href="/register" className="hover:text-white transition">
                Créer un compte
              </Link>
              <Link href="/login" className="hover:text-white transition">
                Connexion
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              Support
            </h4>
            <div className="flex flex-col gap-3 text-sm text-gray-500">
              <span>Contact</span>
              <a href="mailto:qr.business.carte@gmail.com" className="hover:text-white transition">
                qr.business.carte@gmail.com
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} QR Card. Tous droits réservés.
        </div>

      </div>
    </footer>
  );
}
