import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Star, Trophy, Zap } from 'lucide-react';
import { Button } from '../components/Button';

interface Sticker {
  id: string;
  name: string;
  image_url: string;
  evolution_level: number;
  description: string;
}

interface Profile {
  name: string;
  birthdate: string;
  avatar_id: string;
}

interface UserStreak {
  current_streak: number;
  highest_streak: number;
  topics_completed_today: number;
}

const ProfilePage = ()=> {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [streak, setStreak] = useState<UserStreak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Load unlocked stickers
      const { data: stickerData } = await supabase
        .from('user_stickers')
        .select(`
          sticker_cards (
            id,
            name,
            image_url,
            evolution_level,
            description
          )
        `)
        .eq('user_id', user.id);

      // Load streak data
      const { data: streakData } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setProfile(profileData);
      setStickers(stickerData?.map(s => s.sticker_cards) || []);
      setStreak(streakData);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
        <div className="animate-spin text-accent">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="col-span-1">
            <div className="bg-primary-light/30 backdrop-blur-xl rounded-2xl p-8 border border-accent/10">
              <div className="flex flex-col items-center">
                <img
                  src={`https://api.example.com/avatars/${profile?.avatar_id}.png`}
                  alt="Profile Avatar"
                  className="w-32 h-32 rounded-full border-4 border-accent/20"
                />
                <h2 className="text-2xl font-bold mt-4 text-accent">{profile?.name}</h2>
                
                <div className="mt-6 w-full space-y-4">
                  <div className="flex items-center justify-between p-4 bg-primary/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-accent" />
                      <span className="text-accent/70">Current Streak</span>
                    </div>
                    <span className="text-accent font-bold">{streak?.current_streak} bops 🌀</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-primary/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-accent" />
                      <span className="text-accent/70">Highest Streak</span>
                    </div>
                    <span className="text-accent font-bold">{streak?.highest_streak} bops 🌀</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-primary/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-accent" />
                      <span className="text-accent/70">Today's Topics</span>
                    </div>
                    <span className="text-accent font-bold">{streak?.topics_completed_today}/3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticker Collection */}
          <div className="col-span-2">
            <div className="bg-primary-light/30 backdrop-blur-xl rounded-2xl p-8 border border-accent/10">
              <h3 className="text-xl font-bold mb-6 text-accent">Sticker Collection</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 10 }).map((_, index) => {
                  const sticker = stickers[index];
                  return (
                    <div
                      key={index}
                      className={`relative group aspect-square rounded-xl overflow-hidden ${
                        sticker ? 'bg-primary/50' : 'bg-primary/20'
                      }`}
                    >
                      {sticker ? (
                        <div className="p-4 h-full flex flex-col items-center justify-center">
                          <img
                            src={sticker.image_url}
                            alt={sticker.name}
                            className="w-full h-auto transform group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <div className="text-accent text-center w-full">
                              <p className="font-bold">{sticker.name}</p>
                              <p className="text-sm text-accent/70">{sticker.description}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-accent/10 animate-pulse" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
