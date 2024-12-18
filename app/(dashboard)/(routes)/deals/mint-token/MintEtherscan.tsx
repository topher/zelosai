// import { AppNavbar } from "components/AppNavbar";
import { TokenContext } from "./TokenContext";
import React, { useContext, useMemo } from "react";

export default function MintEtherscan() {
  const { mintResult } = useContext(TokenContext);

  const source = useMemo(
    () => `http://etherscan.io/tx/${mintResult?.transactionId}`,
    [mintResult?.transactionId]
  );

  return (
    <div className="container-fluid">
      <iframe src={source} title="etherscan" />
    </div>
  );
}
