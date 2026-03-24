import styled from "styled-components";

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.3;
  color: #232323;
`;

export const InputShell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 54px;
  padding: 0 12px;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.92);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:focus-within {
    border-color: rgba(51, 68, 232, 0.35);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      0 0 0 4px rgba(51, 68, 232, 0.08),
      0 8px 24px rgba(0, 0, 0, 0.03);
  }

  @media (max-width: 768px) {
    min-height: 54px;
    padding: 0 18px;
  }
`;

export const InputIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #c6c6c6;
  flex-shrink: 0;
`;

export const StyledInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  padding: 0;
  font: inherit;
  font-size: 20px;
  line-height: 1.4;
  color: #232323;

  &::placeholder {
    color: #c4c4c4;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 18px;
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
`;
