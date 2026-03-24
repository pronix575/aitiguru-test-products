import { attach, sample } from "effector";

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

sample({
  clock: submitLoginFx.doneData,
  fn: ({ accessToken }) => accessToken,
  target: authService.events.setAuthToken,
});

export const loginService = {
  effects: {
    submitLoginFx,
  },
  models: {
    $isLoginPending: submitLoginFx.pending,
  },
};
