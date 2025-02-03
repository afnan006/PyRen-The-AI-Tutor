import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Code, BookOpen, X, Send, Play, Book, ChevronRight, ChevronLeft, Bot } from 'lucide-react';
import { Button } from '../components/Button';
import { sendChatMessage } from '../lib/api';

type Tab = 'code' | 'lesson';
type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

function LearningPage() {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [code, setCode] = useState('# Write your Python code here\n');
  const [output, setOutput] = useState('');
  const [currentLesson, setCurrentLesson] = useState(1);
  const [currentTopic, setCurrentTopic] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi there! 👋 I'm PyBot, your AI Python tutor. I'm here to make learning Python super fun! What would you like to learn today?",
      timestamp: new Date()
    }
  ]);

  const lessons = [
    {
      title: "Introduction to Python",
      topics: [
        {
          title: "What is Python?",
          content: "Python is like a magical language that helps us tell computers what to do! It's one of the easiest programming languages to learn.",
          example: 'print("Hello, Python World!")'
        },
        {
          title: "Variables",
          content: "Variables are like special boxes where we can store different things - numbers, words, or even lists of things!",
          example: 'name = "PyBot"\nage = 3\nprint(f"I am {name} and I am {age} years old!")'
        }
      ]
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // const handleSendMessage = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!message.trim()) return;

  //   const userMessage = {
  //     role: 'user' as const,
  //     content: message,
  //     timestamp: new Date()
  //   };

  //   setChatMessages(prev => [...prev, userMessage]);
  //   setMessage('');
  //   setIsTyping(true);

const handleSendMessage = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!message.trim()) return;

  const userMessage = {
    role: 'user' as const,
    content: message,
    timestamp: new Date()
  };

  setChatMessages(prev => [...prev, userMessage]);
  setMessage('');

  setIsTyping(true);

  try {
    // Call the backend /api/chat endpoint to get a response from OpenAI
    const response = await sendChatMessage(message, chatMessages.map(msg => ({ role: msg.role, content: msg.content })));
    const aiResponse = {
      role: 'assistant' as const,
      content: response.response,
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, aiResponse]);
  } catch (error) {
    console.error('Error sending message:', error);
    setChatMessages(prev => [
      ...prev,
      {
        role: 'assistant' as const,
        content: "Oops! Something went wrong. Please try again.",
        timestamp: new Date(),
      }
    ]);
  } finally {
    setIsTyping(false);
  }
};

    

  return (
    <div className="h-screen flex bg-primary overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Chat Section (Always visible) */}
        <div className={`${activeTab ? 'w-1/2' : 'w-full'} h-full flex flex-col transition-all duration-300`}>
          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-auto dot-pattern">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.role === 'user'
                      ? 'bg-accent/20 ml-4'
                      : 'bg-primary-dark mr-4'
                  }`}
                >
                  <div className="prose prose-invert">
                    {msg.content}
                  </div>
                  <div className="text-xs text-accent/50 mt-1 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-primary-dark rounded-2xl p-4 mr-4">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-accent/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-accent/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-accent/10 bg-primary-dark/50 backdrop-blur-lg">
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about Python..."
                className="flex-1 px-4 py-3 rounded-xl bg-primary-light border border-accent/20 focus:border-accent/40 focus:outline-none placeholder:text-accent/50"
              />
              <Button type="submit" disabled={!message.trim() || isTyping}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>

        {/* Side Panel */}
        {activeTab && (
          <div className="w-1/2 border-l border-accent/10">
            {activeTab === 'code' && (
              <div className="h-full flex flex-col p-4">
                <div className="flex-1 bg-primary-dark rounded-xl border border-accent/20 overflow-hidden">
                  <div className="bg-primary-light/20 px-4 py-2 border-b border-accent/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                  </div>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-[calc(100%-2.5rem)] bg-transparent p-4 font-mono text-sm focus:outline-none resize-none"
                  />
                </div>
                <Button onClick={handleRunCode} className="mt-4">
                  <Play className="w-5 h-5 mr-2" /> Run Code
                </Button>
                {output && (
                  <div className="mt-4 bg-primary-dark rounded-xl border border-accent/20 p-4">
                    <pre className="font-mono text-sm whitespace-pre-wrap">
                      {output}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'lesson' && (
              <div className="h-full p-4">
                <div className="bg-primary-dark rounded-xl border border-accent/20 p-6 h-full">
                  <div className="flex justify-between items-center mb-6">
                    <button 
                      onClick={() => setCurrentTopic(prev => Math.max(0, prev - 1))}
                      disabled={currentTopic === 0}
                      className="p-2 rounded-lg hover:bg-accent/10 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-2xl font-bold">
                      {lessons[currentLesson - 1]?.topics[currentTopic]?.title}
                    </h2>
                    <button 
                      onClick={() => setCurrentTopic(prev => 
                        Math.min(lessons[currentLesson - 1]?.topics.length - 1, prev + 1)
                      )}
                      disabled={currentTopic === lessons[currentLesson - 1]?.topics.length - 1}
                      className="p-2 rounded-lg hover:bg-accent/10 disabled:opacity-50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg leading-relaxed">
                      {lessons[currentLesson - 1]?.topics[currentTopic]?.content}
                    </p>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-semibold mb-4">Try this example:</h3>
                    <div className="bg-primary-light/20 rounded-lg p-4 font-mono">
                      <pre>{lessons[currentLesson - 1]?.topics[currentTopic]?.example}</pre>
                    </div>
                    <Button className="mt-4">
                      Run Example
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Side Navigation */}
      <div className="w-20 bg-primary-dark flex flex-col items-center py-6 space-y-6 border-l border-accent/10">
        {['code', 'lesson'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(activeTab === tab ? null : tab as Tab)}
            className={`p-4 rounded-xl transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-accent/20 shadow-lg border border-accent/30' 
                : 'hover:bg-accent/10'
            }`}
          >
            {tab === 'code' && <Code className="w-6 h-6" />}
            {tab === 'lesson' && <BookOpen className="w-6 h-6" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LearningPage;