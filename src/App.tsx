import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Tutor } from './pages/Tutor';
import { Trainee } from './pages/Trainee';
import { DualViewTester } from './components/DualViewTester';
import { Message } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Check URL params for testing dual view
    const params = new URLSearchParams(window.location.search);
    const role = params.get('role');
    if (role === 'tutor' || role === 'trainee') {
      setCurrentPage(role);
    }
  }, []);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: currentPage as 'tutor' | 'trainee',
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  const handleNavigate = (page: 'home' | 'tutor' | 'trainee') => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="container mx-auto py-8">
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        {currentPage === 'tutor' && (
          <Tutor messages={messages} onSendMessage={handleSendMessage} />
        )}
        {currentPage === 'trainee' && (
          <Trainee messages={messages} onSendMessage={handleSendMessage} />
        )}
      </main>
      {currentPage === 'home' && <DualViewTester />}
    </div>
  );
}