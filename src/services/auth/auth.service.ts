import { createEvent, createStore, sample } from "effector";
import { persist as persistLocal } from "effector-storage/local";
import { persist as persistSession } from "effector-storage/session";
import { createGate } from "effector-react";
import { checkAuthFx } from "./auth.api";

const AUTH_TOKEN_STORAGE_KEY = "auth-token";

const setAuthToken = createEvent<string | null>();
const setRememberMe = createEvent<boolean>();
const hydrateAuth = createEvent<{ authToken: string; rememberMe: boolean }>();
const syncStorage = createEvent<{
  localStorageToken: string | null;
  sessionStorageToken: string | null;
}>();
const setLocalStorageAuthToken = createEvent<string | null>();
const setSessionStorageAuthToken = createEvent<string | null>();

const AuthGate = createGate();

const $authToken = createStore<string | null>(null)
  .on(setAuthToken, (_, token) => token)
  .on(hydrateAuth, (_, { authToken }) => authToken);

const $isAuth = createStore(false);

const $rememberMe = createStore(false)
  .on(setRememberMe, (_, remember) => remember)
  .on(hydrateAuth, (_, { rememberMe }) => rememberMe);

const $localStorageAuthToken = createStore<string | null>(null).on(
  setLocalStorageAuthToken,
  (_, token) => token,
);

const $sessionStorageAuthToken = createStore<string | null>(null).on(
  setSessionStorageAuthToken,
  (_, token) => token,
);

sample({
  clock: $sessionStorageAuthToken.updates,
  filter: (token): token is string => Boolean(token),
  fn: (authToken: string) => ({ authToken, rememberMe: false }),
  target: hydrateAuth,
});

sample({
  clock: $localStorageAuthToken.updates,
  filter: (token): token is string => Boolean(token),
  fn: (authToken: string) => ({ authToken, rememberMe: true }),
  target: hydrateAuth,
});

sample({
  clock: [setAuthToken, setRememberMe],
  source: { authToken: $authToken, rememberMe: $rememberMe },
  fn: ({ authToken, rememberMe }) => ({
    localStorageToken: rememberMe ? authToken : null,
    sessionStorageToken: rememberMe ? null : authToken,
  }),
  target: syncStorage,
});

sample({
  clock: syncStorage,
  fn: ({ localStorageToken }) => localStorageToken,
  target: setLocalStorageAuthToken,
});

sample({
  clock: syncStorage,
  fn: ({ sessionStorageToken }) => sessionStorageToken,
  target: setSessionStorageAuthToken,
});

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

persistSession({
  store: $sessionStorageAuthToken,
  key: AUTH_TOKEN_STORAGE_KEY,
});

persistLocal({
  store: $localStorageAuthToken,
  key: AUTH_TOKEN_STORAGE_KEY,
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
