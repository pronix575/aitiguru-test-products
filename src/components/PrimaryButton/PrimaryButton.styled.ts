import styled from "styled-components";

export const StyledButton = styled.button`
  width: 100%;
  min-height: 54px;
  border: 1px solid #4e5dff;
  border-radius: 12px;
  background: linear-gradient(180deg, #4252ff 0%, #2f3fdd 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    0 4px 0 #2332c8,
    0 18px 28px rgba(47, 63, 221, 0.18);
  font-weight: 600;
  font-size: 22px;
  line-height: 1;
  color: var(--color-white);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.22),
      0 2px 0 #2332c8,
      0 12px 20px rgba(47, 63, 221, 0.18);
  }

  @media (max-width: 768px) {
    min-height: 54px;
    font-size: 20px;
  }
`;
