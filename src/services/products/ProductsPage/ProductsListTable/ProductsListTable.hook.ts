import { useState } from "react";
import type { ProductsResponse } from "@/api/dummyjson.types";
import { getVisiblePages } from "./ProductsListTable.utils";

export function useProductsListTable(products: ProductsResponse) {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const totalPages = Math.max(1, Math.ceil(products.total / products.limit));
  const currentPage = Math.floor(products.skip / products.limit) + 1;
  const visiblePages = getVisiblePages(totalPages, currentPage);
  const allSelected =
    products.products.length > 0 &&
    selectedProductIds.length === products.products.length;
  const rangeStart = products.skip + 1;
  const rangeEnd = Math.min(products.skip + products.products.length, products.total);

  const toggleProduct = (productId: number) => {
    setSelectedProductIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((currentId) => currentId !== productId)
        : [...currentIds, productId],
    );
  };

  const toggleAllProducts = () => {
    setSelectedProductIds((currentIds) =>
      currentIds.length === products.products.length
        ? []
        : products.products.map((product) => product.id),
    );
  };

  return {
    allSelected,
    currentPage,
    rangeEnd,
    rangeStart,
    selectedProductIds,
    toggleAllProducts,
    toggleProduct,
    visiblePages,
  };
}
