import { Button, Drawer, Form, Input } from "antd";
import { useFormik } from "formik";
import type { ChangeEvent, FC } from "react";
import { Footer, Wrapper } from "./AddProductDrawer.styled";
import type { Props } from "./AddProductDrawer.types";
import type { AddProductFormValues } from "../addProductService.types";
import { INITIAL_VALUES, validationSchema } from "./AddProductDrawer.constants";

export const AddProductDrawer: FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const formik = useFormik<AddProductFormValues>({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit: async (values, helpers) => {
      await onSubmit({
        ...values,
        title: values.title.trim(),
        price: values.price.trim().replace(",", "."),
        brand: values.brand.trim(),
        sku: values.sku.trim(),
      });

      helpers.resetForm();
    },
  });

  const shouldShowError = <Field extends keyof AddProductFormValues>(
    field: Field,
  ) => {
    return Boolean(
      formik.errors[field] && (formik.touched[field] || formik.submitCount > 0),
    );
  };

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = event.target.value
      .replace(",", ".")
      .replace(/[^\d.]/g, "");
    const [integerPart = "", ...fractionalParts] = normalizedValue.split(".");
    const nextValue =
      fractionalParts.length > 0
        ? `${integerPart}.${fractionalParts.join("")}`
        : integerPart;

    void formik.setFieldValue("price", nextValue);
  };

  return (
    <Drawer
      title="Добавление товара"
      placement="right"
      width={440}
      open={isOpen}
      onClose={handleClose}
    >
      <Wrapper onSubmit={formik.handleSubmit}>
        <Form layout="vertical" component={false}>
          <Form.Item
            label="Наименование"
            validateStatus={shouldShowError("title") ? "error" : ""}
            help={shouldShowError("title") ? formik.errors.title : undefined}
          >
            <Input
              id="title"
              name="title"
              placeholder="Например, Apple iPhone 15"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Цена"
            validateStatus={shouldShowError("price") ? "error" : ""}
            help={shouldShowError("price") ? formik.errors.price : undefined}
          >
            <Input
              id="price"
              name="price"
              inputMode="decimal"
              placeholder="Например, 99990.50"
              suffix="₽"
              value={formik.values.price}
              onChange={handlePriceChange}
              size="large"
              onBlur={() => void formik.setFieldTouched("price", true)}
            />
          </Form.Item>

          <Form.Item
            label="Вендор"
            validateStatus={shouldShowError("brand") ? "error" : ""}
            help={shouldShowError("brand") ? formik.errors.brand : undefined}
          >
            <Input
              id="brand"
              name="brand"
              placeholder="Например, Apple"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Артикул"
            validateStatus={shouldShowError("sku") ? "error" : ""}
            help={shouldShowError("sku") ? formik.errors.sku : undefined}
          >
            <Input
              id="sku"
              name="sku"
              placeholder="Например, IP15-128-BLK"
              value={formik.values.sku}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size="large"
            />
          </Form.Item>
        </Form>

        <Footer>
          <Button onClick={handleClose} size="large">
            Отмена
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={formik.isSubmitting}
          >
            Сохранить
          </Button>
        </Footer>
      </Wrapper>
    </Drawer>
  );
};
