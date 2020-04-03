import useProductsQuery from '../hooks/useProductsQuery';

const ProductList = () => {
  const { products } = useProductsQuery();

  return (
    <div className="row">
      <div className="col-md-6 col-lg-4">
        {products.map(product => (
          <div>
            <img src="static/img/Auberginen-Curry.jpg" alt="" />
            <div className="p-2">
              {product._id}
              <h4 className="mb-0">title</h4>
              <p>desc</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
