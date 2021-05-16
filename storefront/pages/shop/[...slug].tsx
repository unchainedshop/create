import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import CatagoriesList from '../../modules/assortment/components/CatagoriesList';
import useAssortmentProducts from '../../modules/assortment/hooks/useAssortmentProducts';
import useAssortmentLinks from '../../modules/assortment/hooks/useAssortmentLinks';
import getAssortmentPath from '../../modules/assortment/utils/getAssortmentPath';
import AssortmetBreadcrumbs from '../../modules/assortment/components/AssortmetBreadcrumbs';
import getAssortmentText from '../../modules/assortment/utils/getAssortmentText';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import ProductList from '../../modules/products/components/ProductList';
import MetaTags from '../../modules/common/components/MetaTags';

const CatagoryDetail = () => {
  const router = useRouter();
  const { slug: slugs } = router.query;
  const slug: string | string[] = slugs[slugs.length - 1];
  const [currentUrl, setcurrentUrl] = useState('');

  const { assortment } = useAssortmentLinks({
    slug,
  });

  const { products, paths } = useAssortmentProducts({
    slugs: slug,
    includeLeaves: true,
  });
  const texts = getAssortmentText(assortment);
  const assortmentPaths = getAssortmentPath(paths);

  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags
        title={texts.title}
        description={texts.description}
        url={currentUrl}
      />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <CatagoriesList
              assortment={assortment}
              currentPath={slugs.join('/')}
            />
          </div>
          <div className="col-6">
            <div>
              <AssortmetBreadcrumbs
                paths={assortmentPaths}
                currentAssortment={texts}
              />
            </div>
            <div>
              <h2>{texts.title}</h2>
              <span>{texts.subtitle}</span>
              <p>{texts.description}</p>
            </div>
            <ProductList products={products} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CatagoryDetail;
