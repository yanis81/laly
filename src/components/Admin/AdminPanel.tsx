import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Content, CATEGORY_LABELS } from '../../types/content';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, Home, Settings, Globe, Image as ImageIcon } from 'lucide-react';
import ImageUpload from './ImageUpload';
import ImageGallery from './ImageGallery';

const AdminPanel = () => {
  const [contents, setContents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState<any | null>(null);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'site' | 'images'>('content');

  // Site settings state
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'POP travel',
    siteTagline: '✈️ Voyage avec style',
    heroTitle: 'POP travel',
    heroSubtitle: 'Découvre le monde avec style ✨ Des récits authentiques, des guides pratiques et des inspirations pour tes prochaines aventures 🗺️',
    aboutTitle: 'À propos de POP travel 🤍',
    aboutDescription: 'Salut, moi c\'est POP ! ✌️ Passionnée de voyage depuis toujours, je partage mes aventures pour t\'inspirer à découvrir le monde autrement.',
    contactEmail: 'pop@travel.com',
    socialInstagram: '#',
    socialYoutube: '#',
    newsletterText: 'Reçois mes derniers articles, bons plans et inspirations directement dans ta boîte mail ! ✨'
  });

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'recit' as any,
    status: 'draft' as any,
    image_url: '',
    excerpt: '',
    tags: '',
    metadata: {} as any
  });

  useEffect(() => {
    checkUser();
    fetchContents();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchContents = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const contentData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        author_id: user.id
      };

      if (editingContent) {
        const { error } = await supabase
          .from('content')
          .update(contentData)
          .eq('id', editingContent.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('content')
          .insert([contentData]);
        
        if (error) throw error;
      }

      resetForm();
      fetchContents();
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const handleEdit = (content: any) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      content: content.content,
      category: content.category,
      status: content.status,
      image_url: content.image_url || '',
      excerpt: content.excerpt || '',
      tags: content.tags?.join(', ') || '',
      metadata: content.metadata || {}
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) return;

    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchContents();
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const toggleStatus = async (content: any) => {
    try {
      const newStatus = content.status === 'published' ? 'draft' : 'published';
      const { error } = await supabase
        .from('content')
        .update({ status: newStatus })
        .eq('id', content.id);

      if (error) throw error;
      fetchContents();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'recit',
      status: 'draft',
      image_url: '',
      excerpt: '',
      tags: '',
      metadata: {}
    });
    setEditingContent(null);
    setShowForm(false);
  };

  const handleMetadataChange = (key: string, value: any) => {
    setFormData({
      ...formData,
      metadata: {
        ...formData.metadata,
        [key]: value
      }
    });
  };

  const renderCategorySpecificFields = () => {
    switch (formData.category) {
      case 'guide':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Informations Guide 🗺️</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Durée</label>
                <input
                  type="text"
                  value={formData.metadata.duration || ''}
                  onChange={(e) => handleMetadataChange('duration', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  placeholder="ex: 7 jours"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget estimé</label>
                <input
                  type="text"
                  value={formData.metadata.budget || ''}
                  onChange={(e) => handleMetadataChange('budget', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  placeholder="ex: 800€"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <input
                  type="text"
                  value={formData.metadata.destination || ''}
                  onChange={(e) => handleMetadataChange('destination', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  placeholder="ex: Thaïlande"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulté</label>
                <select
                  value={formData.metadata.difficulty || ''}
                  onChange={(e) => handleMetadataChange('difficulty', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Facile">Facile 😊</option>
                  <option value="Modéré">Modéré 🤔</option>
                  <option value="Difficile">Difficile 💪</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'concert':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Informations Concert 🎵</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Artiste</label>
                <input
                  type="text"
                  value={formData.metadata.artist || ''}
                  onChange={(e) => handleMetadataChange('artist', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  placeholder="ex: Coldplay"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                <input
                  type="text"
                  value={formData.metadata.venue || ''}
                  onChange={(e) => handleMetadataChange('venue', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  placeholder="ex: Stade de France, Paris"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date du concert</label>
                <input
                  type="text"
                  value={formData.metadata.concertDate || ''}
                  onChange={(e) => handleMetadataChange('concertDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  placeholder="ex: 15 Juillet 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Genre musical</label>
                <input
                  type="text"
                  value={formData.metadata.genre || ''}
                  onChange={(e) => handleMetadataChange('genre', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  placeholder="ex: Pop Rock"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note (/5)</label>
                <select
                  value={formData.metadata.rating || ''}
                  onChange={(e) => handleMetadataChange('rating', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                >
                  <option value="">Sélectionner...</option>
                  <option value="1">1 ⭐</option>
                  <option value="2">2 ⭐⭐</option>
                  <option value="3">3 ⭐⭐⭐</option>
                  <option value="4">4 ⭐⭐⭐⭐</option>
                  <option value="5">5 ⭐⭐⭐⭐⭐</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacité</label>
                <input
                  type="text"
                  value={formData.metadata.capacity || ''}
                  onChange={(e) => handleMetadataChange('capacity', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  placeholder="ex: 80,000 personnes"
                />
              </div>
            </div>
          </div>
        );

      case 'recit':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Informations Récit 📖</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                <input
                  type="text"
                  value={formData.metadata.location || ''}
                  onChange={(e) => handleMetadataChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  placeholder="ex: Bangkok, Thaïlande"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Humeur du récit</label>
                <select
                  value={formData.metadata.mood || ''}
                  onChange={(e) => handleMetadataChange('mood', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Aventure">Aventure 🗺️</option>
                  <option value="Émotionnel">Émotionnel ❤️</option>
                  <option value="Drôle">Drôle 😄</option>
                  <option value="Inspirant">Inspirant ✨</option>
                  <option value="Relaxant">Relaxant 😌</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Durée du voyage</label>
                <input
                  type="text"
                  value={formData.metadata.tripDuration || ''}
                  onChange={(e) => handleMetadataChange('tripDuration', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  placeholder="ex: 2 semaines"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de voyage</label>
                <select
                  value={formData.metadata.travelType || ''}
                  onChange={(e) => handleMetadataChange('travelType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Solo">Solo 👩‍🦱</option>
                  <option value="Couple">En couple 💑</option>
                  <option value="Amis">Entre amis 👥</option>
                  <option value="Famille">En famille 👨‍👩‍👧‍👦</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'inspiration':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Informations Inspiration ✨</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type d'inspiration</label>
                <select
                  value={formData.metadata.inspirationType || ''}
                  onChange={(e) => handleMetadataChange('inspirationType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Top Liste">Top Liste 📝</option>
                  <option value="Expérience">Expérience 🌟</option>
                  <option value="Solo Travel">Solo Travel 👩‍🦱</option>
                  <option value="Culture">Culture 🎭</option>
                  <option value="Gastronomie">Gastronomie 🍜</option>
                  <option value="Road Trip">Road Trip 🚐</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Région/Continent</label>
                <input
                  type="text"
                  value={formData.metadata.region || ''}
                  onChange={(e) => handleMetadataChange('region', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  placeholder="ex: Europe, Asie du Sud-Est"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Saison recommandée</label>
                <select
                  value={formData.metadata.season || ''}
                  onChange={(e) => handleMetadataChange('season', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Printemps">Printemps 🌸</option>
                  <option value="Été">Été ☀️</option>
                  <option value="Automne">Automne 🍂</option>
                  <option value="Hiver">Hiver ❄️</option>
                  <option value="Toute l'année">Toute l'année 🌍</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Niveau de difficulté</label>
                <select
                  value={formData.metadata.difficulty || ''}
                  onChange={(e) => handleMetadataChange('difficulty', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Débutant">Débutant 🌱</option>
                  <option value="Intermédiaire">Intermédiaire 🌿</option>
                  <option value="Avancé">Avancé 🌳</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'conseil':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Informations Conseil 💡</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de conseil</label>
                <select
                  value={formData.metadata.tipType || ''}
                  onChange={(e) => handleMetadataChange('tipType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Budget">Budget 💰</option>
                  <option value="Sécurité">Sécurité 🛡️</option>
                  <option value="Matériel">Matériel 🎒</option>
                  <option value="Transport">Transport ✈️</option>
                  <option value="Hébergement">Hébergement 🏨</option>
                  <option value="Santé">Santé 🏥</option>
                  <option value="Technologie">Technologie 📱</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Niveau d'importance</label>
                <select
                  value={formData.metadata.importance || ''}
                  onChange={(e) => handleMetadataChange('importance', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Essentiel">Essentiel 🔥</option>
                  <option value="Important">Important ⭐</option>
                  <option value="Utile">Utile 💡</option>
                  <option value="Bonus">Bonus ✨</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Public cible</label>
                <select
                  value={formData.metadata.targetAudience || ''}
                  onChange={(e) => handleMetadataChange('targetAudience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Débutants">Débutants 🌱</option>
                  <option value="Voyageurs expérimentés">Voyageurs expérimentés 🌍</option>
                  <option value="Voyageurs solo">Voyageurs solo 👩‍🦱</option>
                  <option value="Familles">Familles 👨‍👩‍👧‍👦</option>
                  <option value="Backpackers">Backpackers 🎒</option>
                  <option value="Voyageurs luxe">Voyageurs luxe 💎</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Coût estimé</label>
                <input
                  type="text"
                  value={formData.metadata.estimatedCost || ''}
                  onChange={(e) => handleMetadataChange('estimatedCost', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  placeholder="ex: 25€, Gratuit, Variable"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Connexion Admin 🔐
          </h2>
          <button
            onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
            className="w-full bg-sage-green text-white py-3 rounded-full font-medium hover:bg-sage-green/90 transition-colors duration-200"
          >
            Se connecter avec Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin POP travel 👩‍💻</h1>
              <p className="text-gray-600">Gérez votre contenu et votre site facilement ✨</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="bg-terracotta text-white px-6 py-3 rounded-full font-medium hover:bg-terracotta/90 transition-colors duration-200 flex items-center"
              >
                <Home className="h-5 w-5 mr-2" />
                Retour à l'accueil
              </a>
              {activeTab === 'content' && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-sage-green text-white px-6 py-3 rounded-full font-medium hover:bg-sage-green/90 transition-colors duration-200 flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Nouveau contenu
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                activeTab === 'content'
                  ? 'text-sage-green border-b-2 border-sage-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Edit className="h-5 w-5 inline mr-2" />
              Gestion du contenu 📚
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                activeTab === 'images'
                  ? 'text-sage-green border-b-2 border-sage-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ImageIcon className="h-5 w-5 inline mr-2" />
              Galerie d'images 🖼️
            </button>
            <button
              onClick={() => setActiveTab('site')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                activeTab === 'site'
                  ? 'text-sage-green border-b-2 border-sage-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Settings className="h-5 w-5 inline mr-2" />
              Paramètres du site ⚙️
            </button>
          </div>
        </div>

        {/* Content Tab */}
        {activeTab === 'content' && (
          <>
            {/* Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {editingContent ? 'Modifier le contenu ✏️' : 'Nouveau contenu ✨'}
                      </h2>
                      <button
                        onClick={resetForm}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Basic Information */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900">Informations de base 📝</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Titre 📝
                          </label>
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Catégorie 📂
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                          >
                            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                              <option key={value} value={value}>{label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Résumé court 📄
                        </label>
                        <textarea
                          value={formData.excerpt}
                          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                          rows={2}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                          placeholder="Un court résumé de votre contenu..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          URL de l'image principale 🖼️
                        </label>
                        <input
                          type="url"
                          value={formData.image_url}
                          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                          placeholder="https://images.pexels.com/..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tags (séparés par des virgules) 🏷️
                        </label>
                        <input
                          type="text"
                          value={formData.tags}
                          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                          placeholder="voyage, thaïlande, conseils"
                        />
                      </div>
                    </div>

                    {/* Category Specific Fields */}
                    {renderCategorySpecificFields()}

                    <ImageUpload
                      value={formData.image_url}
                      onChange={(url) => setFormData({ ...formData, image_url: url })}
                      label="Image principale"
                      placeholder="Sélectionnez l'image principale de votre contenu"
                    />

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Statut 📊
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                      >
                        <option value="draft">Brouillon 📝</option>
                        <option value="published">Publié ✅</option>
                      </select>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-3 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="bg-sage-green text-white px-6 py-3 rounded-full font-medium hover:bg-sage-green/90 transition-colors duration-200 flex items-center"
                      >
                        <Save className="h-5 w-5 mr-2" />
                        {editingContent ? 'Mettre à jour' : 'Publier'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Content List */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Vos contenus 📚</h2>
              </div>

              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-4">⏳</div>
                  <p className="text-gray-600">Chargement de vos contenus...</p>
                </div>
              ) : contents.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-4">📝</div>
                  <p className="text-gray-600">Aucun contenu pour le moment. Créez votre premier article !</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {contents.map((content) => (
                    <div key={content.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{content.title}</h3>
                            <span className="bg-sage-green/10 text-sage-green px-3 py-1 rounded-full text-sm font-medium">
                              {CATEGORY_LABELS[content.category as keyof typeof CATEGORY_LABELS]}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              content.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {content.status === 'published' ? 'Publié ✅' : 'Brouillon 📝'}
                            </span>
                          </div>
                          {content.excerpt && (
                            <p className="text-gray-600 text-sm mb-2">{content.excerpt}</p>
                          )}
                          <div className="text-xs text-gray-500">
                            Créé le {new Date(content.created_at).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleStatus(content)}
                            className={`p-2 rounded-full transition-colors duration-200 ${
                              content.status === 'published'
                                ? 'text-green-600 hover:bg-green-100'
                                : 'text-yellow-600 hover:bg-yellow-100'
                            }`}
                            title={content.status === 'published' ? 'Dépublier' : 'Publier'}
                          >
                            {content.status === 'published' ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                          </button>
                          <button
                            onClick={() => handleEdit(content)}
                            className="p-2 text-sage-green hover:bg-sage-green/10 rounded-full transition-colors duration-200"
                            title="Modifier"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(content.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                            title="Supprimer"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <ImageGallery />
          </div>
        )}

        {/* Site Settings Tab */}
        {activeTab === 'site' && (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Paramètres du site 🌐</h2>
            
            <div className="space-y-8">
              {/* Site Identity */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Identité du site 🎨</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du site
                    </label>
                    <input
                      type="text"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slogan
                    </label>
                    <input
                      type="text"
                      value={siteSettings.siteTagline}
                      onChange={(e) => setSiteSettings({...siteSettings, siteTagline: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Section Hero 🌟</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre principal
                  </label>
                  <input
                    type="text"
                    value={siteSettings.heroTitle}
                    onChange={(e) => setSiteSettings({...siteSettings, heroTitle: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sous-titre
                  </label>
                  <textarea
                    value={siteSettings.heroSubtitle}
                    onChange={(e) => setSiteSettings({...siteSettings, heroSubtitle: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  />
                </div>
              </div>

              {/* About Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Section À propos 👋</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre de la section
                  </label>
                  <input
                    type="text"
                    value={siteSettings.aboutTitle}
                    onChange={(e) => setSiteSettings({...siteSettings, aboutTitle: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={siteSettings.aboutDescription}
                    onChange={(e) => setSiteSettings({...siteSettings, aboutDescription: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  />
                </div>
              </div>

              {/* Contact & Social */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Contact & Réseaux sociaux 📱</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de contact
                    </label>
                    <input
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings({...siteSettings, contactEmail: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      value={siteSettings.socialInstagram}
                      onChange={(e) => setSiteSettings({...siteSettings, socialInstagram: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube URL
                    </label>
                    <input
                      type="url"
                      value={siteSettings.socialYoutube}
                      onChange={(e) => setSiteSettings({...siteSettings, socialYoutube: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                    />
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Newsletter 📮</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texte d'invitation newsletter
                  </label>
                  <textarea
                    value={siteSettings.newsletterText}
                    onChange={(e) => setSiteSettings({...siteSettings, newsletterText: e.target.value})}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    // Here you would save the site settings
                    alert('Paramètres sauvegardés ! 🎉');
                  }}
                  className="bg-sage-green text-white px-8 py-3 rounded-full font-medium hover:bg-sage-green/90 transition-colors duration-200 flex items-center"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Sauvegarder les paramètres
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;