import Image from 'next/image';
import Link from 'next/link';

import getProductMediaUrl from '../utils/getProductMediaUrl';

const ProductListItem = ({ product }) => {
  return (
    <Link href={`/product/${product?.texts?.slug}`}>
      <a>
        <div>
          <Image
            loading="lazy"
            src={`${
              getProductMediaUrl(product) ||
              '/static/img/sun-glass-placeholder.jpeg'
            }`}
            alt={product?.texts?.title}
            width="300"
            height="300"
            quality={100}
            layout="responsive"
            objectFit="contain"
          />
          <div>{product?.texts?.title}</div>
        </div>
      </a>
    </Link>
  );
};

export default ProductListItem;
