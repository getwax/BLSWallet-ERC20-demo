import { ethers } from "ethers";
import { MaskHappy } from "phosphor-react";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../store";
import { Token, Token__factory } from "../typechain";
import { Spender__factory } from "../typechain/factories/Spender__factory";
import { Spender } from "../typechain/Spender";
import Loader from "./Loader";

const SpenderContract = () => {
  const { contract, provider, spender, account, reload } = useStoreState(
    (state) => state
  );
  const { setReload } = useStoreActions((actions) => actions);
  const [tokenBalance, setTokenBalance] = useState("0.0");
  const [allowance, setAllowance] = useState("0.0");
  const [pending, setPending] = useState(false);

  const getContract = () => {
    return new ethers.Contract(
      spender,
      Spender__factory.createInterface(),
      provider
    ) as Spender;
  };

  const updateAllowance = async () => {
    const erc20 = getTokenContract();

    const allowance = await erc20.allowance(
      "0xa386e627bf0E70f346B6d1AF82DE555190f5961B",
      spender
    );
    setAllowance(ethers.utils.formatEther(allowance));
    console.log(allowance);
  };

  const pullTokens = async () => {
    const spender = getContract();

    const signer = provider.getSigner();
    const tx = await spender
      .connect(signer)
      .pullTokens(contract, ethers.utils.parseEther("10"));

    setPending(true);
    await tx.wait();
    await updateTokenBalance();
    await updateAllowance();
    setReload(true);
    setPending(false);
  };

  const getTokenContract = () => {
    return new ethers.Contract(
      contract,
      Token__factory.createInterface(),
      provider
    ) as Token;
  };

  const updateTokenBalance = async () => {
    const erc20 = getTokenContract();

    const balance = await erc20.balanceOf(spender);
    setTokenBalance(ethers.utils.formatEther(balance));
  };

  useEffect(() => {
    if (provider) {
      updateTokenBalance();
      updateAllowance();
    }
    setReload(false);
  }, [spender, contract, provider, reload]);

  return (
    <div className="bg-gray-700 rounded-xl w-1/2">
      <div className="text-[2rem] p-8 text-white flex items-center gap-3">
        <MaskHappy weight="duotone" size={52} /> SPENDER {pending && <Loader />}
      </div>

      <div className="text-[8rem] px-8 text-white leading-none flex items-baseline gap-4 mb-10">
        {tokenBalance} <div className="text-[2rem] font-black">TOKENS</div>
      </div>

      <div className="flex w-full justify-center text-xl text-white border-t-2 border-white ">
        <button
          className="p-4 font-black hover:text-slate-400 disabled:text-gray-500"
          onClick={async () => await pullTokens()}
        >
          PULL TOKENS (10)
        </button>
      </div>
    </div>
  );
};

export default SpenderContract;
