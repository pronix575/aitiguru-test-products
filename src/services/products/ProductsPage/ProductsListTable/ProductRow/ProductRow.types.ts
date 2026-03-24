import type { Product } from "@/api/dummyjson.types";

export type Props = {
  isSelected: boolean;
  product: Product;
  onToggle: () => void;
};
