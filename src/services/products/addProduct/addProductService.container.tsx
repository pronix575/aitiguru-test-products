import { AddProductDrawer } from "./AddProductDrawer";
import { useUnit } from "effector-react";
import { notification } from "antd";
import { addProductService } from "./addProductService.models";
import type { AddProductFormValues } from "./addProductService.types";

const { models, events } = addProductService;

export const AddProductContainer = () => {
  const [notificationApi, notificationContext] = notification.useNotification();
  const { isOpen, closeDrawer } = useUnit({
    isOpen: models.$isAddProductDrawerOpen,
    closeDrawer: events.closeAddProductDrawer,
  });

  const handleSubmit: (
    values: AddProductFormValues,
  ) => Promise<void> = async () => {
    closeDrawer();
    notificationApi.success({
      title: "Товар добавлен",
      description: "Новый товар успешно сохранён",
      placement: "bottomLeft",
    });
  };

  return (
    <>
      {notificationContext}
      <AddProductDrawer
        isOpen={isOpen}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
      />
    </>
  );
};
