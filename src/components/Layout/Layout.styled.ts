import styled from "styled-components";
import { Panel } from "../ui/Panel";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  background: var(--color-background);
  min-height: 100vh;
`;

export const Header = styled(Panel)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ManageUserPanel = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const ThemeToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text-secondary);
  font-size: 14px;
  white-space: nowrap;
`;
