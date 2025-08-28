import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = "Image",
  placeholder = "Sélectionnez une image..."
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide.');
      return;
    }

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image est trop volumineuse. Taille maximum : 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Créer une URL locale pour l'image
      const imageUrl = URL.createObjectURL(file);
      
      // Optionnel : Redimensionner l'image si nécessaire
      const resizedImageUrl = await resizeImage(file, 1200, 800);
      
      onChange(resizedImageUrl);
    } catch (error) {
      console.error('Erreur lors du traitement de l\'image:', error);
      alert('Erreur lors du traitement de l\'image');
    } finally {
      setIsUploading(false);
    }
  };

  const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculer les nouvelles dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Dessiner l'image redimensionnée
        ctx?.drawImage(img, 0, 0, width, height);

        // Convertir en blob puis en URL
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            resolve(url);
          } else {
            resolve(URL.createObjectURL(file));
          }
        }, 'image/jpeg', 0.8);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} 📸
      </label>
      
      {value ? (
        <div className="relative">
          <img 
            src={value} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-2xl shadow-lg"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            dragActive 
              ? 'border-sage-green bg-sage-green/5' 
              : 'border-gray-300 hover:border-sage-green hover:bg-sage-green/5'
          }`}
        >
          {isUploading ? (
            <div className="space-y-2">
              <div className="animate-spin mx-auto">
                <Upload className="h-8 w-8 text-sage-green" />
              </div>
              <p className="text-sage-green font-medium">Traitement de l'image...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-gray-600 font-medium">
                  Cliquez pour sélectionner ou glissez une image ici
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  PNG, JPG, WEBP jusqu'à 5MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileSelect(file);
          }
        }}
        className="hidden"
      />
      
      {value && (
        <p className="text-xs text-gray-500">
          💡 Conseil : L'image sera automatiquement redimensionnée pour optimiser les performances
        </p>
      )}
    </div>
  );
};

export default ImageUpload;