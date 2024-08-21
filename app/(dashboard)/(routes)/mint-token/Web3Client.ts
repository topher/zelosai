import { MINT_STATE, UserProfile } from './TokenContext';
import Web3 from 'web3';
import fetch from 'node-fetch';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { AbiItem } from 'web3-utils';
import contractABI from './contractABI_test.json';


// Correct: import the JSON data and ensure the object is typed
import athleteMetadata from './athlete_metadata.json';

// Define the type separately (if not already done)
type AthleteMetadata = {
  token_url: string;
  royalty_group_address: string;
  role_granted: string;
};

type AthleteMetadataCollection = {
  [key: string]: AthleteMetadata;
};

// Cast the imported JSON data to the type
const athleteMetadataTyped: AthleteMetadataCollection = athleteMetadata;

let _web3Modal: Web3Modal | null = null;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "91868d9f79dd4ebaa626366fafcf21e6" // required
    }
  }
};

let selectedAccount: string | null = null;

const initializeWeb3Modal = () => {
  if (typeof window !== 'undefined') { // Check if window is available
    if (!_web3Modal) {
      _web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
      });
    }
  }
};

const generateWeb3Instance = (): Web3Modal => {
	_web3Modal = new Web3Modal({
		network: "mainnet", // optional
		cacheProvider: true, // optional
		providerOptions // required
	});
	return _web3Modal
}


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
        selectedAccount = accounts[0];
      })
      .catch((err: string) => {
        console.log(err);
      });

    return provider.selectedAddress;
  }
  return null;
};

export const getMetadataFromApiAsync = async (): Promise<UserProfile> => {
  return new Promise(async (resolve, reject) => {
    const wallet_address = await getSelectedAddress();

    if (!wallet_address) {
      return reject("Wallet address not found");
    }

    if (!(wallet_address in athleteMetadata)) {
      return reject("No metadata found for the wallet address");
    }

    const token_url = athleteMetadataTyped[wallet_address].token_url;

    console.log("url!!!", wallet_address.toLowerCase());

    return fetch(`${token_url}`)
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const connectWallet = async () => {
	const web3Modal = generateWeb3Instance()
	const provider = await web3Modal.connect()

	console.log("qwerty", provider)

	if (typeof provider !== 'undefined') {
		// checks if metamask is installed

		provider
			.request({ method: 'eth_requestAccounts' })
			.then((accounts: Array<string>) => {
				selectedAccount = accounts[0];
				console.log(`Selected account is ${selectedAccount}`);
			})
			.catch((err: string) => {
				console.log(err);
			});
	}

}


export const disconnectWallet = async () => {
	const web3Modal = getWeb3Instance()
	const provider = await web3Modal.connect()

	try {
		if (provider === undefined || provider === null) {
			return;
		}

		if (typeof provider.disconnect === "function") {
			console.info("Disconnected provider...");
			await provider.disconnect();
			await web3Modal.clearCachedProvider();
			localStorage.clear();
		}

		if (web3Modal) {
			console.info("Cleared web3 modal...");
			localStorage.clear();
		}

		console.info("Completed logout!");
	}
	catch (err) {
		console.info("Could not clear wallet provider...", err);
		localStorage.clear();
	}

	new Web3(provider);
}

export default mintToken;
