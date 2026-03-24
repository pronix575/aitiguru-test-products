import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px;
  width: 100%;
  max-width: 528px;
  background: linear-gradient(180deg, #23232308 0%, rgba(35, 35, 35, 0) 50%);
  border: 1px solid var(--color-border);
  border-radius: 34px;
  outline: 6px solid white;
  box-shadow: 0 24px 32px 0 rgba(0, 0, 0, 0.04);
`;
