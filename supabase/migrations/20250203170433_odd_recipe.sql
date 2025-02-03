/*
  # Initial Schema Setup for PyREN

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `user_id` (references auth.users)
      - `name` (text)
      - `birthdate` (date)
      - `avatar_id` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `sticker_cards`
      - `id` (uuid, primary key)
      - `name` (text)
      - `image_url` (text)
      - `evolution_level` (int)
      - `description` (text)
    
    - `user_stickers`
      - `id` (uuid, primary key)
      - `user_id` (references auth.users)
      - `sticker_id` (references sticker_cards)
      - `unlocked_at` (timestamp)
    
    - `user_streaks`
      - `id` (uuid, primary key)
      - `user_id` (references auth.users)
      - `current_streak` (int)
      - `highest_streak` (int)
      - `last_activity_date` (date)
      - `topics_completed_today` (int)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  birthdate date NOT NULL,
  avatar_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_user_id UNIQUE (user_id)
);

-- Create sticker_cards table
CREATE TABLE sticker_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text NOT NULL,
  evolution_level int NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_stickers table
CREATE TABLE user_stickers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  sticker_id uuid REFERENCES sticker_cards NOT NULL,
  unlocked_at timestamptz DEFAULT now(),
  CONSTRAINT unique_user_sticker UNIQUE (user_id, sticker_id)
);

-- Create user_streaks table
CREATE TABLE user_streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  current_streak int DEFAULT 0,
  highest_streak int DEFAULT 0,
  last_activity_date date DEFAULT CURRENT_DATE,
  topics_completed_today int DEFAULT 0,
  CONSTRAINT unique_user_streak UNIQUE (user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sticker_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stickers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view sticker cards"
  ON sticker_cards FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own stickers"
  ON user_stickers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stickers"
  ON user_stickers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own streaks"
  ON user_streaks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks"
  ON user_streaks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert initial sticker cards
INSERT INTO sticker_cards (name, image_url, evolution_level, description) VALUES
  ('Pikachu', 'https://api.example.com/stickers/pikachu.png', 1, 'Electric mouse Pokemon'),
  ('Charmander', 'https://api.example.com/stickers/charmander.png', 1, 'Fire lizard Pokemon'),
  ('Bulbasaur', 'https://api.example.com/stickers/bulbasaur.png', 1, 'Grass seed Pokemon'),
  ('Squirtle', 'https://api.example.com/stickers/squirtle.png', 1, 'Tiny turtle Pokemon'),
  ('Pidgey', 'https://api.example.com/stickers/pidgey.png', 1, 'Tiny bird Pokemon'),
  ('Raichu', 'https://api.example.com/stickers/raichu.png', 2, 'Mouse Pokemon'),
  ('Charmeleon', 'https://api.example.com/stickers/charmeleon.png', 2, 'Flame Pokemon'),
  ('Ivysaur', 'https://api.example.com/stickers/ivysaur.png', 2, 'Seed Pokemon'),
  ('Wartortle', 'https://api.example.com/stickers/wartortle.png', 2, 'Turtle Pokemon'),
  ('Pidgeotto', 'https://api.example.com/stickers/pidgeotto.png', 2, 'Bird Pokemon');