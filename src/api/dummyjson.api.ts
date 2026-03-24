import {
  buildQueryString,
  normalizeQueryArrayValue,
  request,
} from "./api.client";
import type {
  AddProductRequest,
  DeleteProductResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
  Product,
  ProductByIdParams,
  ProductCategoryListResponse,
  ProductsByCategoryParams,
  ProductsCategoriesResponse,
  ProductsQuery,
  ProductsResponse,
  RefreshRequest,
  RefreshResponse,
  SearchProductsQuery,
  UpdateProductRequest,
} from "./dummyjson.types";

type ProductSelectQuery = Pick<ProductsQuery, "select">;

function getProductsQueryParams(query?: ProductsQuery) {
  if (!query) {
    return undefined;
  }

  return {
    limit: query.limit,
    skip: query.skip,
    select: normalizeQueryArrayValue(query.select),
    sortBy: query.sortBy,
    order: query.order,
  };
}

export function login(payload: LoginRequest) {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getAuthUser(accessToken: string) {
  return request<MeResponse>("/auth/me", {
    accessToken,
  });
}

export function refreshAuthSession(payload: RefreshRequest = {}) {
  return request<RefreshResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getProducts(query?: ProductsQuery) {
  const queryString = buildQueryString(getProductsQueryParams(query));
  return request<ProductsResponse>(`/products${queryString}`);
}

export function getProduct(
  params: ProductByIdParams,
  query?: ProductSelectQuery,
) {
  const queryString = buildQueryString({
    select: normalizeQueryArrayValue(query?.select),
  });

  return request<Product>(`/products/${params.id}${queryString}`);
}

export function searchProducts(query: SearchProductsQuery) {
  const queryString = buildQueryString({
    q: query.q,
    limit: query.limit,
    skip: query.skip,
    select: normalizeQueryArrayValue(query.select),
    sortBy: query.sortBy,
    order: query.order,
  });

  return request<ProductsResponse>(`/products/search${queryString}`);
}

export function getProductsCategories() {
  return request<ProductsCategoriesResponse>("/products/categories");
}

export function getProductCategoryList() {
  return request<ProductCategoryListResponse>("/products/category-list");
}

export function getProductsByCategory(
  params: ProductsByCategoryParams,
  query?: ProductsQuery,
) {
  const queryString = buildQueryString(getProductsQueryParams(query));
  return request<ProductsResponse>(
    `/products/category/${params.slug}${queryString}`,
  );
}

export function addProduct(payload: AddProductRequest) {
  return request<Product>("/products/add", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateProduct(
  params: ProductByIdParams,
  payload: UpdateProductRequest,
) {
  return request<Product>(`/products/${params.id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteProduct(params: ProductByIdParams) {
  return request<DeleteProductResponse>(`/products/${params.id}`, {
    method: "DELETE",
  });
}

export const dummyJsonApi = {
  auth: {
    login,
    getAuthUser,
    refreshAuthSession,
  },
  products: {
    getProducts,
    getProduct,
    searchProducts,
    getProductsCategories,
    getProductCategoryList,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
  },
};
