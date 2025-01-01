import React from 'react';
import { HomeIcon, GraduationCap, Users } from 'lucide-react';

interface NavigationProps {
  onNavigate: (page: 'home' | 'tutor' | 'trainee') => void;
  currentPage: string;
}

export function Navigation({ onNavigate, currentPage }: NavigationProps) {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-8">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentPage === 'home' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <HomeIcon size={20} />
            <span>Home</span>
          </button>
          <button
            onClick={() => onNavigate('tutor')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentPage === 'tutor' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <GraduationCap size={20} />
            <span>Tutor</span>
          </button>
          <button
            onClick={() => onNavigate('trainee')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              currentPage === 'trainee' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users size={20} />
            <span>Trainee</span>
          </button>
        </div>
      </div>
    </nav>
  );
}