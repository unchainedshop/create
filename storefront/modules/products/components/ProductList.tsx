import Link from 'next/link';

import useProductListQuery from '../hooks/useProductListQuery';
import getProductMediaUrl from '../utils/getProductMediaUrl';

const ProductList = () => {
  const { products } = useProductListQuery();

  return (
    <div className="row">
      {products.map((product) => (
        <Link
          key={product._id}
          href="/curry/[slug]"
          as={`/curry/${product.texts.slug}`}
        >
          <a className="col-md-6 col-lg-4 product-list-item">
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
          </a>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
