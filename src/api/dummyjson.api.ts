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

const DUMMYJSON_BASE_URL = "https://dummyjson.com";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: BodyInit | null;
  accessToken?: string;
  includeCredentials?: boolean;
}

type ProductSelectQuery = Pick<ProductsQuery, "select">;

function buildQueryString(query?: Record<string, string | number | undefined>) {
  if (!query) {
    return "";
  }

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) {
      continue;
    }

    searchParams.set(key, String(value));
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

function normalizeSelect(select?: string | string[]) {
  if (!select) {
    return undefined;
  }

  return Array.isArray(select) ? select.join(",") : select;
}

function getProductsQueryParams(query?: ProductsQuery) {
  if (!query) {
    return undefined;
  }

  return {
    limit: query.limit,
    skip: query.skip,
    select: normalizeSelect(query.select),
    sortBy: query.sortBy,
    order: query.order,
  };
}

async function request<T>(path: string, options: RequestOptions = {}) {
  const headers = new Headers();

  if (options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (options.accessToken) {
    headers.set("Authorization", `Bearer ${options.accessToken}`);
  }

  const response = await fetch(`${DUMMYJSON_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body,
    credentials: options.includeCredentials ? "include" : "same-origin",
  });

  if (!response.ok) {
    const fallbackMessage = `${response.status} ${response.statusText}`;

    try {
      const errorBody = (await response.json()) as { message?: string };
      throw new Error(errorBody.message ?? fallbackMessage);
    } catch {
      throw new Error(fallbackMessage);
    }
  }

  return (await response.json()) as T;
}

export function login(payload: LoginRequest) {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
    includeCredentials: true,
  });
}

export function getAuthUser(accessToken: string) {
  return request<MeResponse>("/auth/me", {
    accessToken,
    includeCredentials: true,
  });
}

export function refreshAuthSession(payload: RefreshRequest = {}) {
  return request<RefreshResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify(payload),
    includeCredentials: true,
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
    select: normalizeSelect(query?.select),
  });

  return request<Product>(`/products/${params.id}${queryString}`);
}

export function searchProducts(query: SearchProductsQuery) {
  const queryString = buildQueryString({
    q: query.q,
    limit: query.limit,
    skip: query.skip,
    select: normalizeSelect(query.select),
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
  login,
  getAuthUser,
  refreshAuthSession,
  getProducts,
  getProduct,
  searchProducts,
  getProductsCategories,
  getProductCategoryList,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
};
