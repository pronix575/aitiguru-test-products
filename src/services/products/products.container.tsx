import { useUnit } from "effector-react";
import { productsService } from "./products.service";
import { ProductsPage } from "./ProductsPage";

const {
  gates: { ProductsGate },
  models,
} = productsService;

export const ProductsContainer = () => {
  const { productsList } = useUnit({
    productsList: models.$productsPagedList,
  });

  return (
    <>
      <ProductsGate />
      <ProductsPage productsList={productsList} />
    </>
  );
};
