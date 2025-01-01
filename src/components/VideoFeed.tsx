import React from 'react';

interface VideoFeedProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isMuted?: boolean;
  isMirrored?: boolean;
  label: string;
  labelColor: string;
}

export function VideoFeed({ 
  videoRef, 
  isMuted = false, 
  isMirrored = false,
  label,
  labelColor
}: VideoFeedProps) {
  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isMuted}
        className={`w-full rounded-lg bg-gray-800 ${
          isMirrored ? 'scale-x-[-1]' : ''
        }`}
      />
      <div className="absolute bottom-4 left-4">
        <span className={`${labelColor} text-white px-2 py-1 rounded-md text-sm`}>
          {label}
        </span>
      </div>
    </div>
  );
}