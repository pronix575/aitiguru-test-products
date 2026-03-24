import type { FC } from "react";
import { Wrapper } from "./ProductsListTable.styled";
import type { Props } from "./ProductsListTable.types";

export const ProductsListTable: FC<Props> = ({ products }) => {
  return (
    <Wrapper>
      {products.products.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </Wrapper>
  );
};
