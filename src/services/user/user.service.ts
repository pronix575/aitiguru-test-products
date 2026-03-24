import type { AuthUser } from "@/api";
import { createStore } from "effector";
import { checkAuthFx } from "../auth/auth.api";

const $user = createStore<AuthUser | null>(null).on(
  checkAuthFx.doneData,
  (_, user) => user,
);

export const userService = {
  models: {
    $user,
  },
};
