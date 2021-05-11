import { useRouter } from 'next/router';
import CatagoriesList from '../../modules/assortment/components/CatagoriesList';
import useAssortmentsProducts from '../../modules/assortment/hooks/useAssortmentProducts';
import useAssortmentsLinks from '../../modules/assortment/hooks/useAssortmentsLinks';
import getAssortmentText from '../../modules/assortment/utils/getAssortmentText';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import ProductList from '../../modules/products/components/ProductList';

const CatagoryDetail = () => {
  const router = useRouter();
  const { slug: slugs } = router.query;
  const slug: string | string[] = slugs[slugs.length - 1];

  const { assortments } = useAssortmentsLinks({
    slugs: slug,
    includeLeaves: true,
  });

  const { products } = useAssortmentsProducts({
    slugs: slug,
    includeLeaves: true,
  });
  const texts = getAssortmentText(assortments);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <CatagoriesList
              assortments={assortments}
              currentPath={slugs.join('/')}
            />
          </div>
          <div className="col-6">
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
