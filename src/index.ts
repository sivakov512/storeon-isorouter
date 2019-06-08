import { Module, Store } from "storeon";

export const key = "isorouter";
export const navigate = "isorouter/navigate";

export interface IState {
  [key]: {
    path: string;
  };
}

export const createRouter = (): Module<IState> => {
  return (store: Store<IState>) => {
    store.on("@init", () => ({ isorouter: { path: "" } }));

    store.on(navigate, ({ [key]: part }, value: string) => ({
      [key]: { ...part, path: value },
    }));
  };
};
