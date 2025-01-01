import { useRef, useEffect } from 'react';

export function usePeerConnection() {
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  const initialize = () => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    };

    peerConnection.current = new RTCPeerConnection(configuration);
    return peerConnection.current;
  };

  const addTracks = (stream: MediaStream) => {
    stream.getTracks().forEach(track => {
      peerConnection.current?.addTrack(track, stream);
    });
  };

  useEffect(() => {
    return () => {
      peerConnection.current?.close();
    };
  }, []);

  return {
    initialize,
    addTracks,
    peerConnection: peerConnection.current
  };
}