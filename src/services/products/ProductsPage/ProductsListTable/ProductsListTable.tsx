import type { FC } from "react";
import {
  AcсentText,
  Body,
  Cell,
  Footer,
  HeaderRow,
  PaginationControl,
  ShowProductsAmount,
  Table,
  TableScroll,
  Wrapper,
} from "./ProductsListTable.styled";
import { Checkbox } from "./ProductRow/ProductRow.styled";
import { ProductRow } from "./ProductRow";
import { useProductsListTable } from "./ProductsListTable.hook";
import type { Props } from "./ProductsListTable.types";

export const ProductsListTable: FC<Props> = ({
  products,
  isLoading,
  onPageChange,
}) => {
  const {
    allSelected,
    currentPage,
    rangeEnd,
    rangeStart,
    selectedProductIds,
    toggleAllProducts,
    toggleProduct,
  } = useProductsListTable(products);

  return (
    <Wrapper>
      <TableScroll>
        <Table>
          <HeaderRow>
            <Cell>
              <Checkbox
                type="button"
                $checked={allSelected}
                aria-label="Выбрать все товары"
                onClick={toggleAllProducts}
              />
            </Cell>
            <Cell>Наименование</Cell>
            <Cell>Вендор</Cell>
            <Cell>Артикул</Cell>
            <Cell>Оценка</Cell>
            <Cell>Цена, ₽</Cell>
            <Cell />
            <Cell />
          </HeaderRow>

          <Body>
            {products.products.map((product) => {
              const isSelected = selectedProductIds.includes(product.id);

              return (
                <ProductRow
                  key={product.id}
                  isSelected={isSelected}
                  product={product}
                  onToggle={() => toggleProduct(product.id)}
                />
              );
            })}
          </Body>
        </Table>
      </TableScroll>

      <Footer>
        <ShowProductsAmount>
          Показано{" "}
          <AcсentText>
            {rangeStart}-{rangeEnd}
          </AcсentText>{" "}
          из <AcсentText>{products.total}</AcсentText>
        </ShowProductsAmount>
        <PaginationControl
          current={currentPage}
          defaultPageSize={products.limit}
          disabled={isLoading}
          hideOnSinglePage
          showSizeChanger={false}
          total={products.total}
          onChange={onPageChange}
        />
      </Footer>
    </Wrapper>
  );
};
