import {
  CaretDownOutlined,
  CaretUpOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import type { FC } from "react";
import {
  AcсentText,
  Body,
  Cell,
  Footer,
  HeaderRow,
  PaginationControl,
  ShowProductsAmount,
  SortTrigger,
  Table,
  TableScroll,
  Wrapper,
} from "./ProductsListTable.styled";
import { Checkbox } from "./ProductRow/ProductRow.styled";
import { ProductRow } from "./ProductRow";
import { ProductRowSceleton } from "./ProductRow/ProductRowSceleton";
import { useProductsListTable } from "./ProductsListTable.hook";
import type { Props } from "./ProductsListTable.types";

const PRODUCT_ROW_SCELETONS_AMOUNT = 5;

export const ProductsListTable: FC<Props> = ({
  products,
  isLoading,
  onPageChange,
  onSortChange,
  sortBy,
  sortOrder,
}) => {
  const productsList = products?.products ?? [];
  const totalProducts = products?.total ?? 0;
  const productsLimit = products?.limit ?? PRODUCT_ROW_SCELETONS_AMOUNT;
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
            <Cell>
              <SortTrigger
                type="button"
                $isActive={sortBy === "rating"}
                onClick={() => onSortChange("rating")}
              >
                Оценка
                <SortIcon field="rating" sortBy={sortBy} sortOrder={sortOrder} />
              </SortTrigger>
            </Cell>
            <Cell>
              <SortTrigger
                type="button"
                $isActive={sortBy === "price"}
                onClick={() => onSortChange("price")}
              >
                Цена, ₽
                <SortIcon field="price" sortBy={sortBy} sortOrder={sortOrder} />
              </SortTrigger>
            </Cell>
            <Cell />
            <Cell />
          </HeaderRow>

          <Body>
            {isLoading
              ? Array.from({ length: PRODUCT_ROW_SCELETONS_AMOUNT }).map(
                  (_, index) => <ProductRowSceleton key={index} />,
                )
              : productsList.map((product) => {
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
          из <AcсentText>{totalProducts}</AcсentText>
        </ShowProductsAmount>
        <PaginationControl
          current={currentPage}
          defaultPageSize={productsLimit}
          disabled={isLoading}
          hideOnSinglePage
          showSizeChanger={false}
          total={totalProducts}
          onChange={onPageChange}
        />
      </Footer>
    </Wrapper>
  );
};

type SortIconProps = {
  field: "price" | "rating";
  sortBy?: Props["sortBy"];
  sortOrder?: Props["sortOrder"];
};

const SortIcon: FC<SortIconProps> = ({ field, sortBy, sortOrder }) => {
  if (sortBy !== field) {
    return <SwapOutlined />;
  }

  return sortOrder === "asc" ? <CaretUpOutlined /> : <CaretDownOutlined />;
};
