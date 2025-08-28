import React from 'react';
import { MapPin, Clock, DollarSign } from 'lucide-react';

const Guides = () => {
  const guides = [
    {
      title: "Guide complet Thaïlande 🇹🇭",
      description: "1 semaine d'itinéraire optimisé entre Bangkok, Chiang Mai et les îles du sud",
      image: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "7 jours",
      budget: "800€",
      category: "Asie du Sud-Est"
    },
    {
      title: "3 jours magiques à Rome 🇮🇹",
      description: "L'essentiel de la ville éternelle avec mes adresses secrètes",
      image: "https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "3 jours",
      budget: "400€",
      category: "Europe"
    },
    {
      title: "Road trip Portugal 🇵🇹",
      description: "De Porto à Lisbonne en passant par les plus beaux villages",
      image: "https://images.pexels.com/photos/2526935/pexels-photo-2526935.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "10 jours",
      budget: "600€",
      category: "Europe"
    },
    {
      title: "Japon authentique 🇯🇵",
      description: "Au-delà de Tokyo : temples, onsen et traditions millénaires",
      image: "https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "14 jours",
      budget: "1500€",
      category: "Asie"
    }
  ];

  return (
    <section id="guides" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Guides de voyage 🗺️
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mes itinéraires détaillés testés sur le terrain, avec tous mes conseils pratiques pour voyager malin !
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-sage-green text-white px-3 py-1 rounded-full text-sm font-medium">
                    {guide.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{guide.title}</h3>
                <p className="text-gray-600 mb-4">{guide.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-sage-green" />
                    {guide.duration}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-terracotta" />
                    {guide.budget}
                  </div>
                </div>
                <a 
                  href="#contact"
                  className="w-full mt-4 bg-sage-green text-white py-3 rounded-full font-medium hover:bg-sage-green/90 transition-colors duration-200 block text-center"
                >
                  Lire le guide ✨
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guides;