import styled from "styled-components";

export const Root = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const Box = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;

  &::after {
    content: "";
    width: 12px;
    height: 7px;
    border-left: 2px solid transparent;
    border-bottom: 2px solid transparent;
    transform: rotate(-45deg) translateY(-1px);
    transition: border-color 0.2s ease;
  }

  ${HiddenInput}:checked + & {
    border-color: var(--color-primary);
    background: rgba(51, 68, 232, 0.08);
    box-shadow: 0 0 0 3px rgba(51, 68, 232, 0.08);
  }

  ${HiddenInput}:checked + &::after {
    border-color: var(--color-primary);
  }
`;

export const Text = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.4;
  color: var(--color-text-muted);
`;
