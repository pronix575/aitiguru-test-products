import type { AuthUser } from "@/api";
import { createStore } from "effector";
import { checkAuthFx } from "../auth/auth.api";
import { authService } from "../auth";

const $user = createStore<AuthUser | null>(null).on(
  checkAuthFx.doneData,
  (_, user) => user,
).reset(authService.events.handleLogout);

export const userService = {
  models: {
    $user,
  },
};
