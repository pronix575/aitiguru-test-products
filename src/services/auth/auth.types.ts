export type AuthCredentials = {
  authToken: string;
  refreshToken: string;
};

export type HydrateAuthPayload = AuthCredentials & {
  rememberMe: boolean;
};

export type SyncStoragePayload = {
  localStorageToken: string | null;
  localStorageRefreshToken: string | null;
  sessionStorageToken: string | null;
  sessionStorageRefreshToken: string | null;
};
