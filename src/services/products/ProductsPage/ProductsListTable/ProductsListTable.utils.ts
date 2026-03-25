export function formatCategoryLabel(category: string) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatPriceParts(price: number) {
  const [integerPart, fractionalPart = "00"] = formatPrice(price).split(",");

  return {
    fractionalPart,
    integerPart,
  };
}
