// web3Utils.ts
import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { AbiItem } from 'web3-utils';
import contractABI from './contractABI_test.json';
import athleteMetadata from './athlete_metadata.json';
import { MINT_STATE } from './TokenContext';

let _web3Modal: Web3Modal | null = null;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "91868d9f79dd4ebaa626366fafcf21e6"
    }
  }
};

const initializeWeb3Modal = () => {
  if (typeof window !== 'undefined') {
    if (!_web3Modal) {
      _web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions
      });
    }
  }
};

export const getWeb3Instance = (): Web3Modal | null => {
  if (!_web3Modal) {
    initializeWeb3Modal();
  }
  return _web3Modal;
};

export const mintToken = async (): Promise<{ state: MINT_STATE, data?: string }> => {
  initializeWeb3Modal();
  const web3Modal = getWeb3Instance();
  if (!web3Modal) {
    throw new Error("Web3Modal is not initialized");
  }

  return new Promise(async (resolve, reject) => {
    try {
      const provider = await web3Modal.connect();
      console.log("mint token provider =>", provider);

      const contractAddress = "0x48E9695aF6e04076a2DeC713B0C96CE0fDbb167b";

      if (typeof provider !== 'undefined') {
        const web3 = new Web3(provider);
        const zelosContract = new web3.eth.Contract(contractABI as AbiItem[], contractAddress);
        const wallet_address = provider.selectedAddress as keyof typeof athleteMetadata;
        const token_url = athleteMetadata[wallet_address]["token_url"];
        const royaltyReceiver = athleteMetadata[wallet_address]["royalty_group_address"];
        let royaltyFee = 750;
        let transactionId: string | null = null;

        zelosContract.methods
          .mint(wallet_address, token_url, royaltyReceiver, royaltyFee)
          .send({ from: wallet_address })
          .on('error', function (error: any) {
            resolve({ state: MINT_STATE.ERROR });
            console.log("!!! error", error);
          })
          .on('transactionHash', function (transactionHash: string) {
            transactionId = transactionHash;
            console.log("!!! transactionHash", transactionHash);
          })
          .then(function (newContractInstance: any) {
            resolve({ state: MINT_STATE.COMPLETED, data: transactionId });
            console.log("!!! done ", newContractInstance.address);
          });
      }
    } catch (error) {
      console.error("Error in mintToken:", error);
      resolve({ state: MINT_STATE.ERROR });
    }
  });
};

export const getSelectedAddress = async () => {
  initializeWeb3Modal();
  const web3Modal = getWeb3Instance();
  if (!web3Modal) {
    throw new Error("Web3Modal is not initialized");
  }

  const provider = await web3Modal.connect();

  if (typeof provider !== 'undefined') {
    await provider.request({ method: 'eth_requestAccounts' })
      .then((accounts: Array<string>) => {
        const selectedAccount = accounts[0];
      })
      .catch((err: string) => {
        console.log(err);
      });

    return provider.selectedAddress;
  }
  return null;
};
