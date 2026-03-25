import { useState } from "react";
import type { ProductsResponse } from "@/api/dummyjson.types";

export function useProductsListTable(products: ProductsResponse | null) {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const productsList = products?.products ?? [];
  const productsLimit = products?.limit ?? 0;
  const productsSkip = products?.skip ?? 0;
  const productsTotal = products?.total ?? 0;

  const currentPage =
    productsLimit > 0 ? Math.floor(productsSkip / productsLimit) + 1 : 1;
  const allSelected =
    productsList.length > 0 && selectedProductIds.length === productsList.length;
  const rangeStart = productsTotal > 0 ? productsSkip + 1 : 0;
  const rangeEnd = Math.min(productsSkip + productsList.length, productsTotal);

  const toggleProduct = (productId: number) => {
    setSelectedProductIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((currentId) => currentId !== productId)
        : [...currentIds, productId],
    );
  };

  const toggleAllProducts = () => {
    setSelectedProductIds((currentIds) =>
      currentIds.length === productsList.length
        ? []
        : productsList.map((product) => product.id),
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
  };
}
