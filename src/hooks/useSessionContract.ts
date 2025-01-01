import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './useWallet';
import TutorSessionABI from '../contracts/TutorSession.json';

const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';

export function useSessionContract() {
  const { provider, account } = useWallet();
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    if (provider && account) {
      const signer = provider.getSigner();
      const sessionContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        TutorSessionABI,
        signer
      );
      setContract(contract);
    }
  }, [provider, account]);

  const createSession = async (amount: string) => {
    if (!contract || !account) return;
    
    try {
      const tx = await contract.createSession(amount);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  };

  const approveSession = async (amount: string) => {
    if (!contract || !account) return;
    
    try {
      const tx = await contract.approve(amount);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error approving session:', error);
      throw error;
    }
  };

  const confirmSessionEnd = async (sessionId: string) => {
    if (!contract || !account) return;
    
    try {
      const tx = await contract.confirmSession(sessionId);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error confirming session end:', error);
      throw error;
    }
  };

  return {
    createSession,
    approveSession,
    confirmSessionEnd
  };
}