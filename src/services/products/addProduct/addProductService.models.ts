import { createEvent, createStore } from "effector";

const openAddProductDrawer = createEvent();
const closeAddProductDrawer = createEvent();

const $isAddProductDrawerOpen = createStore(false)
  .on(openAddProductDrawer, () => true)
  .on(closeAddProductDrawer, () => false);

export const addProductService = {
  models: {
    $isAddProductDrawerOpen,
  },
  events: {
    closeAddProductDrawer,
    openAddProductDrawer,
  },
};
