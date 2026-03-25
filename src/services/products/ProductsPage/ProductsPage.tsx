import {
  PlusCircleOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import type { FC } from "react";
import {
  HeaderActions,
  ProductsHeader,
  ProductsList,
  SearchInput,
  SearchInputWrap,
  SearchPanel,
  Title,
  Wrapper,
} from "./ProductsPage.styled";
import type { Props } from "./ProductsPage.types";
import { ProductsListTable } from "./ProductsListTable";
import { Button } from "antd";

export const ProductsPage: FC<Props> = ({
  productsList,
  isLoading,
  onAddProductClick,
  onPageChange,
  onReload,
  onSearchChange,
  onSortChange,
  searchQuery,
  sortBy,
  sortOrder,
}) => {
  return (
    <Wrapper>
      <SearchPanel>
        <Title size="large">Товары</Title>
        <SearchInputWrap>
          <SearchInput
            allowClear
            placeholder="Найти"
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </SearchInputWrap>
      </SearchPanel>
      <ProductsList>
        <ProductsHeader>
          <Title size="medium">Все позиции</Title>
          <HeaderActions>
            <Button
              icon={<SyncOutlined />}
              loading={isLoading}
              onClick={onReload}
            />
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={onAddProductClick}
            >
              Добавить
            </Button>
          </HeaderActions>
        </ProductsHeader>
        <ProductsListTable
          products={productsList}
          isLoading={isLoading}
          onPageChange={onPageChange}
          onSortChange={onSortChange}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </ProductsList>
    </Wrapper>
  );
};
