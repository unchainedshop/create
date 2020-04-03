import useProductsQuery from '../hooks/useProductsQuery';

const ProductList = () => {
  const { products } = useProductsQuery();

  return (
    <div>
      {products.map((product) => (
        <div>{product._id}</div>
      ))}
    </div>
  );
};

export default ProductList;
