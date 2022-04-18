import { ethers } from "ethers";
import { FinnTheHuman } from "phosphor-react";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../store";
import { Token, Token__factory } from "../typechain";
import Loader from "./Loader";

const User = () => {
  const { contract, provider, account, spender, reload } = useStoreState(
    (state) => state
  );
  const { setReload } = useStoreActions((actions) => actions);

  const [tokenBalance, setTokenBalance] = useState("0.0");
  const [pending, setPending] = useState(false);

  const getContract = () => {
    return new ethers.Contract(
      contract,
      Token__factory.createInterface(),
      provider
    ) as Token;
  };

  const updateTokenBalance = async () => {
    const erc20 = getContract();

    const balance = await erc20.balanceOf(account);
    setTokenBalance(ethers.utils.formatEther(balance));
    setReload(false);
  };

  const mintTokens = async () => {
    const erc20 = getContract();

    const signer = provider.getSigner();
    const tx = await erc20
      .connect(signer)
      .mint(account, ethers.utils.parseEther("10"));

    setPending(true);
    await tx.wait();
    setPending(false);

    await updateTokenBalance();
  };

  const approveTokens = async () => {
    const erc20 = getContract();

    const signer = provider.getSigner();
    const tx = await erc20
      .connect(signer)
      .approve(spender, ethers.utils.parseEther("10"));

    setPending(true);
    await tx.wait();
    setReload(true);
    setPending(false);
  };

  const transferTokens = async () => {
    const erc20 = new ethers.Contract(
      contract,
      Token__factory.createInterface(),
      provider
    ) as Token;

    const signer = provider.getSigner();
    await erc20
      .connect(signer)
      .transfer(account, ethers.utils.parseEther("20"));
  };

  useEffect(() => {
    provider && updateTokenBalance();
  }, [account, contract, provider]);

  useEffect(() => {
    updateTokenBalance();
  }, [reload]);

  return (
    <div className="bg-blue-400 rounded-xl w-1/2">
      <div className="text-[2rem] p-8 text-white flex items-center gap-3">
        <FinnTheHuman weight="duotone" size={52} /> YOU-SER{" "}
        {pending && <Loader />}
      </div>

      <div className="text-[8rem] px-8 text-white leading-none flex items-baseline gap-4 mb-10">
        {tokenBalance} <div className="text-[2rem] font-black">TOKENS</div>
      </div>

      <div className="flex w-full text-xl text-white border-t-2 border-white">
        <button
          className="w-1/2 p-4 border-r-2 border-white font-black hover:text-gray-700"
          onClick={async () => await mintTokens()}
        >
          MINT (10)
        </button>
        <button
          className="w-1/2 p-4 font-black hover:text-gray-700"
          onClick={async () => await approveTokens()}
        >
          APPROVE
        </button>
      </div>
    </div>
  );
};

export default User;
