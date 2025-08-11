import React from 'react';
import { Heart, Plane, Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-sage-green to-terracotta p-2 rounded-full">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">POP travel</h3>
                <p className="text-sm text-gray-400">✈️ Voyage avec style</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Découvre le monde avec authenticité ! Des guides pratiques, des inspirations uniques et des récits personnels pour nourrir tes rêves d'évasion. 🌍✨
            </p>
            <div className="flex items-center text-gray-400 text-sm">
              <span>Fait avec</span>
              <Heart className="h-4 w-4 mx-1 text-terracotta" />
              <span>et</span>
              <Coffee className="h-4 w-4 mx-1 text-sage-green" />
              <span>depuis 2019</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation 🧭</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-sage-green transition-colors duration-200">Accueil</a></li>
              <li><a href="#about" className="hover:text-sage-green transition-colors duration-200">À propos</a></li>
              <li><a href="#guides" className="hover:text-sage-green transition-colors duration-200">Guides</a></li>
              <li><a href="#inspirations" className="hover:text-sage-green transition-colors duration-200">Inspirations</a></li>
              <li><a href="#stories" className="hover:text-sage-green transition-colors duration-200">Récits</a></li>
              <li><a href="#concerts" className="hover:text-sage-green transition-colors duration-200">Concerts</a></li>
              <li><a href="#tips" className="hover:text-sage-green transition-colors duration-200">Conseils</a></li>
            </ul>
          </div>

          {/* Destinations populaires */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Destinations 🗺️</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-terracotta transition-colors duration-200">Thaïlande 🇹🇭</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors duration-200">Japon 🇯🇵</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors duration-200">Portugal 🇵🇹</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors duration-200">Italie 🇮🇹</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors duration-200">Maroc 🇲🇦</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors duration-200">Nouvelle-Zélande 🇳🇿</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4">Newsletter voyage 📮</h4>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Reçois mes derniers articles, bons plans et inspirations directement dans ta boîte mail ! ✨
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="ton.email@exemple.com"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-full focus:outline-none focus:ring-2 focus:ring-sage-green/50 focus:border-sage-green"
              />
              <button className="bg-sage-green text-white px-6 py-3 rounded-r-full hover:bg-sage-green/90 transition-colors duration-200">
                Go ! 🚀
              </button>
            </div>
          </div>
        </div>

        {/* Copyright et mentions légales */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <div>
              © 2024 POP travel. Tous voyages réservés avec ❤️
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-sage-green transition-colors duration-200">Mentions légales</a>
              <a href="#" className="hover:text-sage-green transition-colors duration-200">Politique de confidentialité</a>
              <a href="#contact" className="hover:text-sage-green transition-colors duration-200">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;