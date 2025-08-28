export interface BaseContent {
  id: string;
  title: string;
  content: string;
  category: 'guide' | 'recit' | 'concert' | 'inspiration' | 'conseil' | 'budget' | 'materiel' | 'venue' | 'upcoming-concert';
  status: 'draft' | 'published';
  image_url?: string;
  excerpt?: string;
  tags?: string[];
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  author_id: string;
}

// Guides de voyage
export interface GuideContent extends BaseContent {
  category: 'guide';
  metadata: {
    duration: string;
    budget: string;
    destination: string;
    difficulty: 'Facile' | 'Modéré' | 'Difficile';
    highlights: string[];
    itinerary: Array<{
      day: number;
      title: string;
      description: string;
      activities: string[];
    }>;
  };
}

// Récits de voyage
export interface StoryContent extends BaseContent {
  category: 'recit';
  metadata: {
    location: string;
    mood: 'Aventure' | 'Émotionnel' | 'Drôle' | 'Inspirant' | 'Relaxant';
    tripDuration: string;
    travelType: 'Solo' | 'Couple' | 'Amis' | 'Famille';
    date: string;
  };
}

// Concerts
export interface ConcertContent extends BaseContent {
  category: 'concert';
  metadata: {
    artist: string;
    venue: string;
    concertDate: string;
    genre: string;
    rating: number;
    capacity: string;
    ticketPrice?: string;
    setlist?: string[];
    photos?: string[];
  };
}

// Concerts à venir
export interface UpcomingConcertContent extends BaseContent {
  category: 'upcoming-concert';
  metadata: {
    artist: string;
    venue: string;
    concertDate: string;
    genre: string;
    ticketUrl?: string;
    price?: string;
    status: 'Confirmé' | 'En attente' | 'Annulé';
  };
}

// Salles de concert
export interface VenueContent extends BaseContent {
  category: 'venue';
  metadata: {
    location: string;
    capacity: string;
    rating: number;
    description: string;
    bestFeatures: string[];
    concertsAttended: number;
    website?: string;
  };
}

// Budget par destination
export interface BudgetContent extends BaseContent {
  category: 'budget';
  metadata: {
    country: string;
    flag: string;
    dailyBudget: string;
    budgetCategory: 'Backpack' | 'Confort' | 'Premium';
    breakdown: {
      accommodation: string;
      food: string;
      transport: string;
      activities: string;
    };
    tips: string[];
  };
}

// Matériel testé
export interface GearContent extends BaseContent {
  category: 'materiel';
  metadata: {
    productName: string;
    category: 'Bagage' | 'Photo' | 'Tech' | 'Santé' | 'Vêtements' | 'Accessoires';
    price: string;
    rating: number;
    pros: string[];
    cons: string[];
    buyLink?: string;
    tested: boolean;
    recommendation: 'Indispensable' | 'Recommandé' | 'Optionnel' | 'À éviter';
  };
}

// Inspirations
export interface InspirationContent extends BaseContent {
  category: 'inspiration';
  metadata: {
    inspirationType: 'Top Liste' | 'Expérience' | 'Solo Travel' | 'Culture' | 'Gastronomie' | 'Road Trip';
    region: string;
    season: 'Printemps' | 'Été' | 'Automne' | 'Hiver' | 'Toute l\'année';
    difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
    estimatedCost?: string;
  };
}

// Conseils
export interface TipContent extends BaseContent {
  category: 'conseil';
  metadata: {
    tipType: 'Budget' | 'Sécurité' | 'Matériel' | 'Transport' | 'Hébergement' | 'Santé' | 'Technologie';
    importance: 'Essentiel' | 'Important' | 'Utile' | 'Bonus';
    targetAudience: 'Débutants' | 'Voyageurs expérimentés' | 'Voyageurs solo' | 'Familles' | 'Backpackers' | 'Voyageurs luxe';
    estimatedCost?: string;
    steps?: Array<{
      step: number;
      title: string;
      description: string;
    }>;
  };
}

export type Content = GuideContent | StoryContent | ConcertContent | UpcomingConcertContent | VenueContent | BudgetContent | GearContent | InspirationContent | TipContent;

export const CATEGORY_LABELS = {
  guide: 'Guide 🗺️',
  recit: 'Récit 📖',
  concert: 'Concert 🎵',
  'upcoming-concert': 'Concert à venir 📅',
  venue: 'Salle 🏟️',
  budget: 'Budget 💰',
  materiel: 'Matériel ⭐',
  inspiration: 'Inspiration ✨',
  conseil: 'Conseil 💡'
} as const;