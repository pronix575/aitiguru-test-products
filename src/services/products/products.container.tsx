import { useUnit } from "effector-react";
import { productsService } from "./products.service";
import { ProductsPage } from "./ProductsPage";

const {
  gates: { ProductsGate },
  models,
  events,
} = productsService;

export const ProductsContainer = () => {
  const {
    productsList,
    isLoading,
    setProductsPage,
    queryParams,
    onReload,
    onSearchChange,
    onSortChange,
  } = useUnit({
    productsList: models.$productsPagedList,
    isLoading: models.$isProductsLoading,
    setProductsPage: events.setProductsPage,
    queryParams: models.$productsQueryParams,
    onReload: events.reloadProducts,
    onSearchChange: events.setProductsSearchQuery,
    onSortChange: events.toggleProductsSort,
  });

  return (
    <>
      <ProductsGate />
      <ProductsPage
        productsList={productsList}
        isLoading={isLoading}
        onPageChange={setProductsPage}
        onReload={onReload}
        onSearchChange={onSearchChange}
        onSortChange={onSortChange}
        searchQuery={queryParams.q}
        sortBy={queryParams.sortBy}
        sortOrder={queryParams.order}
      />
    </>
  );
};
