import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Mail, Lock, User, Calendar } from 'lucide-react';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';

type AuthMode = 'login' | 'signup';

const AVATARS = [
  {
    id: 'avatar1',
    name: 'Alex',
    imageUrl: 'https://api.example.com/avatars/3d-kid-1.png'
  },
  {
    id: 'avatar2',
    name: 'Sam',
    imageUrl: 'https://api.example.com/avatars/3d-kid-2.png'
  },
  {
    id: 'avatar3',
    name: 'Mei',
    imageUrl: 'https://api.example.com/avatars/3d-kid-3.png'
  },
  {
    id: 'avatar4',
    name: 'Raj',
    imageUrl: 'https://api.example.com/avatars/3d-kid-4.png'
  },
  {
    id: 'avatar5',
    name: 'Zara',
    imageUrl: 'https://api.example.com/avatars/3d-kid-5.png'
  },
  {
    id: 'avatar6',
    name: 'Omar',
    imageUrl: 'https://api.example.com/avatars/3d-kid-6.png'
  }
];

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'signup') {
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (authData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              user_id: authData.user.id,
              name,
              birthdate,
              avatar_id: selectedAvatar,
            });

          if (profileError) throw profileError;
        }

        navigate('/preferences');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        navigate('/learn');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 15; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-primary-light/30 backdrop-blur-xl rounded-2xl p-8 border border-accent/10">
          <div className="flex flex-col items-center mb-8">
            <Bot className="w-16 h-16 text-accent animate-float" />
            <h1 className="text-3xl font-bold mt-4 text-accent">
              {mode === 'login' ? 'Welcome Back!' : 'Join PyREN'}
            </h1>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-6">
            {mode === 'signup' && step === 1 && (
              <>
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-accent/50" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full pl-12 pr-4 py-3 bg-primary/50 rounded-xl border border-accent/20 focus:border-accent/40 text-accent placeholder:text-accent/50 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <select
                      className="px-4 py-3 bg-primary/50 rounded-xl border border-accent/20 focus:border-accent/40 text-accent focus:outline-none"
                      required
                    >
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>

                    <select
                      className="px-4 py-3 bg-primary/50 rounded-xl border border-accent/20 focus:border-accent/40 text-accent focus:outline-none"
                      required
                    >
                      <option value="">Month</option>
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>

                    <select
                      className="px-4 py-3 bg-primary/50 rounded-xl border border-accent/20 focus:border-accent/40 text-accent focus:outline-none"
                      required
                    >
                      <option value="">Year</option>
                      {generateYearOptions().map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full"
                  disabled={!name || !birthdate}
                >
                  Next
                </Button>
              </>
            )}

            {mode === 'signup' && step === 2 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {AVATARS.map((avatar) => (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={`relative p-4 rounded-xl transition-all duration-300 ${
                        selectedAvatar === avatar.id
                          ? 'bg-accent/20 ring-2 ring-accent'
                          : 'bg-primary/50 hover:bg-primary-light/50 border border-accent/20'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={avatar.imageUrl}
                          alt={avatar.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <span className="text-accent font-medium">{avatar.name}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full"
                  disabled={!selectedAvatar}
                >
                  Next
                </Button>
              </>
            )}

            {(mode === 'login' || (mode === 'signup' && step === 3)) && (
              <>
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-accent/50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full pl-12 pr-4 py-3 bg-primary/50 rounded-xl border border-accent/20 focus:border-accent/40 text-accent placeholder:text-accent/50 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-accent/50" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full pl-12 pr-4 py-3 bg-primary/50 rounded-xl border border-accent/20 focus:border-accent/40 text-accent placeholder:text-accent/50 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </Button>
              </>
            )}
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setStep(1);
              }}
              className="text-accent/70 hover:text-accent transition-colors"
            >
              {mode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AuthPage;
