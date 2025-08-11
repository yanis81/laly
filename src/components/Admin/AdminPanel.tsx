import React, { useState, useEffect } from 'react';
import { supabase, Content } from '../../lib/supabase';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, Home } from 'lucide-react';

const AdminPanel = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [user, setUser] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'recit' as Content['category'],
    status: 'draft' as Content['status'],
    image_url: '',
    excerpt: '',
    tags: '',
    metadata: {}
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

  const handleEdit = (content: Content) => {
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

  const toggleStatus = async (content: Content) => {
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

  const categoryLabels = {
    page: 'Page 📄',
    recit: 'Récit 📖',
    concert: 'Concert 🎵',
    guide: 'Guide 🗺️',
    inspiration: 'Inspiration ✨',
    conseil: 'Conseil 💡'
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
              <p className="text-gray-600">Gérez votre contenu facilement ✨</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="bg-terracotta text-white px-6 py-3 rounded-full font-medium hover:bg-terracotta/90 transition-colors duration-200 flex items-center"
              >
                <Home className="h-5 w-5 mr-2" />
                Retour à l'accueil
              </a>
              <button
                onClick={() => setShowForm(true)}
                className="bg-sage-green text-white px-6 py-3 rounded-full font-medium hover:bg-sage-green/90 transition-colors duration-200 flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nouveau contenu
              </button>
            </div>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Content['category'] })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                    >
                      {Object.entries(categoryLabels).map(([value, label]) => (
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
                    Contenu principal ✍️
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                    placeholder="Rédigez votre contenu ici..."
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL de l'image 🖼️
                    </label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                      placeholder="https://example.com/image.jpg"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut 📊
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Content['status'] })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-green/50"
                  >
                    <option value="draft">Brouillon 📝</option>
                    <option value="published">Publié ✅</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-4">
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
                          {categoryLabels[content.category]}
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
      </div>
    </div>
  );
};

export default AdminPanel;