import ProductListItem from './ProductListItem';

const ProductList = ({ products }) => {
  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <ProductListItem product={product?.product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
