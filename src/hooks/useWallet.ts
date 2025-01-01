import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

export function useWallet() {
  const [account, setAccount] = useState<string>('');
  const [provider, setProvider] = useState<Web3Provider | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return;
    
    try {
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      return accounts[0];
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  const checkNFTOwnership = async (nftId: string): Promise<boolean> => {
    // Implement NFT ownership check logic here
    return true; // Placeholder
  };

  return {
    account,
    provider,
    connectWallet,
    checkNFTOwnership
  };
}