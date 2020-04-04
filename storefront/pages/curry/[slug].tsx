import { useRouter } from 'next/router';
import useProductDetailQuery from '../../modules/products/hooks/useProductDetailQuery';
import getProductMediaUrl from '../../modules/products/utils/getProductMediaUrl';
import useConditionalAddCartProductMutation from '../../modules/cart/hooks/useConditionalAddCartProductMutation';
import Header from '../../modules/layout/components/Header';
import CheckoutFooter from '../../modules/layout/components/CheckoutFooter';

const Detail = () => {
  const router = useRouter();

  const { product } = useProductDetailQuery({ slug: router.query.slug });
  const { conditionalAddCartProduct } = useConditionalAddCartProductMutation();

  const handleClick = () => {
    conditionalAddCartProduct({ productId: product._id });
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img src={getProductMediaUrl(product)} />
          </div>
          <div className="col-md-6">
            <h2 className="px-2 mt-md-0">{product?.texts?.title}</h2>
            <div className="p-2">
              <h3 className="my-0">
                CHF {product?.simulatedPrice?.price?.amount / 100}.-{' '}
                <small className="taxes">(inkl. MwSt.)</small>
              </h3>
              <h4 className="mb-0">{product?.texts?.subtitle}</h4>
              {product?.texts?.description.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <p>{product?.dimensions?.weight * 1000} Gramm</p>
            </div>
            <button
              type="button"
              className="button button--primary button--big mb-5 text-uppercase"
              onClick={handleClick}
            >
              In den Warenkorb
            </button>
          </div>
        </div>
      </div>
      <CheckoutFooter />
    </div>
  );
};

export default Detail;
