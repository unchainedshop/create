import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import CategoriesList from '../../modules/assortment/components/CategoriesList';
import useAssortmentProducts from '../../modules/assortment/hooks/useAssortmentProducts';
import getAssortmentPath from '../../modules/assortment/utils/getAssortmentPath';
import AssortmentBreadcrumbs from '../../modules/assortment/components/AssortmentBreadcrumbs';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import ProductList from '../../modules/products/components/ProductList';
import MetaTags from '../../modules/common/components/MetaTags';
import useCategoriesTree from '../../modules/assortment/hooks/useCategoriesTree';
import LoadingItem from '../../modules/common/components/LoadingItem';

const CategoryDetail = () => {
  const router = useRouter();
  const { slug: slugs } = router.query;
  const slug: string | string[] = slugs[slugs.length - 1];
  const [currentUrl, setcurrentUrl] = useState('');

  const { assortmentTree, loading: catagoryTreeLoading } = useCategoriesTree({
    slugs: slug,
    includeLeaves: true,
  });

  const {
    assortment: { texts } = {},
    products,
    paths,
    loading: productsLoading,
  } = useAssortmentProducts({
    slugs: slug,
    includeLeaves: true,
  });

  const assortmentPaths = getAssortmentPath(paths);

  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags
        title={texts?.title}
        description={texts?.description}
        url={currentUrl}
      />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AssortmentBreadcrumbs
              paths={assortmentPaths}
              currentAssortment={texts}
            />
          </div>
          <div className="col-md-4 col-lg-3">
            {catagoryTreeLoading ? (
              <LoadingItem />
            ) : (
              <CategoriesList
                assortment={assortmentTree.children}
                currentPath={slugs.join('/')}
              />
            )}
          </div>
          <div className="col-md-8 col-lg-9">
            <div>
              <h3 className="mt-0">{texts?.title}</h3>
              <span>{texts?.subtitle}</span>
              <p>{texts?.description}</p>
            </div>
            {productsLoading ? (
              <LoadingItem />
            ) : (
              <ProductList products={products} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryDetail;
