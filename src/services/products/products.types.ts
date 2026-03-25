import type { ProductsQuery } from "@/api";

export type ProductSortField = "price" | "rating";
export type ProductSortOrder = NonNullable<ProductsQuery["order"]>;

export type ProductsListQuery = ProductsQuery & {
  q: string;
  sortBy?: ProductSortField;
  order?: ProductSortOrder;
};
