import { Skeleton } from "antd";
import {
  ActionCell,
  Cell,
  ProductCell,
  ProductInfo,
  Wrapper,
} from "./ProductRowSceleton.styled";

export const ProductRowSceleton = () => {
  return (
    <Wrapper>
      <Cell>
        <Skeleton.Button
          active
          size="small"
          style={{ width: 24, height: 24, borderRadius: 6 }}
        />
      </Cell>

      <ProductCell>
        <Skeleton.Avatar
          active
          shape="square"
          size={48}
          style={{ borderRadius: 9, flexShrink: 0 }}
        />
        <ProductInfo>
          <Skeleton.Input active size="small" style={{ width: "72%" }} />
          <Skeleton.Input active size="small" style={{ width: "44%" }} />
        </ProductInfo>
      </ProductCell>

      <Cell>
        <Skeleton.Input active size="small" style={{ width: "78%" }} />
      </Cell>

      <Cell>
        <Skeleton.Input active size="small" style={{ width: "64%" }} />
      </Cell>

      <Cell>
        <Skeleton.Input active size="small" style={{ width: 56 }} />
      </Cell>

      <Cell>
        <Skeleton.Input active size="small" style={{ width: 92 }} />
      </Cell>

      <ActionCell>
        <Skeleton.Button
          active
          size="small"
          style={{ width: 52, height: 30, borderRadius: 999 }}
        />
      </ActionCell>

      <ActionCell>
        <Skeleton.Button
          active
          size="small"
          style={{ width: 32, height: 32, borderRadius: 999 }}
        />
      </ActionCell>
    </Wrapper>
  );
};
