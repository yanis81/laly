import React from 'react';
import { Globe, Compass, Coffee } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            À propos de POP travel 🤍
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Salut, moi c'est POP ! ✌️ Passionnée de voyage depuis toujours, je partage mes aventures pour t'inspirer à découvrir le monde autrement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-sage-green/10 p-3 rounded-full">
                <Globe className="h-6 w-6 text-sage-green" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ma philosophie du voyage 🌱</h3>
                <p className="text-gray-600">
                  Je crois au voyage slow, authentique et respectueux. Pas de tourisme de masse, mais des rencontres vraies et des expériences qui marquent.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-terracotta/10 p-3 rounded-full">
                <Compass className="h-6 w-6 text-terracotta" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mes spécialités 🎯</h3>
                <p className="text-gray-600">
                  Voyage solo féminin, road trips, destinations hors des sentiers battus, et surtout les bons plans pour voyager sans se ruiner !
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-sage-green/10 p-3 rounded-full">
                <Coffee className="h-6 w-6 text-sage-green" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ce que tu trouveras ici ☕</h3>
                <p className="text-gray-600">
                  Des guides pratiques testés sur le terrain, mes coups de cœur, des anecdotes croustillantes et tous mes conseils pour voyager malin !
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-sage-green/10 to-terracotta/10 p-8 rounded-3xl">
            <div className="text-center">
              <div className="mb-6">
                <span className="text-8xl">👩‍💻</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Stats voyage 📊</h3>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                  <div className="text-2xl font-bold text-sage-green">50+</div>
                  <div className="text-sm text-gray-600">Pays visités</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                  <div className="text-2xl font-bold text-terracotta">200+</div>
                  <div className="text-sm text-gray-600">Articles publiés</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                  <div className="text-2xl font-bold text-sage-green">5</div>
                  <div className="text-sm text-gray-600">Années d'expérience</div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                  <div className="text-2xl font-bold text-terracotta">∞</div>
                  <div className="text-sm text-gray-600">Souvenirs magiques</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;