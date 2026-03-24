import { Navigate, type RouteObject } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { LoginContainer } from "@/services/login";

export const getRoutes = (isAuth: boolean): RouteObject[] => {
  const publicRoutes: RouteObject[] = [
    {
      index: true,
      element: <Navigate replace to="/login" />,
    },
    {
      path: "/login",
      element: <LoginContainer />,
    },
    {
      path: "*",
      element: <Navigate replace to="/login" />,
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
