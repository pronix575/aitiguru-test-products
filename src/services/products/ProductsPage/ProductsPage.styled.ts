import { Input } from "antd";
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
  gap: 24px;
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

export const SearchInput = styled(Input)`
  max-width: 1023px;

  &.ant-input-affix-wrapper {
    height: 50px;
    padding-inline: 18px;
    border: 0;
    border-radius: 8px;
    background: var(--color-background-input);
    box-shadow: none;
    color: var(--color-text-muted);
    font-size: 16px;
  }

  &.ant-input-affix-wrapper .ant-input {
    color: var(--color-text-primary);
  }
`;

export const SearchInputWrap = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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
  color: var(--color-text-primary);
`;
