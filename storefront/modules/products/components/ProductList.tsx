import Link from 'next/link';

import useConditionalAddCartProductMutation from '../../cart/hooks/useConditionalAddCartProductMutation';

import useProductListQuery from '../hooks/useProductListQuery';
import getProductMediaUrl from '../utils/getProductMediaUrl';

const ProductList = () => {
  const { products } = useProductListQuery();
  const { conditionalAddCartProduct } = useConditionalAddCartProductMutation();

  const handleClick = (productId) => {
    conditionalAddCartProduct({ productId });
  };

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div
            key={product._id}
            className="col-sm-6 col-lg-4 product-list-item"
          >
            <Link href="/curry/[slug]" as={`/curry/${product.texts.slug}`}>
              <a className="product-list-item-overlay" />
            </Link>
            <div className="product-list-item-inner">
              <div className="product-list-header">
                <h3 className="px-2 my-3">{product?.texts?.title}</h3>
                <a
                  className="product-list-add-to-cart"
                  aria-label="In den Warenkorb"
                  onClick={() => handleClick(product._id)}
                >
                  🛒
                </a>
              </div>
              <img src={getProductMediaUrl(product)} />
              <div className="p-2">
                <h4 className="my-0">
                  CHF {product?.simulatedPrice?.price?.amount / 100}.-
                </h4>
                <h4 className="mb-0">{product?.texts?.subtitle}</h4>
                <p>{product?.texts?.description?.split('\n')[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
