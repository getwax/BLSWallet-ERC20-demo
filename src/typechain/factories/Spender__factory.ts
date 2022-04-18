/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Spender, SpenderInterface } from "../Spender";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "pullTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061029c806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063eada79cc14610030575b600080fd5b61004a6004803603810190610045919061011f565b61004c565b005b8173ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b8152600401610089939291906101a2565b602060405180830381600087803b1580156100a357600080fd5b505af11580156100b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100db919061015b565b505050565b6000813590506100ef81610221565b92915050565b60008151905061010481610238565b92915050565b6000813590506101198161024f565b92915050565b6000806040838503121561013257600080fd5b6000610140858286016100e0565b92505060206101518582860161010a565b9150509250929050565b60006020828403121561016d57600080fd5b600061017b848285016100f5565b91505092915050565b61018d816101d9565b82525050565b61019c81610217565b82525050565b60006060820190506101b76000830186610184565b6101c46020830185610184565b6101d16040830184610193565b949350505050565b60006101e4826101f7565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b61022a816101d9565b811461023557600080fd5b50565b610241816101eb565b811461024c57600080fd5b50565b61025881610217565b811461026357600080fd5b5056fea264697066735822122016def4cd3472533f4dfe58c6cfa8fef957636c7a9b626fd17296df2052618bd564736f6c63430008040033";

export class Spender__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Spender> {
    return super.deploy(overrides || {}) as Promise<Spender>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Spender {
    return super.attach(address) as Spender;
  }
  connect(signer: Signer): Spender__factory {
    return super.connect(signer) as Spender__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SpenderInterface {
    return new utils.Interface(_abi) as SpenderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Spender {
    return new Contract(address, _abi, signerOrProvider) as Spender;
  }
}
