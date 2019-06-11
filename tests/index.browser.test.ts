/**
 * @jest-environment jsdom
 */
import * as createStore from "storeon";
import { Store } from "storeon";
import * as router from "../";

describe("Browser implementation", () => {
  let store: Store<router.IState>;
  let map: any;

  beforeEach(() => {
    map = {};
    window.addEventListener = jest.fn((event, cb) => (map[event] = cb));

    history.pushState(null, "", "/");
    store = createStore([router.createRouter()]);
  });

  const routerState = (s: Store<router.IState>) => s.get()[router.key];

  test.each(["/", "/some-path/", "/yet/another/path"])(
    "Initialized with current path",
    path => {
      history.pushState(null, "", path);
      const s = createStore([router.createRouter()]);

      const state = routerState(s);

      expect(state.path).toBe(path);
    },
  );

  test.each(["/", "/some-path/", "/yet/another/path"])(
    "State changed when changing history",
    path => {
      const s = createStore([router.createRouter()]);

      history.pushState(null, "", path);
      map.popstate();

      const state = routerState(s);
      expect(state.path).toBe(path);
    },
  );

  test.each(["/", "/some-path/", "/yet/another/path"])(
    "Location changed when navigating",
    path => {
      store.dispatch(router.navigate, path);

      expect(location.pathname).toBe(path);
    },
  );

  test("State changed correctly for every history change", () => {
    history.pushState(null, "", "/some-path/");
    history.pushState(null, "", "/another/path/");
    history.pushState(null, "", "/yet/another/path/");
    map.popstate();

    const state = routerState(store);

    expect(state.path).toBe("/yet/another/path/");
  });

  test("Location changed correctly for every navigation", () => {
    store.dispatch(router.navigate, "/some-path/");
    store.dispatch(router.navigate, "/another/path/");
    store.dispatch(router.navigate, "/yet/another/path/");

    expect(location.pathname).toBe("/yet/another/path/");
  });
});
