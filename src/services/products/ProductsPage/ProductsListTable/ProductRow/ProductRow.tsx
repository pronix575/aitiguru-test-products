import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { FC } from "react";
import {
  AddButton,
  BoldText,
  Cell,
  Checkbox,
  MoreButton,
  PriceValue,
  ProductCategory,
  ProductCell,
  ProductInfo,
  ProductTitle,
  RatingValue,
  Thumbnail,
  ThumbnailImage,
  ValueText,
  Wrapper,
} from "./ProductRow.styled";
import { formatCategoryLabel, formatPrice } from "../ProductsListTable.utils";
import type { Props } from "./ProductRow.types";
import { RAITING_LOW_THRESHOLD } from "./ProductRow.constants";

export const ProductRow: FC<Props> = ({ isSelected, product, onToggle }) => {
  const rating = Number(product.rating.toFixed(1));

  return (
    <Wrapper $isSelected={isSelected}>
      <Cell>
        <Checkbox
          type="button"
          $checked={isSelected}
          aria-label={`Выбрать товар ${product.title}`}
          onClick={onToggle}
        />
      </Cell>

      <ProductCell>
        <Thumbnail>
          <ThumbnailImage src={product.thumbnail} alt={product.title} />
        </Thumbnail>
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductCategory>
            {formatCategoryLabel(product.category)}
          </ProductCategory>
        </ProductInfo>
      </ProductCell>

      <Cell>
        <BoldText>{product.brand ?? "Без бренда"}</BoldText>
      </Cell>

      <Cell>
        <ValueText>{product.sku}</ValueText>
      </Cell>

      <Cell>
        <RatingValue $isLow={rating < RAITING_LOW_THRESHOLD}>
          {rating}/5
        </RatingValue>
      </Cell>

      <Cell>
        <PriceValue>{formatPrice(product.price)}</PriceValue>
      </Cell>

      <Cell>
        <AddButton
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          aria-label={`Добавить ${product.title}`}
        />
      </Cell>

      <Cell>
        <MoreButton
          shape="circle"
          icon={<EllipsisOutlined />}
          aria-label={`Действия для ${product.title}`}
        />
      </Cell>
    </Wrapper>
  );
};
