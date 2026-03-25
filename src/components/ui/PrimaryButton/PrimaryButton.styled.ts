import styled from "styled-components";

type StyledButtonProps = {
  $loading?: boolean;
};

export const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  width: 100%;
  min-height: 43px;
  border: 1px solid var(--color-primary-light);
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    var(--color-primary-light) 0%,
    var(--color-primary-dark) 100%
  );
  font-weight: 600;
  font-size: 18px;
  line-height: 1;
  color: var(--color-white);
  cursor: ${({ disabled, $loading }) =>
    disabled || $loading ? "not-allowed" : "pointer"};
  transition: 0.2s;

  &:hover {
    background: ${({ disabled, $loading }) =>
      disabled || $loading
        ? `linear-gradient(180deg, var(--color-primary-soft) 0%, var(--color-primary-soft) 100%)`
        : `linear-gradient(180deg, var(--color-primary-light) 0%, var(--color-primary) 100%)`};
  }

  &:active {
    box-shadow: ${({ disabled, $loading }) =>
      disabled || $loading
        ? "none"
        : "inset 0 1px 0 var(--color-white-alpha-22)"};
  }

  &:disabled {
    border-color: var(--color-primary-soft);
    background: linear-gradient(
      180deg,
      var(--color-primary-soft) 0%,
      var(--color-primary-soft) 100%
    );
    color: var(--color-white-alpha-90);
    box-shadow: none;
  }

  @media (max-width: 768px) {
    min-height: 43px;
    font-size: 16px;
  }
`;

export const ButtonContent = styled.span<{ $hidden?: boolean }>`
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transition: opacity 0.2s ease;
`;

export const Loader = styled.span`
  position: absolute;
  inset: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  &::before {
    content: "";
    width: 16px;
    height: 16px;
    border: 2px solid var(--color-white-alpha-35);
    border-top-color: var(--color-white);
    border-radius: 50%;
    animation: primary-button-spin 0.7s linear infinite;
  }

  @keyframes primary-button-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
