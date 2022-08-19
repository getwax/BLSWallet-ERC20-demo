import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useStoreActions, useStoreState } from "../store";
import { PenNibStraight, Wallet } from "phosphor-react";
import Blockies from "react-blockies";

declare global {
  interface Window {
    ethereum: any;
  }
}

const Connection = () => {
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [connButtonText, setConnButtonText] = useState<any>("Connect");
  const [amount, setAmount] = useState<any>("0.0");

  const { account, provider } = useStoreState((state) => state);

  const setGlobalProvider = useStoreActions((actions) => actions.setProvider);
  const setAcc = useStoreActions((actions) => actions.setAccount);

  const connectWalletHandler = async () => {
    if (window.ethereum && account === "") {
      const providerOptions = {};

      const web3Modal = new Web3Modal({
        providerOptions, // required
      });

      const instance = await web3Modal.connect();

      const provider = new ethers.providers.Web3Provider(instance);
      setGlobalProvider(provider);

      const result = await window.ethereum
                              .request({ method: "eth_accounts" });

      setConnButtonText("Connected");
      setAcc(result[0]);

    } else if (!window.ethereum) {
      console.log("Need to install Quill");
      setErrorMessage("Please install Quill browser extension to interact");
    }
  };

  const fetchBalance = async () => {
    const amount = await provider.getBalance(account);
    setAmount(ethers.utils.formatEther(amount));
  };

  useEffect(() => {
    provider && fetchBalance();
  }, [account]);

  return (
    <div className="py-8">
      <div className=" flex justify-between items-center py-8 w-[70rem]">
        <div className="text-3xl font-medium flex items-center gap-2">
          <PenNibStraight weight="duotone" size={28} color={"#60a5fa"} />
          BLS Wallet - ERC20 Demo <sup>beta</sup>
        </div>
        <button
          className="bg-blue-400 rounded-xl px-4 py-2 text-white font-semibold flex items-center gap-2"
          onClick={connectWalletHandler}
        >
          <Wallet weight="duotone" size={28} /> {connButtonText}
        </button>
      </div>

      {errorMessage}
      {account && (
        <div className="bg-slate-100 p-8 rounded-xl flex items-center gap-4">
          <Blockies
            seed={account + "random"}
            className="rounded-md"
            size={5}
            scale={10}
          />
          <div className="">
            <div className="text-lg font-bold">{account}</div>
            <div className="text-lg font-normal">{amount} ETH</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connection;
