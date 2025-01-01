import React, { useState } from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { VideoChat } from '../components/VideoChat';
import { SessionSetup } from '../components/SessionSetup';
import { Message } from '../types';

interface TraineeProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export function Trainee({ messages, onSendMessage }: TraineeProps) {
  const [sessionStarted, setSessionStarted] = useState(false);

  if (!sessionStarted) {
    return (
      <div className="max-w-md mx-auto p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Join Learning Session</h1>
        <SessionSetup role="trainee" onSessionStart={() => setSessionStarted(true)} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Trainee Dashboard</h1>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-8">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Video Session</h2>
          <VideoChat role="trainee" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Chat</h2>
          <ChatInterface
            role="trainee"
            messages={messages}
            onSendMessage={onSendMessage}
          />
        </div>
      </div>
    </div>
  );
}