import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { checkAuthFx } from "./auth.api";

const setAuthToken = createEvent<string | null>();
const setRememberMe = createEvent<boolean>();

const AuthGate = createGate();

const $authToken = createStore<string | null>(null).on(
  setAuthToken,
  (_, token) => token,
);

const $isAuth = createStore(false);

const $rememberMe = createStore(false).on(
  setRememberMe,
  (_, remember) => remember,
);

sample({
  clock: AuthGate.open,
  source: $authToken,
  filter: Boolean,
  target: checkAuthFx,
});

sample({
  clock: checkAuthFx.doneData,
  fn: (response) => response,
});

const $isCheckingAuth = checkAuthFx.pending;

export const authService = {
  models: {
    $isCheckingAuth,
    $isAuth,
    $authToken,
    $rememberMe,
  },
  events: {
    setAuthToken,
    setRememberMe,
  },
  AuthGate,
};
