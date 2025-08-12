/*
  # Add Site Settings Table
  
  1. New Table
    - `site_settings`
      - `id` (uuid, primary key)
      - `key` (text, unique) - clé du paramètre
      - `value` (jsonb) - valeur du paramètre
      - `category` (text) - catégorie du paramètre
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `author_id` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `site_settings` table
    - Add policies for authenticated users to manage settings
    - Public read access for settings
    
  3. Default Settings
    - Insert default site settings
*/

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL DEFAULT '{}',
  category text DEFAULT 'general',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policies for site settings
CREATE POLICY "Public can read site settings"
  ON site_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage site settings"
  ON site_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger to automatically update updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default site settings
INSERT INTO site_settings (key, value, category) VALUES
  ('site_identity', '{
    "siteName": "POP travel",
    "siteTagline": "✈️ Voyage avec style"
  }', 'identity'),
  ('hero_section', '{
    "heroTitle": "POP travel",
    "heroSubtitle": "Découvre le monde avec style ✨ Des récits authentiques, des guides pratiques et des inspirations pour tes prochaines aventures 🗺️"
  }', 'content'),
  ('about_section', '{
    "aboutTitle": "À propos de POP travel 🤍",
    "aboutDescription": "Salut, moi c''est POP ! ✌️ Passionnée de voyage depuis toujours, je partage mes aventures pour t''inspirer à découvrir le monde autrement."
  }', 'content'),
  ('contact_social', '{
    "contactEmail": "pop@travel.com",
    "socialInstagram": "#",
    "socialYoutube": "#"
  }', 'contact'),
  ('newsletter', '{
    "newsletterText": "Reçois mes derniers articles, bons plans et inspirations directement dans ta boîte mail ! ✨"
  }', 'content')
ON CONFLICT (key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON site_settings(category);
