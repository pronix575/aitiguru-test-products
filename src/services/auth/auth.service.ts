import { combine, createEvent, createStore, sample } from "effector";
import { persist as persistLocal } from "effector-storage/local";
import { persist as persistSession } from "effector-storage/session";
import { createGate } from "effector-react";
import { spread } from "patronum/spread";
import { configureAuthClient } from "@/api/api.client";
import { checkAuthFx, refreshAuthFx } from "./auth.api";
import {
  AUTH_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "./auth.constants";
import type { HydrateAuthPayload, SyncStoragePayload } from "./auth.types";

const setAuthToken = createEvent<string | null>();
const setRefreshToken = createEvent<string | null>();
const setRememberMe = createEvent<boolean>();
const handleLogout = createEvent();
const hydrateAuth = createEvent<HydrateAuthPayload>();
const syncStorage = createEvent<SyncStoragePayload>();
const setLocalStorageAuthToken = createEvent<string | null>();
const setSessionStorageAuthToken = createEvent<string | null>();
const setLocalStorageRefreshToken = createEvent<string | null>();
const setSessionStorageRefreshToken = createEvent<string | null>();

const AuthGate = createGate();

const $authToken = createStore<string | null>(null)
  .on(setAuthToken, (_, token) => token)
  .on(hydrateAuth, (_, { authToken }) => authToken)
  .reset(handleLogout);

const $refreshToken = createStore<string | null>(null)
  .on(setRefreshToken, (_, token) => token)
  .on(hydrateAuth, (_, { refreshToken }) => refreshToken)
  .reset(handleLogout);

const $isAuth = $authToken.map(Boolean);

const $rememberMe = createStore(false)
  .on(setRememberMe, (_, remember) => remember)
  .on(hydrateAuth, (_, { rememberMe }) => rememberMe)
  .reset(handleLogout);

// These stores exist only to bridge effector-storage with the real auth model.
// The app itself should read from $authToken/$refreshToken instead.
const $localStorageAuthToken = createStore<string | null>(null).on(
  setLocalStorageAuthToken,
  (_, token) => token,
).reset(handleLogout);

const $sessionStorageAuthToken = createStore<string | null>(null).on(
  setSessionStorageAuthToken,
  (_, token) => token,
).reset(handleLogout);

const $localStorageRefreshToken = createStore<string | null>(null).on(
  setLocalStorageRefreshToken,
  (_, token) => token,
).reset(handleLogout);

const $sessionStorageRefreshToken = createStore<string | null>(null).on(
  setSessionStorageRefreshToken,
  (_, token) => token,
).reset(handleLogout);

const $sessionStorageCredentials = combine({
  authToken: $sessionStorageAuthToken,
  refreshToken: $sessionStorageRefreshToken,
});

const $localStorageCredentials = combine({
  authToken: $localStorageAuthToken,
  refreshToken: $localStorageRefreshToken,
});

// Storage restores tokens independently, so we wait until both values are present
// and only then hydrate the in-memory auth model once.
sample({
  clock: $sessionStorageCredentials.updates,
  source: $sessionStorageCredentials,
  filter: ({ authToken, refreshToken }) => Boolean(authToken && refreshToken),
  fn: ({ authToken, refreshToken }) => ({
    authToken: authToken as string,
    refreshToken: refreshToken as string,
    rememberMe: false,
  }),
  target: hydrateAuth,
});

sample({
  clock: $localStorageCredentials.updates,
  source: $localStorageCredentials,
  filter: ({ authToken, refreshToken }) => Boolean(authToken && refreshToken),
  fn: ({ authToken, refreshToken }) => ({
    authToken: authToken as string,
    refreshToken: refreshToken as string,
    rememberMe: true,
  }),
  target: hydrateAuth,
});

// Whenever auth state changes, keep exactly one storage active:
// localStorage for "remember me", sessionStorage otherwise.
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

spread({
  source: syncStorage,
  targets: {
    localStorageToken: setLocalStorageAuthToken,
    sessionStorageToken: setSessionStorageAuthToken,
    localStorageRefreshToken: setLocalStorageRefreshToken,
    sessionStorageRefreshToken: setSessionStorageRefreshToken,
  },
});

// We only verify auth after hydration from storage. This keeps /auth/me from
// firing multiple times on app mount while still validating restored tokens.
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

// The API client uses these handlers to refresh tokens on 401 and retry the
// original request without leaking refresh logic into feature modules.
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
