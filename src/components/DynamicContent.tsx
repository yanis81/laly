import React, { useState, useEffect } from 'react';
import { supabase, Content } from '../lib/supabase';
import { Calendar, MapPin, Star, Music, Heart, Camera } from 'lucide-react';

interface DynamicContentProps {
  category?: Content['category'];
  limit?: number;
  showTitle?: boolean;
}

const DynamicContent: React.FC<DynamicContentProps> = ({ 
  category, 
  limit, 
  showTitle = true 
}) => {
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContents();
  }, [category, limit]);

  const fetchContents = async () => {
    try {
      let query = supabase
        .from('content')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (cat: Content['category']) => {
    const icons = {
      page: <Star className="h-4 w-4" />,
      recit: <Heart className="h-4 w-4" />,
      concert: <Music className="h-4 w-4" />,
      guide: <MapPin className="h-4 w-4" />,
      inspiration: <Camera className="h-4 w-4" />,
      conseil: <Star className="h-4 w-4" />
    };
    return icons[cat];
  };

  const getCategoryLabel = (cat: Content['category']) => {
    const labels = {
      page: 'Page',
      recit: 'Récit',
      concert: 'Concert',
      guide: 'Guide',
      inspiration: 'Inspiration',
      conseil: 'Conseil'
    };
    return labels[cat];
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-gray-600">Chargement du contenu...</p>
      </div>
    );
  }

  if (contents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📝</div>
        <p className="text-gray-600">Aucun contenu disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {showTitle && category && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {getCategoryLabel(category)} ✨
          </h2>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contents.map((content) => (
          <article key={content.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {content.image_url && (
              <div className="relative">
                <img 
                  src={content.image_url} 
                  alt={content.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-sage-green text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    {getCategoryIcon(content.category)}
                    <span className="ml-1">{getCategoryLabel(content.category)}</span>
                  </span>
                </div>
              </div>
            )}
            
            <div className="p-6">
              {!content.image_url && (
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-sage-green/10 text-sage-green px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    {getCategoryIcon(content.category)}
                    <span className="ml-1">{getCategoryLabel(content.category)}</span>
                  </span>
                </div>
              )}
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-sage-green transition-colors duration-200 cursor-pointer">
                {content.title}
              </h3>
              
              {content.excerpt && (
                <p className="text-gray-600 mb-4 leading-relaxed">{content.excerpt}</p>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(content.created_at).toLocaleDateString('fr-FR')}
                </div>
                {content.tags && content.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {content.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-terracotta/10 text-terracotta px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <button className="w-full bg-sage-green text-white py-3 rounded-full font-medium hover:bg-sage-green/90 transition-colors duration-200">
                Lire la suite ✨
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default DynamicContent;