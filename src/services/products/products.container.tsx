import { useUnit } from "effector-react";
import { productsService } from "./products.service";
import { ProductsPage } from "./ProductsPage";

const {
  gates: { ProductsGate },
  models,
  events,
} = productsService;

export const ProductsContainer = () => {
  const { productsList, isLoading, setProductsPage } = useUnit({
    productsList: models.$productsPagedList,
    isLoading: models.$isProductsLoading,
    setProductsPage: events.setProductsPage,
  });

  return (
    <>
      <ProductsGate />
      <ProductsPage
        productsList={productsList}
        isLoading={isLoading}
        onPageChange={setProductsPage}
      />
    </>
  );
};
