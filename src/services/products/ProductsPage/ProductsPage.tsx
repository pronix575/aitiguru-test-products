import type { FC } from "react";
import {
  ProductsHeader,
  ProductsList,
  SearchPanel,
  Title,
  Wrapper,
} from "./ProductsPage.styled";
import type { Props } from "./ProductsPage.types";
import { Button } from "antd";
import { ProductsListTable } from "./ProductsListTable";

export const ProductsPage: FC<Props> = ({ productsList }) => {
  return (
    <Wrapper>
      <SearchPanel>
        <Title size="large">Товары</Title>
      </SearchPanel>
      <ProductsList>
        <ProductsHeader>
          <Title size="medium">Все позиции</Title>
          <Button type="primary">Добавить</Button>
        </ProductsHeader>
        {productsList && <ProductsListTable products={productsList} />}
      </ProductsList>
    </Wrapper>
  );
};
