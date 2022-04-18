import { ethers } from "ethers";
import { FinnTheHuman } from "phosphor-react";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../store";
import { Spender, Spender__factory, Token, Token__factory } from "../typechain";
import Loader from "./Loader";

const User2 = () => {
  const { contract, provider, account, spender, reload } = useStoreState(
    (state) => state
  );
  const { setReload } = useStoreActions((actions) => actions);

  const [tokenBalance, setTokenBalance] = useState("0.0");
  const [pending, setPending] = useState(false);

  const getTokenContract = () => {
    return new ethers.Contract(
      contract,
      Token__factory.createInterface(),
      provider
    ) as Token;
  };

  const getSpender = () => {
    return new ethers.Contract(
      spender,
      Spender__factory.createInterface(),
      provider
    ) as Spender;
  };

  const bundleUp = async () => {
    const erc20 = getTokenContract();
    const signer = provider.getSigner();

    const mintTx = await erc20
      .connect(signer)
      .populateTransaction.mint(account, ethers.utils.parseEther("10"));

    const aproveTx = await erc20
      .connect(signer)
      .populateTransaction.approve(spender, ethers.utils.parseEther("10"));

    const spenderContract = getSpender();
    const pulltx = await spenderContract
      .connect(signer)
      .populateTransaction.pullTokens(contract, ethers.utils.parseEther("10"));

    console.log([mintTx, aproveTx, pulltx]);

    setPending(true);

    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [mintTx, aproveTx, pulltx],
    });

    const interval = setInterval(async function () {
      console.log("Attempting to get transaction receipt...");
      const rec = await provider.getTransactionReceipt(txHash);
      if (rec) {
        setReload(true);
        setPending(false);
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <button
      className="p-4 font-black hover:text-gray-700 bg-teal-500 text-white rounded-xl w-full mt-10 text-center"
      onClick={async () => await bundleUp()}
    >
      <div className="text-[1.5rem] flex gap-2 justify-center">
        BUNDLE UP {pending && <Loader />}
      </div>
      MINT (10) + APPROVE + PULL
    </button>
  );
};

export default User2;
