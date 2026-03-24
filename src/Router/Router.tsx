import { useMemo } from "react";
import { useUnit } from "effector-react";
import { useRoutes } from "react-router-dom";

import { authService } from "@/services/auth";
import { getRoutes } from "./Router.routes";

export const Router = () => {
  const isAuth = useUnit(authService.models.$isAuth);

  const routes = useMemo(() => getRoutes(isAuth), [isAuth]);

  const router = useRoutes(routes);

  return <>{router}</>;
};
