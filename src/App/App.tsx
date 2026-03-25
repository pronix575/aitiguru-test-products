import { ConfigProvider, theme as antdTheme } from "antd";
import { useUnit } from "effector-react";
import { Router } from "../Router";
import { authService } from "@/services/auth";
import { BrowserRouter } from "react-router-dom";
import "@/services/user/user.service";
import { LoadingPage } from "@/components/ui/LoadingPage";
import { ThemeProvider, useTheme } from "@/services/theme";

const {
  gates: { AuthGate },
} = authService;

function AppContent() {
  const isCheckingAuth = useUnit(authService.models.$isCheckingAuth);
  const { isDarkTheme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: "#3344e8",
        },
      }}
    >
      <BrowserRouter>
        <AuthGate />
        {isCheckingAuth && <LoadingPage />}
        {!isCheckingAuth && <Router />}
      </BrowserRouter>
    </ConfigProvider>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
