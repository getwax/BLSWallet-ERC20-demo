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
  contract: "0x56377a667C6370154d43aFc937998C750f0ca9bd",
  spender: "0x95B02CcF67ceacaBbc33927a5d7607Df590c81F6",
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
