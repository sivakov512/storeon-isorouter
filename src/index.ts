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
    store.on("@init", () => ({ isorouter: { path: currentPath() } }));

    store.on(navigate, (_, path: string) => {
      changePath(path);

      return { [key]: { path } };
    });

    subscribeToPathChanges(store);
  };
};

const isBrowser = typeof window !== "undefined";

let currentPath = () => "";
let changePath = (path: string): void => undefined;
let subscribeToPathChanges = (store: Store<IState>): void => undefined;

if (isBrowser) {
  currentPath = () => location.pathname;
  changePath = path => history.pushState(null, "", path);

  subscribeToPathChanges = store =>
    window.addEventListener("popstate", () => {
      const path = currentPath();

      if (store.get()[key].path !== path) {
        store.dispatch(navigate, path);
      }
    });
}
