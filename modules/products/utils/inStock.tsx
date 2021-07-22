const inStock = (stock, required = 1): boolean =>
  stock?.filter((i) => i.quantity > 0 && i.quantity >= required).length;
export default inStock;
