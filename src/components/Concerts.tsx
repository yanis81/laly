import React from 'react';
import { Music, MapPin, Calendar, Star, Heart, Users } from 'lucide-react';
import DynamicContent from './DynamicContent';

const Concerts = () => {
  const concertExperiences = [
    {
      artist: "Coldplay",
      venue: "Stade de France, Paris",
      date: "15 Juillet 2024",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 5,
      highlight: "Show époustouflant avec des effets visuels magiques ✨",
      story: "Une soirée inoubliable sous les étoiles parisiennes ! L'émotion était à son comble quand ils ont joué 'Fix You'...",
      genre: "Pop Rock",
      crowd: "80,000 personnes"
    },
    {
      artist: "Tame Impala",
      venue: "Red Rocks, Colorado",
      date: "22 Août 2024",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 5,
      highlight: "Concert psychédélique dans un cadre naturel unique 🌈",
      story: "Red Rocks + Tame Impala = combinaison parfaite ! Les couleurs du coucher de soleil se mélangeaient aux visuels du show...",
      genre: "Psychédélique",
      crowd: "9,500 personnes"
    },
    {
      artist: "Billie Eilish",
      venue: "AccorHotels Arena, Paris",
      date: "10 Juin 2024",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4,
      highlight: "Performance intimiste malgré la grande salle 💚",
      story: "Billie a créé une atmosphère si intime qu'on avait l'impression d'être dans son salon. Sa voix live est encore plus belle...",
      genre: "Pop Alternative",
      crowd: "20,000 personnes"
    }
  ];

  const upcomingConcerts = [
    {
      artist: "Arctic Monkeys",
      venue: "Olympia, Paris",
      date: "15 Mars 2025",
      genre: "Indie Rock",
      status: "Confirmé"
    },
    {
      artist: "Lana Del Rey",
      venue: "Zenith, Lyon",
      date: "28 Avril 2025",
      genre: "Dream Pop",
      status: "En attente"
    },
    {
      artist: "The Weeknd",
      venue: "U Arena, Paris",
      date: "12 Mai 2025",
      genre: "R&B",
      status: "Confirmé"
    }
  ];

  const concertTips = [
    {
      icon: <Music className="h-6 w-6" />,
      title: "Choisir sa place 🎫",
      tip: "Fosse pour l'ambiance, gradins pour la vue d'ensemble. Moi je préfère toujours être au plus près de l'artiste !",
      color: "sage-green"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Arriver tôt 🕐",
      tip: "Pour les concerts en fosse, arrivez 2h avant. Ça vaut le coup pour être au premier rang !",
      color: "terracotta"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Vivre l'instant 📱",
      tip: "Quelques photos c'est bien, mais n'oubliez pas de profiter du moment présent sans écran !",
      color: "sage-green"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Rencontrer des gens 🤝",
      tip: "Les concerts sont parfaits pour rencontrer d'autres fans. J'ai fait de super rencontres en faisant la queue !",
      color: "terracotta"
    }
  ];

  const venues = [
    {
      name: "Red Rocks Amphitheatre",
      location: "Colorado, USA 🇺🇸",
      description: "Le plus beau venue au monde selon moi ! Concert sous les étoiles dans un décor naturel époustouflant",
      image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 5
    },
    {
      name: "Olympia",
      location: "Paris, France 🇫🇷",
      description: "Salle mythique parisienne. L'acoustique est parfaite et l'histoire des lieux donne des frissons",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 5
    },
    {
      name: "Coachella",
      location: "Californie, USA 🇺🇸",
      description: "Festival légendaire dans le désert. L'expérience va bien au-delà de la musique !",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4
    }
  ];

  return (
    <section id="concerts" className="py-20 bg-gradient-to-br from-sage-green/5 to-terracotta/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="text-6xl">🎵</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mes expériences concert 🎤
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La musique live, c'est ma passion ! Je partage ici mes coups de cœur, mes découvertes et tous mes conseils pour vivre les meilleurs concerts 🎶✨
          </p>
        </div>

        {/* Contenu dynamique depuis la base de données */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mes derniers concerts ajoutés 🆕</h3>
          <DynamicContent category="concert" limit={6} showTitle={false} />
        </div>
        {/* Derniers concerts */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mes derniers concerts 🔥</h3>
          <div className="space-y-8">
            {concertExperiences.map((concert, index) => (
              <article key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={concert.image} 
                      alt={`Concert ${concert.artist}`}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="bg-sage-green/10 text-sage-green px-3 py-1 rounded-full text-sm font-medium">
                        {concert.genre}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {concert.date}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {concert.venue}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        {concert.crowd}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{concert.artist}</h3>
                    
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < concert.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-gray-600 text-sm">({concert.rating}/5)</span>
                    </div>
                    
                    <div className="bg-terracotta/10 p-4 rounded-2xl mb-4">
                      <p className="text-terracotta font-medium text-sm">💫 {concert.highlight}</p>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {concert.story}
                    </p>
                    
                    <a 
                      href="#contact"
                      className="bg-sage-green text-white px-6 py-3 rounded-full font-medium hover:bg-sage-green/90 transition-colors duration-200 inline-block"
                    >
                      Lire mon récit complet 📖
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Concerts à venir */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mes prochains concerts 📅</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingConcerts.map((concert, index) => (
              <div key={index} className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-sm font-medium">
                    {concert.genre}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    concert.status === 'Confirmé' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {concert.status}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{concert.artist}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-sage-green" />
                    {concert.date}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-sage-green" />
                    {concert.venue}
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-2xl">🎫</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conseils concerts */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mes conseils concert 💡</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {concertTips.map((tip, index) => (
              <div key={index} className="text-center">
                <div className={`bg-${tip.color}/10 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  <div className={`text-${tip.color}`}>
                    {tip.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{tip.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mes venues préférés */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mes salles coup de cœur 🏟️</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {venues.map((venue, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={venue.image} 
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold text-gray-900">{venue.name}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < venue.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sage-green font-medium text-sm mb-3">{venue.location}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{venue.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-white p-8 rounded-3xl shadow-lg max-w-2xl mx-auto">
            <div className="mb-4">
              <span className="text-4xl">🎸</span>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-4">Tu as des recommandations ? 🤔</h4>
            <p className="text-gray-600 mb-6">
              Je suis toujours à la recherche de nouveaux artistes et de salles incroyables ! Partage tes coups de cœur avec moi 💌
            </p>
            <a 
              href="#contact" 
              className="bg-terracotta text-white px-8 py-4 rounded-full font-medium hover:bg-terracotta/90 transition-colors duration-200 shadow-lg inline-block"
            >
              Partager tes recommandations 🎵
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Concerts;