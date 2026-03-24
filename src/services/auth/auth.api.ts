import { dummyJsonApi } from "@/api";
import { createEffect } from "effector";

export const checkAuthFx = createEffect(dummyJsonApi.auth.getAuthUser);
export const refreshAuthFx = createEffect(dummyJsonApi.auth.refreshAuthSession);
