import React from 'react';
import { Calendar, MapPin, Smile } from 'lucide-react';
import DynamicContent from './DynamicContent';

const Stories = () => {
  const stories = [
    {
      title: "Cette fois où j'ai raté mon vol à Bangkok... 😅",
      excerpt: "Une histoire qui a mal commencé mais qui s'est transformée en l'une de mes plus belles aventures thaïlandaises",
      date: "15 Nov 2024",
      location: "Bangkok, Thaïlande",
      image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800",
      mood: "Aventure"
    },
    {
      title: "Nuit sous les étoiles dans le Sahara ⭐",
      excerpt: "Comment une nuit dans le désert marocain a changé ma vision du voyage et de la vie",
      date: "28 Oct 2024",
      location: "Sahara, Maroc",
      image: "https://images.pexels.com/photos/1434819/pexels-photo-1434819.jpeg?auto=compress&cs=tinysrgb&w=800",
      mood: "Émotionnel"
    },
    {
      title: "Perdue dans les rues de Tokyo 🏮",
      excerpt: "Quand ne pas parler japonais devient finalement une aventure incroyable",
      date: "12 Oct 2024",
      location: "Tokyo, Japon",
      image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800",
      mood: "Drôle"
    }
  ];

  return (
    <section id="stories" className="py-20 bg-gradient-to-br from-sage-green/5 to-terracotta/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mes récits de voyage 📖
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Les anecdotes, les moments magiques et les galères qui font la vraie essence du voyage ✨
          </p>
        </div>

        {/* Contenu dynamique depuis la base de données */}
        <div className="mb-16">
          <DynamicContent category="recit" limit={6} showTitle={false} />
        </div>
        <div className="space-y-8">
          {stories.map((story, index) => (
            <article key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="bg-sage-green/10 text-sage-green px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Smile className="h-4 w-4 mr-1" />
                      {story.mood}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {story.date}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {story.location}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-sage-green transition-colors duration-200 cursor-pointer">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {story.excerpt}
                  </p>
                  <button className="bg-terracotta text-white px-6 py-3 rounded-full font-medium hover:bg-terracotta/90 transition-colors duration-200">
                    Lire l'histoire complète 📚
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-sage-green text-white px-8 py-4 rounded-full font-medium hover:bg-sage-green/90 transition-colors duration-200 shadow-lg">
            Découvrir tous mes récits 🌍
          </button>
        </div>
      </div>
    </section>
  );
};

export default Stories;