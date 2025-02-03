import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Bot, Cpu, Ship as Chip, BrainCircuit as Circuit } from 'lucide-react';

const ROBOT_AVATARS = [
  { 
    id: 'bot1', 
    name: 'ByteBot', 
    icon: <Bot className="w-16 h-16 text-accent" /> 
  },
  { 
    id: 'bot2', 
    name: 'CircuitCore', 
    icon: <Circuit className="w-16 h-16 text-accent" /> 
  },
  { 
    id: 'bot3', 
    name: 'DataDroid', 
    icon: <Cpu className="w-16 h-16 text-accent" /> 
  },
  { 
    id: 'bot4', 
    name: 'QuantumBot', 
    icon: <Chip className="w-16 h-16 text-accent" /> 
  },
];

const QUESTIONS = [
  {
    id: 'name',
    question: "What's your name, future Python master?",
    type: 'text'
  },
  {
    id: 'style',
    question: 'How would you like to learn Python?',
    type: 'choice',
    options: [
      { id: 'fun', label: 'Fun and Interactive' },
      { id: 'classic', label: 'Classic and Structured' }
    ]
  },
  {
    id: 'pace',
    question: 'What learning pace suits you best?',
    type: 'choice',
    options: [
      { id: 'fast', label: 'Quick Learner' },
      { id: 'moderate', label: 'Steady Pace' },
      { id: 'slow', label: 'Take My Time' }
    ]
  },
  {
    id: 'avatar',
    question: 'Choose your robot companion',
    type: 'avatar'
  }
];

function PreferencesPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    name: '',
    style: '',
    pace: '',
    avatar: ''
  });

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/learn');
    }
  };

  const currentQuestion = QUESTIONS[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-primary-light/30 backdrop-blur-xl rounded-2xl p-8 border border-accent/10">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-accent">
                {currentQuestion.question}
              </h2>
              <span className="text-accent/50">
                Step {currentStep + 1}/{QUESTIONS.length}
              </span>
            </div>

            <div className="min-h-[300px] flex items-center justify-center">
              {currentQuestion.type === 'text' && (
                <input
                  type="text"
                  value={preferences.name}
                  onChange={(e) => setPreferences(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-6 py-4 bg-primary/50 rounded-xl border border-accent/20 focus:border-accent/40 text-accent text-xl text-center focus:outline-none"
                  placeholder="Enter your name"
                  autoFocus
                />
              )}

              {currentQuestion.type === 'choice' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {currentQuestion.options.map(option => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setPreferences(prev => ({ ...prev, [currentQuestion.id]: option.id }));
                        handleNext();
                      }}
                      className="p-6 bg-primary/50 rounded-xl border border-accent/20 hover:border-accent/40 hover:bg-primary-light/50 transition-all duration-300"
                    >
                      <span className="text-lg text-accent">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'avatar' && (
                <div className="grid grid-cols-2 gap-6 w-full">
                  {ROBOT_AVATARS.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => {
                        setPreferences(prev => ({ ...prev, avatar: avatar.id }));
                        handleNext();
                      }}
                      className={`relative group p-6 rounded-xl transition-all duration-300 ${
                        preferences.avatar === avatar.id
                          ? 'bg-accent/20 ring-2 ring-accent'
                          : 'bg-primary/50 hover:bg-primary-light/50 border border-accent/20 hover:border-accent/40'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-4">
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          {avatar.icon}
                        </div>
                        <p className="text-accent font-medium">{avatar.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {currentQuestion.type === 'text' && (
              <Button
                size="lg"
                className="w-full"
                onClick={handleNext}
                disabled={!preferences.name.trim()}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreferencesPage