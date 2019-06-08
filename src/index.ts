import { Module, Store } from "storeon";

export const key = "isorouter";

export interface IState {
  [key]: {
    path: string;
  };
}

export const createRouter = (): Module<IState> => {
  return (store: Store<IState>) => {
    store.on("@init", () => ({ isorouter: { path: "" } }));
  };
};
