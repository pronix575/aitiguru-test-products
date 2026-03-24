import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background:
    radial-gradient(circle at top, rgba(35, 35, 35, 0.05), transparent 45%),
    linear-gradient(180deg, #fff 0%, #fbfbfb 100%);
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 528px;
  padding: 48px;
  border-radius: 34px;
  gap: 32px;
  overflow: hidden;

  ${neumorphismStyles}
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  font-size: 40px;
  line-height: 110%;
  letter-spacing: -0.01em;
  text-align: center;
  color: #232323;
`;

export const Subtitle = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  color: var(--color-text-muted);
`;

export const RememberRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  color: #b6b6b6;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;

  &::before,
  &::after {
    content: "";
    height: 1px;
    flex: 1;
    background: linear-gradient(90deg, rgba(225, 225, 225, 0.2), #e1e1e1);
  }

  &::after {
    background: linear-gradient(90deg, #e1e1e1, rgba(225, 225, 225, 0.2));
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  color: #707070;
  font-size: 18px;
  line-height: 1.4;
`;

export const FooterLink = styled.button`
  border: none;
  padding: 0;
  background: transparent;
  color: var(--color-primary);
  font: inherit;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
`;
