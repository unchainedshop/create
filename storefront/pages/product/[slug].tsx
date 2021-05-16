/* eslint-disable react/no-danger */
import { useRouter } from 'next/router';
import Image from 'next/image';

import useProductDetail from '../../modules/products/hooks/useProductDetail';
import getProductMediaUrl from '../../modules/products/utils/getProductMediaUrl';
import Header from '../../modules/layout/components/Header';
import Footer from '../../modules/layout/components/Footer';
import AddToCartButton from '../../modules/cart/components/AddToCartButton';
import renderPrice from '../../modules/common/utils/renderPrice';
import LoadingItem from '../../modules/common/components/LoadingItem';

const Detail = () => {
  const router = useRouter();
  const { product, loading } = useProductDetail({ slug: router.query.slug });
  return (
    <>
      <Header />
      {loading ? (
        <LoadingItem />
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <Image
                src={`${
                  getProductMediaUrl(product) ||
                  '/static/img/sun-glass-placeholder.jpeg'
                }`}
                alt={product?.texts?.title}
                layout="responsive"
                objectFit="contain"
                quality={100}
                width="700px"
                height="700px"
              />
            </div>
            <div className="col-md-6">
              <h2 className="px-2 mt-md-0">{product?.texts?.title}</h2>
              <div className="p-2">
                <h3 className="my-0">
                  {renderPrice(product?.simulatedPrice?.price)}
                </h3>
                <h4 className="mb-0">{product?.texts?.subtitle}</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product?.texts?.description,
                  }}
                />
              </div>
              <AddToCartButton productId={product?._id} />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Detail;
