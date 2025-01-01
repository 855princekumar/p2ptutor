import { useState, useEffect, useRef } from 'react';

export function useMediaDevices() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  const initializeMedia = async () => {
    try {
      // First check if we already have permissions
      const permissions = await navigator.permissions.query({ name: 'camera' as PermissionName });
      
      if (permissions.state === 'denied') {
        throw new Error('NotAllowedError');
      }

      // For testing, we'll use a lower resolution to improve performance
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 15 }
        },
        audio: true
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localStream.current = stream;
      setMediaError(null);
      return stream;
    } catch (error) {
      let errorMessage = 'Failed to access camera and microphone';
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Please enable camera and microphone access in your browser settings and refresh the page';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'No camera or microphone found. Please connect your devices and try again';
        }
      }
      
      setMediaError(errorMessage);
      throw error;
    }
  };

  const toggleVideo = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (localStream.current) {
        localStream.current.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  return {
    initializeMedia,
    localStream: localStream.current,
    isVideoOn,
    isAudioOn,
    toggleVideo,
    toggleAudio,
    mediaError
  };
}