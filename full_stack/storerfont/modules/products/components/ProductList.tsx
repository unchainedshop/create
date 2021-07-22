import ProductListItem from './ProductListItem';

const ProductList = ({ products }) => {
  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <>
            <div key={product._id} className="col-sm-6">
              <div className="product-list-item d-flex flex-column h-100">
                <ProductListItem product={product} />
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
