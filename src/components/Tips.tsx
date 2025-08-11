import React from 'react';
import { Luggage, CreditCard, Shield, Smartphone } from 'lucide-react';

const Tips = () => {
  const tips = [
    {
      icon: <Luggage className="h-8 w-8" />,
      title: "Faire sa valise comme une pro 🎒",
      description: "Mes techniques de pliage et ma checklist ultime pour ne rien oublier",
      color: "sage-green"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Trouver des vols pas chers ✈️",
      description: "Tous mes secrets pour économiser sur les billets d'avion",
      color: "terracotta"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Voyager seule en sécurité 👩‍🦱",
      description: "Mes conseils pratiques pour les femmes qui voyagent solo",
      color: "sage-green"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Apps indispensables 📱",
      description: "Ma sélection d'applications pour voyager malin",
      color: "terracotta"
    }
  ];

  const budgets = [
    { country: "Thaïlande", flag: "🇹🇭", budget: "25€/jour", category: "Backpack" },
    { country: "Portugal", flag: "🇵🇹", budget: "40€/jour", category: "Confort" },
    { country: "Japon", flag: "🇯🇵", budget: "80€/jour", category: "Premium" },
    { country: "Indonésie", flag: "🇮🇩", budget: "20€/jour", category: "Backpack" }
  ];

  const gear = [
    { name: "Sac à dos Osprey Farpoint 40L", category: "Bagage", price: "150€" },
    { name: "Drone DJI Mini 3", category: "Photo", price: "450€" },
    { name: "Chargeur portable Anker", category: "Tech", price: "30€" },
    { name: "Trousse de secours complète", category: "Santé", price: "25€" }
  ];

  return (
    <section id="tips" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Conseils & Astuces 💡
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tout ce que j'aurais aimé savoir avant mes premiers voyages ! Budgets, matériel, sécurité...
          </p>
        </div>

        {/* Conseils pratiques */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Conseils voyage pratiques 🎯</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="text-center">
                <div className={`bg-${tip.color}/10 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  <div className={`text-${tip.color}`}>
                    {tip.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h4>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Budget par pays */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Budget par destination 💰</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {budgets.map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-3xl text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-3">{item.flag}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.country}</h4>
                <div className="text-2xl font-bold text-sage-green mb-2">{item.budget}</div>
                <span className="bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-sm">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Matériel recommandé */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Matériel testé et approuvé ⭐</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gear.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-sage-green/5 to-terracotta/5 p-6 rounded-3xl">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-sage-green/10 text-sage-green px-2 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                  <span className="text-terracotta font-bold">{item.price}</span>
                </div>
                <h4 className="text-gray-900 font-semibold mb-2">{item.name}</h4>
                <button className="text-sage-green text-sm font-medium hover:underline">
                  Voir ma review 📝
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tips;