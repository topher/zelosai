import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { useState } from 'react';

export const useWeb3Client = () => {
  const { connectAsync, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const connector = connectors[0];
      await connectAsync({ connector });
      setConnectedAddress(address); // Use the address from useAccount hook
      console.log(`Connected account: ${address}`);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnectAsync();
      setConnectedAddress(null);
      console.log('Wallet disconnected');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  return {
    connectWallet,
    disconnectWallet,
    connectedAddress,
    isConnected,
  };
};
