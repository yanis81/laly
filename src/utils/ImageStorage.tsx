// Système de stockage d'images local pour le développement
// En production, vous devriez utiliser un service comme Supabase Storage, Cloudinary, etc.

interface StoredImage {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

class ImageStorage {
  private storageKey = 'pop-travel-images';

  // Sauvegarder une image dans le localStorage (pour le développement)
  saveImage(file: File, url: string): StoredImage {
    const image: StoredImage = {
      id: this.generateId(),
      name: file.name,
      url: url,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    };

    const images = this.getAllImages();
    images.push(image);
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(images));
    } catch (error) {
      console.warn('Impossible de sauvegarder l\'image dans le localStorage:', error);
    }

    return image;
  }

  // Récupérer toutes les images
  getAllImages(): StoredImage[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Erreur lors de la récupération des images:', error);
      return [];
    }
  }

  // Supprimer une image
  deleteImage(id: string): boolean {
    try {
      const images = this.getAllImages();
      const filteredImages = images.filter(img => img.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredImages));
      return true;
    } catch (error) {
      console.warn('Erreur lors de la suppression de l\'image:', error);
      return false;
    }
  }

  // Nettoyer les images non utilisées (optionnel)
  cleanupUnusedImages(usedUrls: string[]): void {
    try {
      const images = this.getAllImages();
      const usedImages = images.filter(img => usedUrls.includes(img.url));
      localStorage.setItem(this.storageKey, JSON.stringify(usedImages));
    } catch (error) {
      console.warn('Erreur lors du nettoyage des images:', error);
    }
  }

  // Générer un ID unique
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Obtenir la taille totale des images stockées
  getTotalSize(): number {
    const images = this.getAllImages();
    return images.reduce((total, img) => total + img.size, 0);
  }

  // Formater la taille en format lisible
  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export const imageStorage = new ImageStorage();
export type { StoredImage };