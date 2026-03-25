import { Button } from "antd";
import styled, { css } from "styled-components";
import { TABLE_COLUMNS } from "../ProductsListTable.styled";
import type { TableCheckboxProps } from "../ProductsListTable.types";

export const Wrapper = styled.div<{ $isSelected: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: ${TABLE_COLUMNS};
  align-items: center;
  gap: 24px;
  min-height: 74px;
  border-bottom: 1px solid var(--color-border);
  padding: 0 18px;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      &::before {
        position: absolute;
        inset: -1px auto -1px 0;
        width: 3px;
        background: var(--color-primary);
        content: "";
      }
    `}
`;

export const Cell = styled.div`
  min-width: 0;
`;

export const Checkbox = styled.button<TableCheckboxProps>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1.5px solid
    ${({ $checked }) => ($checked ? "var(--color-primary)" : "#c7ccd6")};
  background: ${({ $checked }) =>
    $checked ? "var(--color-primary)" : "transparent"};
  position: relative;
  padding: 0;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  &::after {
    position: absolute;
    inset: 5px;
    border-radius: 3px;
    background: var(--color-white);
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    content: "";
  }
`;

export const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
`;

export const Thumbnail = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 9px;
  background: #d9d9d9;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const ProductInfo = styled.div`
  min-width: 0;
`;

export const ProductTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #26282d;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
`;

export const ProductCategory = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #b8bcc5;
  font-size: 14px;
  line-height: 1.3;
  margin-top: 2px;
`;

export const BoldText = styled.div`
  color: #202020;
  font-size: 16px;
  font-weight: 700;
`;

export const ValueText = styled.div`
  color: #202020;
  font-size: 16px;
  line-height: 1.3;
`;

export const RatingValue = styled(ValueText)<{ $isLow: boolean }>`
  ${({ $isLow }) =>
    $isLow &&
    css`
      color: #ff3b30;
    `}
`;

export const PriceValue = styled(ValueText)`
  letter-spacing: 0.08em;
  white-space: nowrap;
  font-family: monospace;
`;

export const AddButton = styled(Button)`
  height: 30px;
  min-width: 52px;

  &.ant-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    font-size: 24px;
    padding-inline: 24px;
  }
`;

export const MoreButton = styled(Button)`
  width: 32px;
  height: 32px;

  &.ant-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-width: 2px;
    border-color: #b8bcc5;
    color: #b8bcc5;
    background: transparent;
    box-shadow: none;
  }

  &.ant-btn .anticon {
    font-size: 18px;
    line-height: 1;
  }
`;
