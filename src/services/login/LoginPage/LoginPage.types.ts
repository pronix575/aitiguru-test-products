import type { LoginFormValues } from "../login.types";

export type LoginPageProps = {
  rememberMe: boolean;
  setRememberMe: (payload: boolean) => void;
  handleLogin: (payload: LoginFormValues) => Promise<unknown>;
  isLoading: boolean;
  errorMessage: string | null;
};
