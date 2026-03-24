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
  color: #232323;
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
  border: 1px solid ${({ $hasError }) => ($hasError ? "#e16565" : "#e8e8e8")};
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.92);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:focus-within {
    border-color: ${({ $hasError }) =>
      $hasError ? "rgba(225, 101, 101, 0.9)" : "rgba(51, 68, 232, 0.35)"};
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      0 0 0 3px
        ${({ $hasError }) =>
          $hasError ? "rgba(225, 101, 101, 0.12)" : "rgba(51, 68, 232, 0.08)"},
      0 6px 19px rgba(0, 0, 0, 0.03);
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
  color: #c6c6c6;
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
  color: #232323;

  &::placeholder {
    color: #c4c4c4;
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
  color: #c6c6c6;
  cursor: pointer;
  transition: color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: #7e7e7e;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  line-height: 1.3;
  color: #e16565;
`;
