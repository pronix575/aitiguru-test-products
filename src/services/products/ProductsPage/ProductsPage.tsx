import type { FC } from "react";
import {
  ProductsList,
  SearchPanel,
  Title,
  Wrapper,
} from "./ProductsPage.styled";
import type { Props } from "./ProductsPage.types";

export const ProductsPage: FC<Props> = ({ productsList }) => {
  return (
    <Wrapper>
      <SearchPanel>
        <Title>Товары</Title>
      </SearchPanel>
      <ProductsList>
        {productsList ? (
          <ul>
            {productsList.products.map((product) => (
              <li key={product.id}>{product.price}</li>
            ))}
          </ul>
        ) : (
          <div>Loading products...</div>
        )}
      </ProductsList>
    </Wrapper>
  );
};
