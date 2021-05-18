import ProductListItem from './ProductListItem';

const ProductList = ({ products }) => {
  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <ProductListItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
