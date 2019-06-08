/**
 * @jest-environment: node
 */
import * as createStore from "storeon";
import { Store } from "storeon";
import * as router from "../src";

describe("Server implementation", () => {
  let store: Store<router.IState>;

  beforeEach(() => {
    store = createStore([router.createRouter()]);
  });

  const routerState = (s: Store<router.IState>) => s.get()[router.key];

  it("Initialized with empty state", () => {
    const state = routerState(store);

    expect(state.path).toBe("");
    expect(state.params).toEqual([]);
  });
});
