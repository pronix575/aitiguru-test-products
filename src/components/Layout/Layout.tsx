import { authService } from "@/services/auth";
import { useUnit } from "effector-react";
import { Outlet } from "react-router-dom";
import { Header, ManageUserPanel, Wrapper } from "./Layout.styled";
import { Logo } from "../icons/Logo";
import { Button } from "antd";
import { userService } from "@/services/user/user.service";
import { UserPanel } from "../UserPanel";

export const Layout = () => {
  const { isAuth, logout, user } = useUnit({
    isAuth: authService.models.$isAuth,
    logout: authService.events.handleLogout,
    user: userService.models.$user,
  });

  if (!isAuth) {
    return <Outlet />;
  }

  return (
    <Wrapper>
      <Header>
        <Logo />
        <ManageUserPanel>
          {user && <UserPanel user={user} />}
          <Button onClick={logout}>Выйти</Button>
        </ManageUserPanel>
      </Header>
      <Outlet />
    </Wrapper>
  );
};
