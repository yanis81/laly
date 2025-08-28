import React, { useState, useEffect } from 'react';
import { imageStorage, StoredImage } from '../../utils/ImageStorage';
import { Trash2, Copy, Eye, Calendar, HardDrive, X } from 'lucide-react';

interface ImageGalleryProps {
  onSelectImage?: (url: string) => void;
  showSelector?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  onSelectImage, 
  showSelector = false 
}) => {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<StoredImage | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    const storedImages = imageStorage.getAllImages();
    setImages(storedImages.sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      imageStorage.deleteImage(id);
      loadImages();
      if (selectedImage?.id === id) {
        setSelectedImage(null);
      }
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copiée dans le presse-papiers ! 📋');
  };

  const handleSelect = (image: StoredImage) => {
    if (showSelector && onSelectImage) {
      onSelectImage(image.url);
    } else {
      setSelectedImage(image);
    }
  };

  const totalSize = imageStorage.getTotalSize();

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="bg-gradient-to-r from-sage-green/10 to-terracotta/10 p-6 rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Galerie d'images 📸
            </h3>
            <p className="text-gray-600">
              Gérez toutes vos images uploadées
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-gray-600 mb-1">
              <HardDrive className="h-4 w-4 mr-2" />
              <span className="text-sm">
                {images.length} image{images.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {imageStorage.formatSize(totalSize)} utilisés
            </div>
          </div>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Aucune image uploadée
          </h3>
          <p className="text-gray-600">
            Commencez par ajouter du contenu avec des images !
          </p>
        </div>
      ) : (
        <>
          {/* Grille d'images */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleSelect(image)}
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay avec actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(image);
                      }}
                      className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      title="Voir"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrl(image.url);
                      }}
                      className="bg-sage-green text-white p-2 rounded-full hover:bg-sage-green/90 transition-colors duration-200"
                      title="Copier l'URL"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(image.id);
                      }}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Informations de l'image */}
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {image.name}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                    <span>{imageStorage.formatSize(image.size)}</span>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(image.uploadedAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>

                {/* Indicateur de sélection */}
                {showSelector && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-sage-green text-white p-1 rounded-full">
                      <Copy className="h-3 w-3" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Modal de prévisualisation */}
          {selectedImage && !showSelector && (
            <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {selectedImage.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {imageStorage.formatSize(selectedImage.size)} • 
                        Uploadée le {new Date(selectedImage.uploadedAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.name}
                    className="w-full max-h-96 object-contain rounded-2xl"
                  />
                  
                  <div className="flex justify-center space-x-4 mt-6">
                    <button
                      onClick={() => handleCopyUrl(selectedImage.url)}
                      className="bg-sage-green text-white px-6 py-3 rounded-full font-medium hover:bg-sage-green/90 transition-colors duration-200 flex items-center"
                    >
                      <Copy className="h-5 w-5 mr-2" />
                      Copier l'URL
                    </button>
                    <button
                      onClick={() => handleDelete(selectedImage.id)}
                      className="bg-red-500 text-white px-6 py-3 rounded-full font-medium hover:bg-red-600 transition-colors duration-200 flex items-center"
                    >
                      <Trash2 className="h-5 w-5 mr-2" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageGallery;