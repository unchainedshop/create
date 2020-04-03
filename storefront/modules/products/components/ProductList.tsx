import useProductsQuery from '../hooks/useProductsQuery';

const getProductMediaUrl = (product) => {
  const media = product?.media;

  const firstMedia = media[0];

  return firstMedia?.file?.url;
};

const ProductList = () => {
  const { products } = useProductsQuery();

  return (
    <div className="row">
      <div className="col-md-6 col-lg-4">
        {products.map((product) => (
          <div key={product._id}>
            <h2>{product?.texts?.title}</h2>
            <img src={getProductMediaUrl(product)} />
            <div className="p-2">
              <h4 className="mb-0">{product?.texts?.subtitle}</h4>
              <p>{product?.texts?.description}</p>
              <p>{product?.dimensions?.weight * 100} Gramm</p>
              <p>{product?.simulatedPrice?.price?.amount / 100} CHF</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
