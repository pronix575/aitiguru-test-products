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
