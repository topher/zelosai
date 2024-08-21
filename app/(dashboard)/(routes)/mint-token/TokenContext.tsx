"use client"
import { mintStatusStates } from "./web3states";
import { createContext, useCallback, useState, ReactNode } from "react";

export type UserAttributes = {
  trait_type: string;
  value: string;
}
export type UserProfile = {
  image: string;
  attributes: UserAttributes[]
  description: string;
  name: string;
  animation_url: string;
}

export enum ACCOUNT_STATE {
  GUEST = "Connected",
  CONNECT = "Connect Wallet",
  MINT_TOKEN = "Mint Token",
}

export enum MINT_STATE {
  DEFAULT = "Default",
  ERROR = "Error",
  COMPLETED = "Completed",
  INPROGRESS = "Inprogress",
}

export type MintResult = {
  scenario?: string;
  statusHeader?: string;
  buttonCTA?: string;
  transactionId?: string;
  onPress?: () => void;
};

type AppContextProps = {
  mintState: MINT_STATE;
  web3BtnState: ACCOUNT_STATE;
  mintResult: MintResult;
  userProfile: UserProfile | null;
  onMintResult: (result: MintResult) => void;
  onAccountState: (accState: ACCOUNT_STATE) => void;
  onSetUserProfile: (profile: UserProfile) => void;
  onMintStateChange: (mintState: MINT_STATE) => void;
};

const TokenContext = createContext<AppContextProps>({
  mintResult: null,
  userProfile: null,
  onMintResult: () => {},
  onAccountState: () => {},
  onSetUserProfile: () => {},
  onMintStateChange: () => {},
  mintState: MINT_STATE.DEFAULT,
  web3BtnState: ACCOUNT_STATE.CONNECT,
});

type TokenProviderProps = {
  children: ReactNode;
};

const TokenProvider = ({ children }: TokenProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [mintState, setMintState] = useState<MINT_STATE>(MINT_STATE.DEFAULT);
  const [web3BtnState, setWeb3BtnState] = useState<ACCOUNT_STATE>(
    ACCOUNT_STATE.CONNECT
  );
  const [mintResult, setMintResult] = useState<MintResult>(
    mintStatusStates.Completed
  );

  const onSetUserProfile = useCallback((profile: UserProfile) => {
    setUserProfile(profile);
  }, []);

  const onAccountState = useCallback((accState: ACCOUNT_STATE) => {
    setWeb3BtnState(accState);
  }, []);

  const onMintStateChange = useCallback((state: MINT_STATE) => {
    setMintState(state);
  }, []);

  const onMintResult = useCallback((result: MintResult) => {
    setMintResult(result);
  }, []);

  return (
    <TokenContext.Provider
      value={{
        mintState,
        mintResult,
        userProfile,
        web3BtnState,
        onMintResult,
        onAccountState,
        onSetUserProfile,
        onMintStateChange,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export { TokenProvider, TokenContext };
