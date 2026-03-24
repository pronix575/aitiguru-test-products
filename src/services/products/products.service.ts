import type { ProductsResponse } from "@/api";
import { createStore } from "effector";
import { createGate } from "effector-react";
import { fetchProductsFx } from "./products.api";

const ProductsGate = createGate();

const $productsPagedList = createStore<ProductsResponse | null>(null).on(
  fetchProductsFx.doneData,
  (_, products) => products,
);

export const productsService = {
  gates: {
    ProductsGate,
  },
  models: {
    $productsPagedList,
  },
};
