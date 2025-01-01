import { useEffect, useRef } from 'react';
import { useMediaDevices } from './useMediaDevices';
import { usePeerConnection } from './usePeerConnection';

export function useWebRTC() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const {
    initializeMedia,
    localStream,
    isVideoOn,
    isAudioOn,
    toggleVideo,
    toggleAudio,
    mediaError
  } = useMediaDevices();

  const { initialize: initializePeer, addTracks } = usePeerConnection();

  useEffect(() => {
    const setupConnection = async () => {
      try {
        const stream = await initializeMedia();
        if (localVideoRef.current && stream) {
          localVideoRef.current.srcObject = stream;
        }

        const peer = initializePeer();
        if (stream) {
          addTracks(stream);
        }

        peer.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };
      } catch (error) {
        // Error is already handled in useMediaDevices
        console.debug('WebRTC setup:', error);
      }
    };

    setupConnection();
  }, [initializeMedia, initializePeer, addTracks]);

  return {
    localVideoRef,
    remoteVideoRef,
    isVideoOn,
    isAudioOn,
    toggleVideo,
    toggleAudio,
    mediaError
  };
}