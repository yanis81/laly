/*
  # Content Management System for POP Travel Blog

  1. New Tables
    - `content`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, required) 
      - `category` (text, required) - type de contenu
      - `status` (text, default 'draft') - brouillon ou publié
      - `image_url` (text, optional) - image principale
      - `excerpt` (text, optional) - résumé court
      - `tags` (text array, optional) - mots-clés
      - `metadata` (jsonb, optional) - données spécifiques par catégorie
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `author_id` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `content` table
    - Add policies for authenticated users to manage content
    - Public read access for published content
*/

-- Create content table
CREATE TABLE IF NOT EXISTS content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL CHECK (category IN ('page', 'recit', 'concert', 'guide', 'inspiration', 'conseil')),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  image_url text,
  excerpt text,
  tags text[] DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Policies for content management
CREATE POLICY "Public can read published content"
  ON content
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage their content"
  ON content
  FOR ALL
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_content_updated_at
  BEFORE UPDATE ON content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_category ON content(category);
CREATE INDEX IF NOT EXISTS idx_content_status ON content(status);
CREATE INDEX IF NOT EXISTS idx_content_created_at ON content(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_author ON content(author_id);