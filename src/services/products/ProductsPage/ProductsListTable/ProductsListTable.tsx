import type { FC } from "react";
import {
  Body,
  Cell,
  Footer,
  HeaderRow,
  Pagination,
  PaginationArrow,
  PaginationButton,
  Table,
  TableScroll,
  Wrapper,
} from "./ProductsListTable.styled";
import { Checkbox } from "./ProductRow/ProductRow.styled";
import { ProductRow } from "./ProductRow";
import { useProductsListTable } from "./ProductsListTable.hook";
import type { Props } from "./ProductsListTable.types";

export const ProductsListTable: FC<Props> = ({ products }) => {
  const {
    allSelected,
    currentPage,
    rangeEnd,
    rangeStart,
    selectedProductIds,
    toggleAllProducts,
    toggleProduct,
    visiblePages,
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
        <span>
          Показано {rangeStart}-{rangeEnd} из {products.total}
        </span>
        <Pagination>
          <PaginationArrow type="button" aria-label="Предыдущая страница">
            ‹
          </PaginationArrow>
          {visiblePages.map((pageNumber) => (
            <PaginationButton
              key={pageNumber}
              type="button"
              $isActive={pageNumber === currentPage}
            >
              {pageNumber}
            </PaginationButton>
          ))}
          <PaginationArrow type="button" aria-label="Следующая страница">
            ›
          </PaginationArrow>
        </Pagination>
      </Footer>
    </Wrapper>
  );
};
