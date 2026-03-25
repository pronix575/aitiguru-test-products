import type { AddProductFormValues } from "../addProductService.types";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: AddProductFormValues) => Promise<void> | void;
};
