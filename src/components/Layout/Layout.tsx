import { authService } from "@/services/auth";
import { useUnit } from "effector-react";
import { Outlet } from "react-router-dom";
import { Header, Wrapper } from "./Layout.styled";
import { Logo } from "../icons/Logo";
import { Button } from "antd";

export const Layout = () => {
  const { isAuth, logout } = useUnit({
    isAuth: authService.models.$isAuth,
    logout: authService.events.handleLogout,
  });

  if (!isAuth) {
    return <Outlet />;
  }

  return (
    <Wrapper>
      <Header>
        <Logo />
        <Button onClick={logout}>Выйти</Button>
      </Header>
      <Outlet />
    </Wrapper>
  );
};
