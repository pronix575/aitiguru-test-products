import styled from "styled-components";
import { TABLE_COLUMNS } from "../../ProductsListTable.styled";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${TABLE_COLUMNS};
  align-items: center;
  gap: 24px;
  min-height: 74px;
  border-bottom: 1px solid var(--color-border);
  padding: 0 18px;
`;

export const Cell = styled.div`
  min-width: 0;
`;

export const ProductCell = styled(Cell)`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const ProductInfo = styled.div`
  display: flex;
  min-width: 0;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`;

export const ActionCell = styled(Cell)`
  display: flex;
  align-items: center;
`;
