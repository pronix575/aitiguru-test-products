import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 24px;
`;

const neumorphismStyles = css`
  position: relative;
  background: linear-gradient(180deg, #23232308 0%, rgba(35, 35, 35, 0) 50%);
  outline: 6px solid white;
  box-shadow:
    0 24px 32px 0 rgba(0, 0, 0, 0.04),
    0 -12px 32px 0 rgba(0, 0, 0, 0.04);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      var(--color-border) 0%,
      var(--color-white) 100%
    );
    pointer-events: none;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;
  width: 100%;
  max-width: 528px;
  border-radius: 34px;
  gap: 32px;

  ${neumorphismStyles}
`;

export const LogoWrapper = styled.div`
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  ${neumorphismStyles}
  outline-width: 3px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 40px;
  line-height: 110%;
  letter-spacing: -0.01em;
  text-align: center;
  color: #232323;
`;

export const Subtitle = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  color: var(--color-text-muted);
`;
