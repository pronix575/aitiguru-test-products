import { useUnit } from "effector-react";
import { AddProductContainer, addProductService } from "./addProduct";
import { productsService } from "./products.service";
import { ProductsPage } from "./ProductsPage";

const {
  gates: { ProductsGate },
  models,
  events,
} = productsService;

const {
  events: { openAddProductDrawer },
} = addProductService;

export const ProductsContainer = () => {
  const {
    productsList,
    isLoading,
    onAddProductClick,
    setProductsPage,
    queryParams,
    searchQuery,
    onReload,
    onSearchChange,
    onSortChange,
  } = useUnit({
    productsList: models.$productsPagedList,
    isLoading: models.$isProductsLoading,
    onAddProductClick: openAddProductDrawer,
    setProductsPage: events.setProductsPage,
    queryParams: models.$productsQueryParams,
    searchQuery: models.$productsSearchQuery,
    onReload: events.reloadProducts,
    onSearchChange: events.setProductsSearchQuery,
    onSortChange: events.toggleProductsSort,
  });

  return (
    <>
      <ProductsGate />
      <AddProductContainer />
      <ProductsPage
        productsList={productsList}
        isLoading={isLoading}
        onAddProductClick={onAddProductClick}
        onPageChange={setProductsPage}
        onReload={onReload}
        onSearchChange={onSearchChange}
        onSortChange={onSortChange}
        searchQuery={searchQuery}
        sortBy={queryParams.sortBy}
        sortOrder={queryParams.order}
      />
    </>
  );
};
