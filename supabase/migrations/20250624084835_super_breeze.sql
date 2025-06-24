/*
  # User Analytics Schema

  1. New Tables
    - `user_analytics`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `coins` (integer)
      - `gems` (integer)
      - `health` (integer)
      - `max_health` (integer)
      - `zone` (integer)
      - `attack` (integer)
      - `defense` (integer)
      - `updated_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `user_analytics` table
    - Add policy for users to read/write their own analytics data
*/

CREATE TABLE IF NOT EXISTS user_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  coins integer DEFAULT 0,
  gems integer DEFAULT 0,
  health integer DEFAULT 200,
  max_health integer DEFAULT 200,
  zone integer DEFAULT 1,
  attack integer DEFAULT 50,
  defense integer DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own analytics"
  ON user_analytics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics"
  ON user_analytics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analytics"
  ON user_analytics
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS user_analytics_user_id_idx ON user_analytics(user_id);
CREATE INDEX IF NOT EXISTS user_analytics_updated_at_idx ON user_analytics(updated_at);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_user_analytics_updated_at
  BEFORE UPDATE ON user_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();