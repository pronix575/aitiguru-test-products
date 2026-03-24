import { useUnit } from "effector-react";
import { Router } from "../Router";
import { authService } from "@/services/auth";
import { BrowserRouter } from "react-router-dom";

const {
  gates: { AuthGate },
} = authService;

export function App() {
  const isCheckingAuth = useUnit(authService.models.$isCheckingAuth);

  return (
    <BrowserRouter>
      <AuthGate />
      {isCheckingAuth && <div>Checking authentication...</div>}
      {!isCheckingAuth && <Router />}
    </BrowserRouter>
  );
}
