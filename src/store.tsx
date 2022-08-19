import { action, Action, createStore, createTypedHooks } from "easy-peasy";
import { ethers } from "ethers";

interface StoreModel {
  contract: string;
  spender: string;
  account: string;
  provider: any;
  reload: boolean;

  setContract: Action<StoreModel, string>;
  setSpender: Action<StoreModel, string>;
  setAccount: Action<StoreModel, string>;
  setProvider: Action<StoreModel, ethers.providers.Web3Provider>;
  setReload: Action<StoreModel, boolean>;
}

export const store = createStore<StoreModel>({
  account: "",
  contract: "0x6030c15cD584574A5C694984678D50e5E9Aee1b6",
  spender: "0xBeC869B56cF9835E26f16f7E29E1e4Ba324634b8",
  provider: null,
  reload: false,

  setAccount: action((state, payload) => {
    state.account = payload;
  }),
  setContract: action((state, payload) => {
    state.contract = payload;
  }),
  setSpender: action((state, payload) => {
    state.spender = payload;
  }),
  setProvider: action((state, payload) => {
    state.provider = payload;
  }),
  setReload: action((state, payload) => {
    state.reload = payload;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;
