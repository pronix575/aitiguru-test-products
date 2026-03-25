import type { ProductsResponse } from "@/api";

export type Props = {
  isLoading: boolean;
  onPageChange: (page: number) => void;
  productsList: ProductsResponse | null;
};
