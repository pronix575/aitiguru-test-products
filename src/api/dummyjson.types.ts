export interface Pagination {
  total: number;
  skip: number;
  limit: number;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  [key: string]: unknown;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

export type LoginResponse = AuthUser & AuthTokens;

export type MeResponse = AuthUser;

export interface RefreshRequest {
  refreshToken?: string;
  expiresInMins?: number;
}

export type RefreshResponse = AuthTokens;

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse extends Pagination {
  products: Product[];
}

export interface ProductCategory {
  slug: string;
  name: string;
  url: string;
}

export type ProductCategoryListResponse = string[];

export type ProductsCategoriesResponse = ProductCategory[];

export interface ProductsQuery {
  limit?: number;
  skip?: number;
  select?: string | string[];
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface SearchProductsQuery extends ProductsQuery {
  q: string;
}

export interface ProductByIdParams {
  id: number | string;
}

export interface ProductsByCategoryParams {
  slug: string;
}

export type AddProductRequest = Partial<Omit<Product, "id">>;

export type UpdateProductRequest = Partial<Product>;

export interface DeleteProductResponse extends Product {
  isDeleted: true;
  deletedOn: string;
}
