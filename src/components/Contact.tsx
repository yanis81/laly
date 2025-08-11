import React, { useState } from 'react';
import { Mail, Instagram, Youtube, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-sage-green/10 to-terracotta/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Restons en contact ! 💌
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une question sur une destination ? Une collaboration ? Ou simplement l'envie de discuter voyage ? Je suis là ! ✨
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Parlons voyage ! 🗣️</h3>
              <p className="text-gray-600 mb-8">
                J'adore échanger avec ma communauté de voyageurs. N'hésite pas à me poser tes questions, partager tes expériences ou me proposer tes collaborations !
              </p>
            </div>

            {/* Réseaux sociaux */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Retrouve-moi sur les réseaux 📱</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="flex items-center justify-center w-12 h-12 bg-sage-green text-white rounded-full hover:bg-sage-green/90 transition-colors duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="flex items-center justify-center w-12 h-12 bg-terracotta text-white rounded-full hover:bg-terracotta/90 transition-colors duration-200"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="flex items-center justify-center w-12 h-12 bg-sage-green text-white rounded-full hover:bg-sage-green/90 transition-colors duration-200"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* FAQ rapide */}
            <div className="bg-white p-6 rounded-3xl shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Questions fréquentes 🤔</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-sage-green">💸 Quel budget pour l'Asie du Sud-Est ?</strong>
                  <p className="text-gray-600">Compte 20-30€/jour en mode backpack !</p>
                </div>
                <div>
                  <strong className="text-sage-green">🎒 Meilleur sac à dos voyage ?</strong>
                  <p className="text-gray-600">J'adore mon Osprey Farpoint 40L</p>
                </div>
                <div>
                  <strong className="text-sage-green">📱 Apps indispensables ?</strong>
                  <p className="text-gray-600">Maps.me, Translate, XE Currency</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Ton prénom ✨
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50 focus:border-sage-green transition-colors duration-200"
                  placeholder="Comment tu t'appelles ?"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Ton email 📧
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50 focus:border-sage-green transition-colors duration-200"
                  placeholder="ton.email@exemple.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet 💭
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50 focus:border-sage-green transition-colors duration-200"
                  required
                >
                  <option value="">Choisis un sujet...</option>
                  <option value="question">Question voyage 🗺️</option>
                  <option value="collaboration">Collaboration 🤝</option>
                  <option value="feedback">Feedback sur le blog 💬</option>
                  <option value="other">Autre 🌟</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Ton message 💌
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50 focus:border-sage-green transition-colors duration-200 resize-none"
                  placeholder="Raconte-moi tout ! 😊"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-sage-green text-white py-4 rounded-2xl font-medium hover:bg-sage-green/90 transition-colors duration-200 flex items-center justify-center shadow-lg"
              >
                <Send className="h-5 w-5 mr-2" />
                Envoyer le message ✨
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;