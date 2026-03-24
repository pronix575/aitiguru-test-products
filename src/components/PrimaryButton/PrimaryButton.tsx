import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { StyledButton } from "./PrimaryButton.styled";

type PrimaryButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

export const PrimaryButton = ({
  children,
  ...props
}: PrimaryButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
