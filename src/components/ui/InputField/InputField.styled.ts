import styled from "styled-components";

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
  color: var(--color-text-primary);
`;

type InputShellProps = {
  $hasError?: boolean;
};

export const InputShell = styled.div<InputShellProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 43px;
  padding: 0 10px;
  border: 1px solid
    ${({ $hasError }) => ($hasError ? "var(--color-error)" : "var(--color-border)")};
  border-radius: 10px;
  background: var(--color-white-alpha-90);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:focus-within {
    border-color: ${({ $hasError }) =>
      $hasError
        ? "var(--color-error-alpha-90)"
        : "var(--color-primary-alpha-35)"};
    box-shadow:
      inset 0 1px 0 var(--color-white-alpha-90),
      0 0 0 3px
        ${({ $hasError }) =>
          $hasError
            ? "var(--color-error-alpha-12)"
            : "var(--color-primary-alpha-08)"},
      0 6px 19px var(--color-shadow-subtle);
  }

  @media (max-width: 768px) {
    min-height: 43px;
    padding: 0 14px;
  }
`;

export const InputIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-subtle);
  flex-shrink: 0;

  svg {
    width: 26px;
    height: 26px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  padding: 0;
  font: inherit;
  font-size: 16px;
  line-height: 1.4;
  color: var(--color-text-primary);

  &::placeholder {
    color: var(--color-text-placeholder);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--color-text-subtle);
  cursor: pointer;
  transition: color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: var(--color-text-secondary);
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  line-height: 1.3;
  color: var(--color-error);
`;
