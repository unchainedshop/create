import React from 'react';
import Image from 'next/image';

import getMediaUrl from '../../common/utils/getMediaUrl';
import LocalizedLink from '../../common/components/LocalizedLink';

const CategoryListItem = ({ category, className = '' }) => {
  return (
    <div className={className}>
      <LocalizedLink href={`/shop/${category.texts.slug}`}>
        <a>
          <div>
            <Image
              src={
                getMediaUrl(category) ||
                '/static/img/sun-glass-placeholder.jpeg'
              }
              alt={category?.texts.title}
              layout="responsive"
              objectFit="contain"
              quality={100}
              width="706px"
              height="235px"
            />
          </div>
          <div className="text-center">
            <h2 className="mt-2 mb-3">{category.texts?.title}</h2>
          </div>
        </a>
      </LocalizedLink>
    </div>
  );
};

export default CategoryListItem;
