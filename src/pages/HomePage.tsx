import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Code, Brain, Zap } from 'lucide-react';
import { Button } from '../components/Button';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="relative">
            <Bot className="w-24 h-24 text-accent animate-float" />
            <div className="absolute inset-0 bg-accent/20 blur-3xl -z-10" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
              PyREN
            </span>
            <span className="block text-2xl md:text-3xl mt-2 text-accent/80">
              Your AI Python Tutor
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-accent/70 max-w-2xl leading-relaxed">
            Embark on an exciting journey into Python programming with your personal AI tutor.
            Interactive lessons, hands-on coding, and a friendly robot guide await!
          </p>

          <Button 
            size="lg" 
            onClick={() => navigate('/preferences')}
            className="group"
          >
            <span className="flex items-center gap-3">
              Start Your Journey
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl">
            {[
              {
                icon: <Bot className="w-8 h-8 text-accent" />,
                title: "AI-Powered Learning",
                description: "Personalized guidance from your robot tutor"
              },
              {
                icon: <Code className="w-8 h-8 text-accent" />,
                title: "Interactive Coding",
                description: "Write and run Python code in real-time"
              },
              {
                icon: <Brain className="w-8 h-8 text-accent" />,
                title: "Adaptive Lessons",
                description: "Learn at your own pace with custom content"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="relative group p-8 rounded-2xl bg-primary-light/50 backdrop-blur-lg border border-accent/10 hover:border-accent/20 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-accent/5 rounded-2xl blur-xl group-hover:bg-accent/10 transition-all duration-300" />
                <div className="relative space-y-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-accent">{feature.title}</h3>
                  <p className="text-accent/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage