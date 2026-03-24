import { useUnit } from "effector-react";
import { authService } from "../auth";
import { PrimaryButton } from "@/components/PrimaryButton";

export const ProductsContainer = () => {
  const { logout } = useUnit({ logout: authService.events.handleLogout });

  return (
    <div>
      <PrimaryButton onClick={logout}>Выйти</PrimaryButton>
    </div>
  );
};
