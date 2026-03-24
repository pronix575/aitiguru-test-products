import { Navigate, type RouteObject } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { LoginContainer } from "@/services/login";
import { ProductsContainer } from "@/services/products";

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

  const authRoutes: RouteObject[] = [
    {
      index: true,
      element: <Navigate replace to="/products" />,
    },
    {
      path: "/products",
      element: <ProductsContainer />,
    },
    {
      path: "*",
      element: <Navigate replace to="/products" />,
    }
  ];

  return [
    {
      path: "/",
      element: <Layout />,
      children: isAuth ? authRoutes : publicRoutes,
    },
  ];
};
