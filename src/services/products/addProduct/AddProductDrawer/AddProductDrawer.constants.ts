import type { AddProductFormValues } from "../addProductService.types";
import * as yup from "yup";

export const INITIAL_VALUES: AddProductFormValues = {
  title: "",
  price: "",
  brand: "",
  sku: "",
};

export const validationSchema = yup.object({
  title: yup.string().trim().required("Введите наименование товара"),
  price: yup
    .string()
    .trim()
    .required("Укажите цену")
    .test("price-format", "Введите цену числом", (value) => {
      if (!value) {
        return false;
      }

      return /^\d+([.,]\d+)?$/.test(value);
    })
    .test("price-positive", "Цена должна быть больше нуля", (value) => {
      if (!value) {
        return false;
      }

      return Number(value.replace(",", ".")) > 0;
    }),
  brand: yup.string().trim().required("Введите вендора"),
  sku: yup.string().trim().required("Введите артикул"),
});
