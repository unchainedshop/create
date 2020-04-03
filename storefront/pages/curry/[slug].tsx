import { useRouter } from 'next/router';
import useProductDetailQuery from '../../modules/products/hooks/useProductDetailQuery';
import getProductMediaUrl from '../../modules/products/utils/getProductMediaUrl';

const Detail = (props) => {
  const router = useRouter();

  const { product } = useProductDetailQuery({ slug: router.query.slug });

  return (
    <div className="col-md-6 col-lg-4 product-list-item">
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
  );
};

export default Detail;
