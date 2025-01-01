import { useState } from 'react';
import { MockWallet } from '../utils/mockWallet';
import { MockContract } from '../utils/mockContract';

export function useSession() {
  const [sessionId, setSessionId] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(0);

  const connectWallet = async () => {
    const address = await MockWallet.connect();
    setIsConnected(true);
    setBalance(MockWallet.getBalance());
    return address;
  };

  const createSession = async (
    tutorAddress: string,
    traineeAddress: string,
    amount: number,
    nftId: string
  ) => {
    try {
      const id = await MockContract.createSession(
        tutorAddress,
        traineeAddress,
        amount,
        nftId
      );
      setSessionId(id);
      return id;
    } catch (error) {
      console.error('Failed to create session:', error);
      throw error;
    }
  };

  const confirmSession = async (address: string) => {
    if (!sessionId) return false;
    return MockContract.confirmSession(sessionId, address);
  };

  return {
    sessionId,
    isConnected,
    balance,
    connectWallet,
    createSession,
    confirmSession
  };
}