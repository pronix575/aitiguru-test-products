import type { ProductsResponse } from "@/api/dummyjson.types";
import type { ProductSortField, ProductSortOrder } from "../../products.types";

export type Props = {
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onSortChange: (field: ProductSortField) => void;
  products: ProductsResponse | null;
  sortBy?: ProductSortField;
  sortOrder?: ProductSortOrder;
};

export type TableCheckboxProps = {
  $checked: boolean;
};

export type SortTriggerProps = {
  $isActive: boolean;
};
