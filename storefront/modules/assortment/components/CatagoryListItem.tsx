import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import getMediaUrl from '../../common/utils/getMediaUrl';

const CatagoryListItem = ({ catagory, className = '' }) => {
  return (
    <div className={className}>
      <Link href={`shop/${catagory.texts.slug}`}>
        <a>
          <div>
            <Image
              src={getMediaUrl(catagory)}
              alt={catagory?.texts.title}
              layout="responsive"
              objectFit="contain"
              quality={100}
              width="300px"
              height="300px"
            />
          </div>
          <div>
            <h4>{catagory.texts?.title}</h4>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CatagoryListItem;