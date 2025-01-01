import React from 'react';
import { Video, VideoOff, Mic, MicOff } from 'lucide-react';

interface VideoControlsProps {
  isVideoOn: boolean;
  isAudioOn: boolean;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
}

export function VideoControls({
  isVideoOn,
  isAudioOn,
  onToggleVideo,
  onToggleAudio
}: VideoControlsProps) {
  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={onToggleVideo}
        className={`p-3 rounded-full ${
          isVideoOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'
        } text-white transition-colors`}
      >
        {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
      </button>
      <button
        onClick={onToggleAudio}
        className={`p-3 rounded-full ${
          isAudioOn ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'
        } text-white transition-colors`}
      >
        {isAudioOn ? <Mic size={24} /> : <MicOff size={24} />}
      </button>
    </div>
  );
}