import { createEvent, createStore, sample } from "effector";
import { persist as persistLocal } from "effector-storage/local";
import { persist as persistSession } from "effector-storage/session";
import { createGate } from "effector-react";
import { configureAuthClient } from "@/api/api.client";
import { checkAuthFx, refreshAuthFx } from "./auth.api";

const AUTH_TOKEN_STORAGE_KEY = "auth-token";
const REFRESH_TOKEN_STORAGE_KEY = "refresh-token";

const setAuthToken = createEvent<string | null>();
const setRefreshToken = createEvent<string | null>();
const setRememberMe = createEvent<boolean>();
const handleLogout = createEvent();
const hydrateAuth = createEvent<{
  authToken: string;
  refreshToken: string;
  rememberMe: boolean;
}>();
const syncStorage = createEvent<{
  localStorageToken: string | null;
  localStorageRefreshToken: string | null;
  sessionStorageToken: string | null;
  sessionStorageRefreshToken: string | null;
}>();
const setLocalStorageAuthToken = createEvent<string | null>();
const setSessionStorageAuthToken = createEvent<string | null>();
const setLocalStorageRefreshToken = createEvent<string | null>();
const setSessionStorageRefreshToken = createEvent<string | null>();

const AuthGate = createGate();

const $authToken = createStore<string | null>(null)
  .on(setAuthToken, (_, token) => token)
  .on(hydrateAuth, (_, { authToken }) => authToken);

const $refreshToken = createStore<string | null>(null)
  .on(setRefreshToken, (_, token) => token)
  .on(hydrateAuth, (_, { refreshToken }) => refreshToken);

const $isAuth = $authToken.map(Boolean);

const $rememberMe = createStore(false)
  .on(setRememberMe, (_, remember) => remember)
  .on(hydrateAuth, (_, { rememberMe }) => rememberMe);

sample({
  clock: handleLogout,
  fn: () => null,
  target: setAuthToken,
});

sample({
  clock: handleLogout,
  fn: () => null,
  target: setRefreshToken,
});

sample({
  clock: handleLogout,
  fn: () => false,
  target: setRememberMe,
});

const $localStorageAuthToken = createStore<string | null>(null).on(
  setLocalStorageAuthToken,
  (_, token) => token,
);

const $sessionStorageAuthToken = createStore<string | null>(null).on(
  setSessionStorageAuthToken,
  (_, token) => token,
);

const $localStorageRefreshToken = createStore<string | null>(null).on(
  setLocalStorageRefreshToken,
  (_, token) => token,
);

const $sessionStorageRefreshToken = createStore<string | null>(null).on(
  setSessionStorageRefreshToken,
  (_, token) => token,
);

sample({
  clock: [
    $sessionStorageAuthToken.updates,
    $sessionStorageRefreshToken.updates,
  ],
  source: {
    authToken: $sessionStorageAuthToken,
    refreshToken: $sessionStorageRefreshToken,
  },
  filter: ({ authToken, refreshToken }) => Boolean(authToken && refreshToken),
  fn: ({ authToken, refreshToken }) => ({
    authToken: authToken as string,
    refreshToken: refreshToken as string,
    rememberMe: false,
  }),
  target: hydrateAuth,
});

sample({
  clock: [$localStorageAuthToken.updates, $localStorageRefreshToken.updates],
  source: {
    authToken: $localStorageAuthToken,
    refreshToken: $localStorageRefreshToken,
  },
  filter: ({ authToken, refreshToken }) => Boolean(authToken && refreshToken),
  fn: ({ authToken, refreshToken }) => ({
    authToken: authToken as string,
    refreshToken: refreshToken as string,
    rememberMe: true,
  }),
  target: hydrateAuth,
});

sample({
  clock: [setAuthToken, setRefreshToken, setRememberMe],
  source: {
    authToken: $authToken,
    refreshToken: $refreshToken,
    rememberMe: $rememberMe,
  },
  fn: ({ authToken, refreshToken, rememberMe }) => ({
    localStorageToken: rememberMe ? authToken : null,
    localStorageRefreshToken: rememberMe ? refreshToken : null,
    sessionStorageToken: rememberMe ? null : authToken,
    sessionStorageRefreshToken: rememberMe ? null : refreshToken,
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
  clock: syncStorage,
  fn: ({ localStorageRefreshToken }) => localStorageRefreshToken,
  target: setLocalStorageRefreshToken,
});

sample({
  clock: syncStorage,
  fn: ({ sessionStorageRefreshToken }) => sessionStorageRefreshToken,
  target: setSessionStorageRefreshToken,
});

sample({
  clock: AuthGate.open,
  source: $authToken,
  filter: Boolean,
  target: checkAuthFx,
});

sample({
  clock: hydrateAuth,
  fn: ({ authToken }) => authToken,
  target: checkAuthFx,
});

sample({
  clock: checkAuthFx.fail,
  target: handleLogout,
});

sample({
  clock: refreshAuthFx.doneData,
  fn: ({ accessToken }) => accessToken,
  target: setAuthToken,
});

sample({
  clock: refreshAuthFx.doneData,
  fn: ({ refreshToken }) => refreshToken,
  target: setRefreshToken,
});

sample({
  clock: refreshAuthFx.fail,
  target: handleLogout,
});

persistSession({
  store: $sessionStorageAuthToken,
  key: AUTH_TOKEN_STORAGE_KEY,
});

persistLocal({
  store: $localStorageAuthToken,
  key: AUTH_TOKEN_STORAGE_KEY,
});

persistSession({
  store: $sessionStorageRefreshToken,
  key: REFRESH_TOKEN_STORAGE_KEY,
});

persistLocal({
  store: $localStorageRefreshToken,
  key: REFRESH_TOKEN_STORAGE_KEY,
});

configureAuthClient({
  getAccessToken: () => $authToken.getState(),
  getRefreshToken: () => $refreshToken.getState(),
  refreshToken: (refreshToken) => refreshAuthFx({ refreshToken }),
  applyTokens: ({ accessToken, refreshToken }) => {
    setAuthToken(accessToken);
    setRefreshToken(refreshToken);
  },
  clearAuth: () => {
    handleLogout();
  },
});

const $isCheckingAuth = checkAuthFx.pending;

export const authService = {
  models: {
    $isCheckingAuth,
    $isAuth,
    $authToken,
    $refreshToken,
    $rememberMe,
  },
  events: {
    handleLogout,
    setAuthToken,
    setRefreshToken,
    setRememberMe,
  },
  gates: {
    AuthGate,
  },
};
