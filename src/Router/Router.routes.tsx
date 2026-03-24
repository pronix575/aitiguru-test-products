import type { RouteObject } from "react-router-dom";
import { Layout } from "@/components/Layout";

export const getRoutes = (isAuth: boolean): RouteObject[] => {
  const publicRoutes: RouteObject[] = [];
  const authRoutes: RouteObject[] = [
    {
      path: "/login",
      
    },
  ];

  return [
    {
      path: "/",
      element: <Layout />,
      children: isAuth ? authRoutes : publicRoutes,
    },
  ];
};
