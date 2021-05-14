import { useRouter } from 'next/router';

import useProductDetailQuery from '../../modules/products/hooks/useProductDetailQuery';
import getProductMediaUrl from '../../modules/products/utils/getProductMediaUrl';
import Header from '../../modules/layout/components/Header';
import Footer from '../../modules/layout/components/Footer';
import AddToCartButton from '../../modules/cart/components/AddToCartButton';
import renderPrice from '../../modules/common/utils/renderPrice';

const Detail = () => {
  const router = useRouter();
  const { product } = useProductDetailQuery({ slug: router.query.slug });
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
                {renderPrice(product?.simulatedPrice?.price)}
              </h3>
              <h4 className="mb-0">{product?.texts?.subtitle}</h4>
              {product?.texts?.description?.split('\n').map((line) => (
                <p key={line?.substring(0, 10)}>{line}</p>
              ))}
            </div>
            <AddToCartButton productId={product?._id} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
