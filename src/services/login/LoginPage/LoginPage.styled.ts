import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 19px;
  background:
    radial-gradient(circle at top, rgba(35, 35, 35, 0.05), transparent 45%),
    linear-gradient(180deg, #fff 0%, #fbfbfb 100%);
`;

const neumorphismStyles = css`
  position: relative;
  background: linear-gradient(180deg, #23232308 0%, rgba(35, 35, 35, 0) 50%);
  outline: 5px solid white;
  box-shadow:
    0 19px 26px 0 rgba(0, 0, 0, 0.04),
    0 -10px 26px 0 rgba(0, 0, 0, 0.04);

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
  max-width: 422px;
  padding: 38px;
  border-radius: 27px;
  gap: 26px;
  overflow: hidden;

  ${neumorphismStyles}

  @media (max-width: 768px) {
    background: transparent;
    outline: none;
    box-shadow: none;
    padding: 0;

    &::before {
      content: none;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 21px;
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;
`;

export const LogoWrapper = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  ${neumorphismStyles}
  outline-width: 2px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  font-size: 32px;
  line-height: 110%;
  letter-spacing: -0.01em;
  text-align: center;
  color: #232323;
`;

export const Subtitle = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 14px;
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
  gap: 13px;
  width: 100%;
  color: #b6b6b6;
  font-weight: 600;
  font-size: 13px;
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
  gap: 8px;
  flex-wrap: wrap;
  color: #707070;
  font-size: 14px;
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
  text-underline-offset: 3px;
  cursor: pointer;
`;
