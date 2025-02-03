import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PreferencesPage from './pages/PreferencesPage';
import LearningPage from './pages/LearningPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <div className="min-h-screen bg-primary text-accent">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/learn" element={<LearningPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;