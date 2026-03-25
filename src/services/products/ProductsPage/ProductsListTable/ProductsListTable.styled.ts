import { Pagination } from "antd";
import styled from "styled-components";
import type { SortTriggerProps } from "./ProductsListTable.types";

export const TABLE_COLUMNS =
  "44px minmax(320px, 2.4fr) minmax(150px, 1fr) minmax(150px, 1fr) 120px minmax(160px, 0.8fr) 104px 56px";

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
`;

export const TableScroll = styled.div`
  overflow-x: auto;
`;

export const Table = styled.div`
  min-width: 1120px;
`;

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: ${TABLE_COLUMNS};
  align-items: center;
  gap: 24px;
  min-height: 58px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-subtle);
  font-size: 14px;
  font-weight: 700;
  padding: 0 18px;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Cell = styled.div`
  min-width: 0;
`;

export const SortTrigger = styled.button<SortTriggerProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ $isActive }) =>
    $isActive ? "var(--color-primary)" : "inherit"};
  font: inherit;
  font-weight: inherit;
  cursor: pointer;
`;

export const Footer = styled.div`
  margin-top: auto;
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  color: var(--color-text-secondary);
  font-size: 16px;
`;

export const PaginationControl = styled(Pagination)`
  .ant-pagination-item,
  .ant-pagination-prev,
  .ant-pagination-next {
    min-width: 32px;
    height: 32px;
    border-radius: 6px;
  }

  .ant-pagination-item-active {
    background-color: var(--color-primary);
    border: 0px;
    color: var(--color-white);

    a {
      color: var(--color-white);

      &:hover {
        color: var(--color-white);
      }
    }
  }

  .ant-pagination-item a {
    line-height: 30px;
  }
`;

export const ShowProductsAmount = styled.span`
  color: var(--color-text-muted);
  font-weight: 300;
`;

export const AcсentText = styled.span`
  color: var(--color-text-primary);
`;
