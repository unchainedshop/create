/* eslint-disable react/no-danger */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { useIntl } from 'react-intl';

import useProductDetail from '../../modules/products/hooks/useProductDetail';
import Header from '../../modules/layout/components/Header';
import Footer from '../../modules/layout/components/Footer';
import AddToCartButton from '../../modules/cart/components/AddToCartButton';
import renderPrice from '../../modules/common/utils/renderPrice';
import LoadingItem from '../../modules/common/components/LoadingItem';
import MetaTags from '../../modules/common/components/MetaTags';
import getAssortmentPath from '../../modules/assortment/utils/getAssortmentPath';
import AssortmentBreadcrumbs from '../../modules/assortment/components/AssortmentBreadcrumbs';
import getMediaUrl from '../../modules/common/utils/getMediaUrl';
import getMediaUrls from '../../modules/common/utils/getMediaUrls';
import NotFound from '../404';

const Detail = () => {
  const router = useRouter();
  const intl = useIntl();
  const [currentUrl, setcurrentUrl] = useState('');
  const { product, paths, loading } = useProductDetail({
    slug: router.query.slug,
  });
  const productPath = getAssortmentPath(paths);
  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  if (!product && !loading)
    return <NotFound page={intl.formatMessage({ id: 'products' })} />;
  return (
    <>
      <MetaTags
        title={product?.texts?.title}
        imageUrl={getMediaUrl(product)}
        url={currentUrl}
        description={product?.texts?.description}
      />
      <Header />
      {loading ? (
        <LoadingItem />
      ) : (
        <div className="container mt-1">
          <div className="row">
            <div className="col-12">
              <AssortmentBreadcrumbs
                paths={productPath}
                currentAssortment={product?.texts}
              />
            </div>
            <div className="col-md-8">
              <ImageGallery
                lazyLoad
                onErrorImageURL="/static/img/sun-glass-placeholder.jpeg"
                useBrowserFullscreen
                items={getMediaUrls(product).map((image) => ({
                  original: image,
                  thumbnail: image,
                }))}
              />
            </div>
            <div className="col-md-4">
              <h2 className="px-2 mt-md-0">{product?.texts?.title}</h2>
              <div className="p-2">
                <h3 className="my-0">{renderPrice(product?.simulatedPrice)}</h3>
                <h4 className="mb-3">{product?.texts?.subtitle}</h4>
                <div
                  className="mb-3"
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
