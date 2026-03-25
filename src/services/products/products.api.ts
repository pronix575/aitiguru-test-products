import { dummyJsonApi } from "@/api";
import { createEffect } from "effector";
import type { ProductsListQuery } from "./products.types";

export const fetchProductsFx = createEffect(async (query: ProductsListQuery) => {
  const { q, ...productsQuery } = query;

  if (q.trim()) {
    return dummyJsonApi.products.searchProducts({
      ...productsQuery,
      q: q.trim(),
    });
  }

  return dummyJsonApi.products.getProducts(productsQuery);
});
