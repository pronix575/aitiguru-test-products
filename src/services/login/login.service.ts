import { attach, createEvent, createStore, sample } from "effector";

import { authService } from "@/services/auth";
import { loginFx } from "./login.api";
import type { LoginFormValues } from "./login.types";

const submitLoginFx = attach({
  effect: loginFx,
  mapParams: ({ login, password }: LoginFormValues) => ({
    username: login,
    password,
  }),
});

const resetLoginError = createEvent();

const $loginErrorMessage = createStore<string | null>(null)
  .on(submitLoginFx.failData, (_, error) =>
    error instanceof Error ? error.message : "Не удалось выполнить вход",
  )
  .reset([submitLoginFx, resetLoginError]);

sample({
  clock: submitLoginFx.doneData,
  fn: ({ accessToken }) => accessToken,
  target: authService.events.setAuthToken,
});

sample({
  clock: submitLoginFx.doneData,
  fn: ({ refreshToken }) => refreshToken,
  target: authService.events.setRefreshToken,
});

export const loginService = {
  events: {
    resetLoginError,
  },
  effects: {
    submitLoginFx,
  },
  models: {
    $isLoginPending: submitLoginFx.pending,
    $loginErrorMessage,
  },
};
