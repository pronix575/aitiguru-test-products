import type { ProductsResponse } from "@/api/dummyjson.types";

export type Props = {
  isLoading: boolean;
  onPageChange: (page: number) => void;
  products: ProductsResponse;
};

export type TableCheckboxProps = {
  $checked: boolean;
};
