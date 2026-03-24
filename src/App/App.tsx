import { useUnit } from "effector-react";
import { Router } from "../Router";
import { authService } from "@/services/auth";

const { AuthGate } = authService;

export function App() {
  const isCheckingAuth = useUnit(authService.models.$isCheckingAuth);

  return (
    <>
      <AuthGate />
      {isCheckingAuth && <div>Checking authentication...</div>}
      {!isCheckingAuth && <Router />}
    </>
  );
}
