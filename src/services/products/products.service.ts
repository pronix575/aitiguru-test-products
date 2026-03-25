import type { ProductsQuery, ProductsResponse } from "@/api";
import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { fetchProductsFx } from "./products.api";

const DEFAULT_PRODUCTS_LIMIT = 5;

const ProductsGate = createGate();
const setProductsPage = createEvent<number>();

const $productsPagedList = createStore<ProductsResponse | null>(null).on(
  fetchProductsFx.doneData,
  (_, products) => products,
);

const $productsQueryParams = createStore<ProductsQuery>({
  limit: DEFAULT_PRODUCTS_LIMIT,
  skip: 0,
}).on(setProductsPage, (state, page) => ({
  ...state,
  skip: (page - 1) * (state.limit ?? DEFAULT_PRODUCTS_LIMIT),
}));

sample({
  clock: [ProductsGate.open, $productsQueryParams.updates],
  source: $productsQueryParams,
  target: fetchProductsFx,
});

export const productsService = {
  gates: {
    ProductsGate,
  },
  models: {
    $productsPagedList,
    $isProductsLoading: fetchProductsFx.pending,
  },
  events: {
    setProductsPage,
  },
};
