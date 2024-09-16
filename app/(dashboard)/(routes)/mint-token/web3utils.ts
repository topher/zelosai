import { useContractWrite, useTransaction } from 'wagmi';
import contractABI from './contractABI_test.json';

export const useMintToken = () => {
  const { data, isLoading: isWriteLoading, isSuccess: isWriteSuccess, isError: isWriteError, writeAsync } = useContractWrite({
    address: '0x48E9695aF6e04076a2DeC713B0C96CE0fDbb167b',
    abi: contractABI,
    functionName: 'mint',
  });

  const { isLoading: isTransactionLoading, isSuccess: isTransactionSuccess } = useTransaction({
    hash: data?.hash,
  });

  const mintToken = async (...args: any[]) => {
    try {
      if (writeAsync) {
        const tx = await writeAsync({ args });
        console.log('Transaction submitted:', tx);
        return tx;
      } else {
        throw new Error('Write function is not available');
      }
    } catch (error) {
      console.error('Error minting token:', error);
      throw error;
    }
  };

  return {
    mintToken,
    isLoading: isWriteLoading || isTransactionLoading,
    isSuccess: isWriteSuccess && isTransactionSuccess,
    isError: isWriteError,
  };
}