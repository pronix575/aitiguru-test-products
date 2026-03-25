import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 19px;
  background:
    radial-gradient(circle at top, var(--color-dark-alpha-05), transparent 45%),
    linear-gradient(
      180deg,
      var(--color-white) 0%,
      var(--color-background-soft) 100%
    );
`;

export const neumorphismStyles = css`
  position: relative;
  background: linear-gradient(
    180deg,
    var(--color-dark-alpha-03) 0%,
    var(--color-dark-alpha-0) 50%
  );
  outline: 5px solid var(--color-white);
  box-shadow:
    0 19px 26px 0 var(--color-shadow-card),
    0 -10px 26px 0 var(--color-shadow-card);

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
      linear-gradient(var(--color-white) 0 0) content-box,
      linear-gradient(var(--color-white) 0 0);
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
  color: var(--color-text-primary);
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
  color: var(--color-text-subtle);
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;

  &::before,
  &::after {
    content: "";
    height: 1px;
    flex: 1;
    background: linear-gradient(
      90deg,
      var(--color-gray-alpha-20),
      var(--color-border-strong)
    );
  }

  &::after {
    background: linear-gradient(
      90deg,
      var(--color-border-strong),
      var(--color-gray-alpha-20)
    );
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
  color: var(--color-text-secondary);
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
