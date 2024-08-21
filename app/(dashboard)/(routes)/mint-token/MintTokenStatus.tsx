'use client'
import { MINT_STATE, TokenContext } from "./TokenContext";
import Lottie from "lottie-react";
import { useContext, useMemo } from "react";
import ErrorAnimation from "@/public/archive/animation/error.json";
import CompletedAnimation from "@/public/archive/animation/error.json";
import { useNavigate } from "react-router-dom";

export default function MintTokenStatus() {
  const navigation = useNavigate();
  const { mintResult } = useContext(TokenContext);

  const icon = useMemo(() => {
    if (mintResult?.scenario === MINT_STATE.ERROR) {
      return ErrorAnimation;
    } else {
      return CompletedAnimation;
    }
  }, [mintResult]);

  return (
    <div className="container-fluid multi-token-status__container">
      <div className="icon">
        <Lottie width={300} height={200} loop={false} animationData={icon} />
        <div className="message">{mintResult?.statusHeader}</div>
        {mintResult?.buttonCTA && (
          <button
            className="mint-token__btn btn mt-4"
            onClick={() =>
              window.open(`http://etherscan.io/tx/${mintResult?.transactionId}`)
            }
          >
            {mintResult?.buttonCTA}
          </button>
        )}
      </div>
    </div>
  );
}
