import React from 'react';
import { VideoFeed } from './VideoFeed';
import { VideoControls } from './VideoControls';
import { useWebRTC } from '../hooks/useWebRTC';
import { AlertCircle } from 'lucide-react';

interface VideoChatProps {
  role: 'tutor' | 'trainee';
}

export function VideoChat({ role }: VideoChatProps) {
  const {
    localVideoRef,
    remoteVideoRef,
    isVideoOn,
    isAudioOn,
    toggleVideo,
    toggleAudio,
    mediaError
  } = useWebRTC();

  if (mediaError) {
    return (
      <div className="rounded-lg bg-red-50 p-6 border border-red-200">
        <div className="flex items-center space-x-3 text-red-600">
          <AlertCircle className="flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold">Camera and Microphone Access Required</h3>
            <p className="mt-1 text-sm">{mediaError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-3 text-sm bg-red-100 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <VideoFeed
          videoRef={localVideoRef}
          isMuted={true}
          isMirrored={true}
          label={`You (${role})`}
          labelColor="bg-blue-500"
        />
        <VideoFeed
          videoRef={remoteVideoRef}
          label={role === 'tutor' ? 'Trainee' : 'Tutor'}
          labelColor="bg-green-500"
        />
      </div>
      <VideoControls
        isVideoOn={isVideoOn}
        isAudioOn={isAudioOn}
        onToggleVideo={toggleVideo}
        onToggleAudio={toggleAudio}
      />
    </div>
  );
}