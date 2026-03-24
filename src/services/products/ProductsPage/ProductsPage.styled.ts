import { Panel } from "@/components/ui/Panel";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const SearchPanel = styled(Panel)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProductsList = styled(Panel)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #202020;
`;
