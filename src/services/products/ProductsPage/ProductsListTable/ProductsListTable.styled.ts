import styled from "styled-components";
import type { PaginationButtonProps } from "./ProductsListTable.types";

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
  color: #aeb3bd;
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

export const Footer = styled.div`
  margin-top: auto;
  padding-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  color: #595d66;
  font-size: 16px;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PaginationArrow = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #b8bcc5;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
`;

export const PaginationButton = styled.button<PaginationButtonProps>`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: 6px;
  border: 1px solid
    ${({ $isActive }) => ($isActive ? "transparent" : "var(--color-border)")};
  background: ${({ $isActive }) =>
    $isActive ? "var(--color-primary)" : "transparent"};
  color: ${({ $isActive }) => ($isActive ? "var(--color-white)" : "#b8bcc5")};
  font-size: 16px;
  cursor: pointer;
`;
