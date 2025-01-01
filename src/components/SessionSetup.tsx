import React, { useState } from 'react';
import { useSession } from '../hooks/useSession';
import { Wallet, Check, X } from 'lucide-react';

interface SessionSetupProps {
  role: 'tutor' | 'trainee';
  onSessionStart: () => void;
}

export function SessionSetup({ role, onSessionStart }: SessionSetupProps) {
  const [nftId, setNftId] = useState('');
  const [amount, setAmount] = useState('');
  const { isConnected, balance, connectWallet, createSession } = useSession();

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleStartSession = async () => {
    if (!isConnected || !nftId) return;

    try {
      if (role === 'tutor') {
        // For demo, we're using a mock trainee address
        const traineeAddress = '0x' + Math.random().toString(16).slice(2, 42);
        await createSession(
          await connectWallet(),
          traineeAddress,
          Number(amount),
          nftId
        );
      }
      onSessionStart();
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Session Setup</h2>
      
      {!isConnected ? (
        <button
          onClick={handleConnect}
          className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          <Wallet size={20} />
          <span>Connect Wallet</span>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span className="text-sm font-medium text-gray-600">Balance:</span>
            <span className="font-semibold">{balance} EDUCA</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">NFT ID</label>
            <input
              type="text"
              value={nftId}
              onChange={(e) => setNftId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your Open Campus ID"
            />
          </div>
          
          {role === 'tutor' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Session Amount (EDUCA)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter amount"
              />
            </div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={handleStartSession}
              className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              <Check size={20} />
              <span>Start Session</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              <X size={20} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}