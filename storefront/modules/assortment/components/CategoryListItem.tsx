import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CategoryListItem = ({ category, className = '' }) => {
  return (
    <div className={className}>
      <Link href={`shop/${category.texts.slug}`}>
        <a>
          <div>
            <Image
              src="/static/img/sun-glass-placeholder.jpeg"
              alt={category?.texts.title}
              layout="responsive"
              objectFit="contain"
              quality={100}
              width="300px"
              height="300px"
            />
          </div>
          <div>
            <h4>{category.texts?.title}</h4>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CategoryListItem;
