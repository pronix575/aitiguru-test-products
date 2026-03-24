import { dummyJsonApi } from "@/api";
import { createEffect } from "effector";

export const loginFx = createEffect(dummyJsonApi.auth.login);
