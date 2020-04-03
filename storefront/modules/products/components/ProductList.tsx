import useProductsQuery from '../hooks/useProductsQuery';

const getProductMediaUrl = product => {
  const media = product?.media;

  const firstMedia = media[0];

  return firstMedia?.file?.url;
};

const ProductList = () => {
  const { products } = useProductsQuery();

  return (
    <div className="row">
      {products.map(product => (
        <div className="col-md-6 col-lg-4 product-list-item" key={product._id}>
          <h2 className="px-2">{product?.texts?.title}</h2>
          <img src={getProductMediaUrl(product)} />
          <div className="p-2">
            <h4 className="my-0">
              CHF {product?.simulatedPrice?.price?.amount / 100}.-
            </h4>
            <h4 className="mb-0">{product?.texts?.subtitle}</h4>
            <p>{product?.texts?.description}</p>
            <p>{product?.dimensions?.weight * 1000} Gramm</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
