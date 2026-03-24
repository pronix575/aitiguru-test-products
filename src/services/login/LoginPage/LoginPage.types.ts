import type { LoginFormValues } from "../login.types";

export type LoginPageProps = {
  rememberMe: boolean;
  setRememberMe: (payload: boolean) => boolean;
  handleLogin: (payload: LoginFormValues) => void;
  isLoading: boolean;
};
