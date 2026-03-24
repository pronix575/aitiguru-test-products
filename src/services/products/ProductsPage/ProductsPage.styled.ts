import { Panel } from "@/components/ui/Panel";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 26px;
  min-height: 0;
`;

export const SearchPanel = styled(Panel)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProductsList = styled(Panel)`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
`;

export const ProductsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div<{ size: "small" | "medium" | "large" }>`
  font-weight: 700;
  font-size: ${({ size }) => {
    switch (size) {
      case "small":
        return "14px";
      case "medium":
        return "16px";
      case "large":
        return "20px";
    }
  }};
  color: #202020;
`;
