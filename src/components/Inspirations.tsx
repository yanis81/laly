import React from 'react';
import { Star, Heart, Camera } from 'lucide-react';

const Inspirations = () => {
  const inspirations = [
    {
      title: "10 plages paradisiaques en Europe 🏖️",
      description: "Des criques secrètes aux eaux turquoise, mes coups de cœur pour un été magique",
      image: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "Top Liste",
      icon: <Star className="h-4 w-4" />
    },
    {
      title: "Plongée avec les requins-baleines 🦈",
      description: "Une expérience unique aux Philippines qui m'a marquée à vie",
      image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "Expérience",
      icon: <Heart className="h-4 w-4" />
    },
    {
      title: "5 villes parfaites pour voyager solo 👩‍🦱",
      description: "Mes destinations favorites pour les femmes qui voyagent seules",
      image: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "Solo Travel",
      icon: <Camera className="h-4 w-4" />
    },
    {
      title: "Festivals du monde à ne pas manquer 🎭",
      description: "Holi en Inde, Burning Man, Oktoberfest... mes expériences festives",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "Culture",
      icon: <Star className="h-4 w-4" />
    },
    {
      title: "Street food à travers le monde 🍜",
      description: "Mes découvertes culinaires de rue, des tacos mexicains aux dim sum chinois",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "Gastronomie",
      icon: <Heart className="h-4 w-4" />
    },
    {
      title: "Road trip en van en Nouvelle-Zélande 🚐",
      description: "3 semaines de liberté totale sur les routes les plus belles du monde",
      image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "Road Trip",
      icon: <Camera className="h-4 w-4" />
    }
  ];

  return (
    <section id="inspirations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Inspirations voyage ✨
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des idées, des tops listes et des expériences uniques pour nourrir tes rêves d'évasion !
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inspirations.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      {item.icon}
                      <span className="ml-1">{item.type}</span>
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-terracotta transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-terracotta text-white px-8 py-4 rounded-full font-medium hover:bg-terracotta/90 transition-colors duration-200 shadow-lg">
            Voir toutes les inspirations 🌟
          </button>
        </div>
      </div>
    </section>
  );
};

export default Inspirations;