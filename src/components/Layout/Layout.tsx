import { authService } from "@/services/auth";
import { useTheme } from "@/services/theme";
import { useUnit } from "effector-react";
import { Outlet } from "react-router-dom";
import { Header, ManageUserPanel, ThemeToggle, Wrapper } from "./Layout.styled";
import { Logo } from "../icons/Logo";
import { Button, Switch } from "antd";
import { userService } from "@/services/user/user.service";
import { UserPanel } from "../UserPanel";
import { MoonFilled, SunFilled } from "@ant-design/icons";

export const Layout = () => {
  const { isDarkTheme, setThemeMode } = useTheme();
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
          <ThemeToggle>
            <SunFilled />
            <Switch
              checked={isDarkTheme}
              aria-label="Переключить тему"
              onChange={(checked) => setThemeMode(checked ? "dark" : "light")}
            />
            <MoonFilled />
          </ThemeToggle>
          <Button onClick={logout}>Выйти</Button>
        </ManageUserPanel>
      </Header>
      <Outlet />
    </Wrapper>
  );
};
