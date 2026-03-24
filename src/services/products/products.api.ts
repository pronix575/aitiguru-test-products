import { dummyJsonApi } from "@/api";
import { createEffect } from "effector";

export const fetchProductsFx = createEffect(dummyJsonApi.products.getProducts);
