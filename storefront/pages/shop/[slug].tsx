import { useRouter } from 'next/router';
import CatagoriesList from '../../modules/assortment/components/CatagoriesList';
import useAssortmentsProducts from '../../modules/assortment/hooks/useAssortmentProducts';
import useAssortmentsLinks from '../../modules/assortment/hooks/useAssortmentsLinks';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import ProductList from '../../modules/products/components/ProductList';

const CatagoryDetail = () => {
  const router = useRouter();
  const { assortments } = useAssortmentsLinks({
    slugs: [router.query.slug],
    includeLeaves: true,
  });
  const { products } = useAssortmentsProducts({
    slugs: [router.query.slug],
    includeLeaves: true,
  });
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-6">
            <CatagoriesList assortments={assortments} />
          </div>
          <div className="col-6">
            <ProductList products={products} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CatagoryDetail;
