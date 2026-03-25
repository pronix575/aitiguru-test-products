import type { ProductsResponse } from "@/api";
import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { fetchProductsFx } from "./products.api";
import type {
  ProductSortField,
  ProductSortOrder,
  ProductsListQuery,
} from "./products.types";

const DEFAULT_PRODUCTS_LIMIT = 5;

const ProductsGate = createGate();
const setProductsPage = createEvent<number>();
const setProductsSearchQuery = createEvent<string>();
const toggleProductsSort = createEvent<ProductSortField>();
const reloadProducts = createEvent();

const $productsPagedList = createStore<ProductsResponse | null>(null).on(
  fetchProductsFx.doneData,
  (_, products) => products,
);

const $productsQueryParams = createStore<ProductsListQuery>({
  limit: DEFAULT_PRODUCTS_LIMIT,
  skip: 0,
  q: "",
}).on(setProductsPage, (state, page) => ({
  ...state,
  skip: (page - 1) * (state.limit ?? DEFAULT_PRODUCTS_LIMIT),
}))
.on(setProductsSearchQuery, (state, query) => ({
  ...state,
  q: query,
  skip: 0,
}))
.on(toggleProductsSort, (state, sortField) => ({
  ...state,
  sortBy: sortField,
  order: getNextSortOrder(state.sortBy, state.order, sortField),
  skip: 0,
}));

sample({
  clock: [ProductsGate.open, $productsQueryParams.updates, reloadProducts],
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
    $productsQueryParams,
  },
  events: {
    setProductsPage,
    setProductsSearchQuery,
    toggleProductsSort,
    reloadProducts,
  },
};

function getNextSortOrder(
  currentSortBy: ProductSortField | undefined,
  currentOrder: ProductSortOrder | undefined,
  nextSortBy: ProductSortField,
): ProductSortOrder {
  if (currentSortBy !== nextSortBy) {
    return "asc";
  }

  return currentOrder === "asc" ? "desc" : "asc";
}
