import type { ProductsQuery, ProductsResponse } from "@/api";
import { createStore, sample } from "effector";
import { createGate } from "effector-react";
import { fetchProductsFx } from "./products.api";

const ProductsGate = createGate();

const $productsPagedList = createStore<ProductsResponse | null>(null).on(
  fetchProductsFx.doneData,
  (_, products) => products,
);

const $productsQueryParams = createStore<ProductsQuery>({
  limit: 5,
});

sample({
  clock: ProductsGate.open,
  source: $productsQueryParams,
  target: fetchProductsFx,
});

export const productsService = {
  gates: {
    ProductsGate,
  },
  models: {
    $productsPagedList,
  },
};
