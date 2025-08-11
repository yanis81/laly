import React from 'react';
import { MapPin, Heart, Camera } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-sage-green/10 to-terracotta/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <span className="text-6xl">🌍</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            POP <span className="text-sage-green">travel</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Découvre le monde avec style ✨ Des récits authentiques, des guides pratiques et des inspirations pour tes prochaines aventures 🗺️
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-md">
              <MapPin className="h-5 w-5 text-sage-green mr-2" />
              <span className="text-gray-700">50+ destinations</span>
            </div>
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-md">
              <Heart className="h-5 w-5 text-terracotta mr-2" />
              <span className="text-gray-700">Voyage authentique</span>
            </div>
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-md">
              <Camera className="h-5 w-5 text-sage-green mr-2" />
              <span className="text-gray-700">Photos exclusives</span>
            </div>
          </div>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <a
              href="#guides"
              className="block sm:inline-block bg-sage-green text-white px-8 py-4 rounded-full font-medium hover:bg-sage-green/90 transition-colors duration-200 shadow-lg"
            >
              Découvrir les guides 🧭
            </a>
            <a
              href="#inspirations"
              className="block sm:inline-block bg-terracotta text-white px-8 py-4 rounded-full font-medium hover:bg-terracotta/90 transition-colors duration-200 shadow-lg"
            >
              S'inspirer ✨
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;