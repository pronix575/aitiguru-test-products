const PAGE_BUTTONS_LIMIT = 5;

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

export function getVisiblePages(totalPages: number, currentPage: number) {
  const pageCount = Math.min(totalPages, PAGE_BUTTONS_LIMIT);
  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(pageCount / 2), totalPages - pageCount + 1),
  );

  return Array.from({ length: pageCount }, (_, index) => startPage + index);
}
