import React from 'react';
import { GraduationCap, Users } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'tutor' | 'trainee') => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Welcome to Learning Platform</h1>
      <div className="grid grid-cols-2 gap-8">
        <button
          onClick={() => onNavigate('tutor')}
          className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <GraduationCap size={48} className="text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Tutor Module</h2>
          <p className="text-gray-600 text-center">
            Access your teaching dashboard and connect with trainees
          </p>
        </button>
        <button
          onClick={() => onNavigate('trainee')}
          className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <Users size={48} className="text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Trainee Module</h2>
          <p className="text-gray-600 text-center">
            Join sessions and interact with your tutors
          </p>
        </button>
      </div>
    </div>
  );
}