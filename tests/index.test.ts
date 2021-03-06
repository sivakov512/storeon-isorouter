/**
 * @jest-environment node
 */
import * as createStore from "storeon";
import { Store } from "storeon";
import * as router from "../";

describe("Server implementation", () => {
  let store: Store<router.IState>;

  beforeEach(() => {
    store = createStore([router.createRouter()]);
  });

  const routerState = (s: Store<router.IState>) => s.get()[router.key];

  test("Initialized with empty state", () => {
    const state = routerState(store);

    expect(state.path).toBe("");
  });

  test("Navigate to another path", () => {
    const path = "/some-path/";

    store.dispatch(router.navigate, path);

    const state = routerState(store);
    expect(state.path).toBe(path);
  });

  test("State changed correctly for every navigation", () => {
    store.dispatch(router.navigate, "/some-path/");
    store.dispatch(router.navigate, "/another/path/");
    store.dispatch(router.navigate, "/yet/another/path/");

    const state = routerState(store);

    expect(state.path).toBe("/yet/another/path/");
  });
});
