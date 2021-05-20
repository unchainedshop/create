/* eslint-disable react/no-danger */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';

import useProductDetail from '../../modules/products/hooks/useProductDetail';
import Header from '../../modules/layout/components/Header';
import Footer from '../../modules/layout/components/Footer';
import AddToCartButton from '../../modules/cart/components/AddToCartButton';
import renderPrice from '../../modules/common/utils/renderPrice';
import LoadingItem from '../../modules/common/components/LoadingItem';
import MetaTags from '../../modules/common/components/MetaTags';
import getProductMediaUrls from '../../modules/products/utils/getProductMediaUrls';

const Detail = () => {
  const router = useRouter();
  const [currentUrl, setcurrentUrl] = useState('');
  const { product, loading } = useProductDetail({ slug: router.query.slug });

  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags
        title={product?.texts?.title}
        imageUrl={getProductMediaUrls(product)[0] || ''}
        url={currentUrl}
        description={product?.texts?.description}
      />
      <Header />
      {loading ? (
        <LoadingItem />
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="slide-container">
                <Slide>
                  {getProductMediaUrls(product).map((image) => (
                    <div className="each-slide">
                      <div
                        style={{
                          backgroundImage: `url(${image})`,
                          width: '500px',
                          height: '300px',
                        }}
                      >
                        <span>Slide 1</span>
                      </div>
                    </div>
                  ))}
                </Slide>
              </div>
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
