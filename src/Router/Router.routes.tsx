import type { RouteObject } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { LoginContainer } from "@/services/login";

export const getRoutes = (isAuth: boolean): RouteObject[] => {
  const publicRoutes: RouteObject[] = [
    {
      path: "/login",
      element: <LoginContainer />,
    },
  ];
  const authRoutes: RouteObject[] = [];

  return [
    {
      path: "/",
      element: <Layout />,
      children: isAuth ? authRoutes : publicRoutes,
    },
  ];
};
