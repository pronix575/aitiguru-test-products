import styled from "styled-components";

export const Root = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 11px;
  cursor: pointer;
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const Box = styled.span`
  width: 21px;
  height: 21px;
  border-radius: 6px;
  border: 1px solid var(--color-border-strong);
  background: var(--color-white-alpha-90);
  box-shadow: inset 0 1px 0 var(--color-white-alpha-90);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;

  &::after {
    content: "";
    width: 10px;
    height: 6px;
    border-left: 2px solid transparent;
    border-bottom: 2px solid transparent;
    transform: rotate(-45deg) translateY(-1px);
    transition: border-color 0.2s ease;
  }

  ${HiddenInput}:checked + & {
    border-color: var(--color-primary);
    background: var(--color-primary-alpha-08);
    box-shadow: 0 0 0 2px var(--color-primary-alpha-08);
  }

  ${HiddenInput}:checked + &::after {
    border-color: var(--color-primary);
  }
`;

export const Text = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  color: var(--color-text-muted);
`;
