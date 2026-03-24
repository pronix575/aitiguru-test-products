import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { ButtonContent, Loader, StyledButton } from "./PrimaryButton.styled";

type PrimaryButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {
  loading?: boolean;
};

export const PrimaryButton = ({
  children,
  disabled,
  loading = false,
  ...props
}: PrimaryButtonProps) => {
  return (
    <StyledButton
      {...props}
      $loading={loading}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      <ButtonContent $hidden={loading}>{children}</ButtonContent>
      {loading ? <Loader /> : null}
    </StyledButton>
  );
};
