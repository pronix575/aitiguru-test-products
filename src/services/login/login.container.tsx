import { useUnit } from "effector-react";
import { LoginPage } from "./LoginPage";
import { loginService } from "./login.service";
import { authService } from "../auth";

export const LoginContainer = () => {
  const { rememberMe, setRememberMe, handleLogin, isLoading } = useUnit({
    rememberMe: authService.models.$rememberMe,
    setRememberMe: authService.events.setRememberMe,
    handleLogin: loginService.effects.submitLoginFx,
    isLoading: loginService.models.$isLoginPending,
  });

  return (
    <LoginPage
      rememberMe={rememberMe}
      setRememberMe={setRememberMe}
      handleLogin={handleLogin}
      isLoading={isLoading}
    />
  );
};
