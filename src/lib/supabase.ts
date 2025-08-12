import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fake user for testing
const fakeUser = {
  id: 'fake-user-123',
  email: 'pop@travel.com',
  user_metadata: {
    full_name: 'POP Travel',
    avatar_url: ''
  }
};

// Fake content storage for testing
let fakeContents: any[] = [
  {
    id: '1',
    title: 'Mon premier récit de voyage 🌍',
    content: 'Voici mon premier récit de voyage incroyable ! Cette aventure a commencé quand j\'ai décidé de partir à l\'aventure...',
    category: 'recit',
    status: 'published',
    image_url: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
    excerpt: 'Une aventure incroyable qui a changé ma vision du voyage',
    tags: ['aventure', 'voyage', 'découverte'],
    metadata: {},
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    author_id: 'fake-user-123'
  },
  {
    id: '2',
    title: 'Concert magique à Paris 🎵',
    content: 'Hier soir, j\'ai assisté à un concert absolument magique à Paris. L\'ambiance était électrique...',
    category: 'concert',
    status: 'published',
    image_url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    excerpt: 'Une soirée musicale inoubliable dans la capitale',
    tags: ['concert', 'musique', 'paris'],
    metadata: {},
    created_at: '2024-01-20T20:00:00Z',
    updated_at: '2024-01-20T20:00:00Z',
    author_id: 'fake-user-123'
  }
];

// Create a reusable query builder mock that supports chaining
const mockQueryBuilder = {
  _filters: [] as any[],
  _limit: null as number | null,
  eq: function(column: string, value: any) {
    this._filters.push({ column, value });
    return this;
  },
  order: function() {
    return this;
  },
  limit: function(count: number) {
    this._limit = count;
    return this;
  },
  then: function(resolve: any) {
    // Simulate database queries with fake data
    let results = [...fakeContents];
    
    // Apply basic filtering
    if (this._filters.length > 0) {
      results = results.filter(item => {
        return this._filters.every((filter: any) => {
          if (filter.column === 'status' && filter.value === 'published') {
            return item.status === 'published';
          }
          if (filter.column === 'category') {
            return item.category === filter.value;
          }
          return true;
        });
      });
    }
    
    // Apply limit
    if (this._limit) {
      results = results.slice(0, this._limit);
    }
    
    resolve({ data: results, error: null });
  }
};

let supabase: any;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://your-project-id.supabase.co' || supabaseAnonKey === 'your-anon-key-here') {
  console.warn('Supabase not configured. Using fake data for testing.');
  
  // Create a mock client to prevent errors
  supabase = {
    auth: {
      signInWithOAuth: () => {
        // Simulate successful login
        setTimeout(() => {
          console.log('Fake login successful!');
        }, 1000);
        return Promise.resolve({ data: { user: fakeUser }, error: null });
      },
      getUser: () => Promise.resolve({ data: { user: fakeUser }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: { user: fakeUser } }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => {
        // Reset filters for new query
        mockQueryBuilder._filters = [];
        mockQueryBuilder._limit = null;
        return mockQueryBuilder;
      },
      insert: (data: any[]) => {
        // Add new content to fake storage
        const newContent = {
          ...data[0],
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          author_id: fakeUser.id
        };
        fakeContents.push(newContent);
        console.log('Fake content added:', newContent);
        return Promise.resolve({ data: [newContent], error: null });
      },
      update: (data: any) => ({
        eq: (column: string, value: any) => {
          // Update content in fake storage
          const index = fakeContents.findIndex(item => item[column] === value);
          if (index !== -1) {
            fakeContents[index] = { ...fakeContents[index], ...data, updated_at: new Date().toISOString() };
            console.log('Fake content updated:', fakeContents[index]);
          }
          return Promise.resolve({ data: fakeContents[index] || null, error: null });
        }
      }),
      delete: () => ({
        eq: (column: string, value: any) => {
          // Delete content from fake storage
          const index = fakeContents.findIndex(item => item[column] === value);
          if (index !== -1) {
            const deleted = fakeContents.splice(index, 1)[0];
            console.log('Fake content deleted:', deleted);
            return Promise.resolve({ data: deleted, error: null });
          }
          return Promise.resolve({ data: null, error: null });
        }
      })
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Types pour le contenu
export interface Content {
  id: string;
  title: string;
  content: string;
  category: 'page' | 'recit' | 'concert' | 'guide' | 'inspiration' | 'conseil';
  status: 'draft' | 'published';
  image_url?: string;
  excerpt?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  author_id: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, any>;
  category: string;
  created_at: string;
  updated_at: string;
  author_id?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  created_at: string;
}

export { supabase };