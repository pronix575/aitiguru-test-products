import type { ProductsResponse } from "@/api/dummyjson.types";

export type Props = {
  products: ProductsResponse;
};

export type TableCheckboxProps = {
  $checked: boolean;
};

export type PaginationButtonProps = {
  $isActive: boolean;
};
