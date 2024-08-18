'use client'
import React from 'react';
import { mintToken } from './web3utils';

const MintTokenPage: React.FC = () => {
  const handleMint = async () => {
    try {
      const result = await mintToken();
      console.log(result);
    } catch (error) {
      console.error("Minting error", error);
    }
  };

  return (
    <div>
      <h1>Mint Token</h1>
      <button onClick={handleMint}>Mint My Token</button>
    </div>
  );
};

export default MintTokenPage;
