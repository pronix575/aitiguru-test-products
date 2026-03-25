import type { ProductsResponse } from "@/api";
import type { ProductSortField, ProductSortOrder } from "../products.types";

export type Props = {
  isLoading: boolean;
  onReload: () => void;
  onPageChange: (page: number) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (field: ProductSortField) => void;
  productsList: ProductsResponse | null;
  searchQuery: string;
  sortBy?: ProductSortField;
  sortOrder?: ProductSortOrder;
};
