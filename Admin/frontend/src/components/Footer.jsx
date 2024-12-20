import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-black text-white p-8">
      <div className="container mx-auto grid grid-cols-3 gap-8">
        {/* Informations de l'entreprise */}
        <div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
            Buja Box Office
          </h2>
          <p className="text-gray-400">
            123 Rue du Cinéma
            <br />
            Bujumbura, Burundi
          </p>
          <p className="mt-4 text-gray-400">
            Téléphone: +257 12 34 56 78
            <br />
            Email: contact@bujaboxoffice.com
          </p>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex flex-col items-center justify-start">
          <h3 className="text-xl mb-4">Suivez-nous</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500 transition">
              <Facebook size={30} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <Twitter size={30} />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <Instagram size={30} />
            </a>
          </div>
        </div>

        {/* Partenaires */}
        <div className="mr-0">
          <h3 className="text-xl ml-4">Nos Partenaires</h3>
          <div className="flex space-x-4">
            <img
              src="/netflix-logo.svg"
              alt="Netflix"
              className="h-12 filter grayscale hover:filter-none transition"
            />
            <img
              src="/hollywood-logo.svg"
              alt="Hollywood"
              className="h-12 filter grayscale hover:filter-none transition"
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 pt-4 border-t border-gray-700">
        <p className="text-gray-500 font-bold">
          © 2024 Buja Box Office. Créé par Yakin, Florian, Tony, Franck,
          Salomon.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
