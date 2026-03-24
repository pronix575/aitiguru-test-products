import { ConfigProvider } from "antd";
import { useUnit } from "effector-react";
import { Router } from "../Router";
import { authService } from "@/services/auth";
import { BrowserRouter } from "react-router-dom";
import "@/services/user/user.service";

const {
  gates: { AuthGate },
} = authService;

export function App() {
  const isCheckingAuth = useUnit(authService.models.$isCheckingAuth);
  const primaryColor =
    typeof window === "undefined"
      ? "#3344e8"
      : getComputedStyle(document.documentElement)
          .getPropertyValue("--color-primary")
          .trim() || "#3344e8";

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
        },
      }}
    >
      <BrowserRouter>
        <AuthGate />
        {isCheckingAuth && <div>Checking authentication...</div>}
        {!isCheckingAuth && <Router />}
      </BrowserRouter>
    </ConfigProvider>
  );
}
