import Head from 'next/head';

import ProductList from '../modules/products/components/ProductList';
import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import useAssortmentsLinks from '../modules/assortment/hooks/useAssortmentsLinks';
import CatagoriesList from '../modules/assortment/components/CatagoriesList';

const Home = () => {
  const { assortments } = useAssortmentsLinks({ includeLeaves: false });

  return (
    <div>
      <Head>
        <title>Your Webshop</title>
      </Head>

      <Header />
      <div className="color-bg-brand-lightest">
        <div className="container">
          <div className="text-center py-5">
            <div className="row d-flex align-items-center">
              <div className="col-lg-8">
                <h1 className="color-brand mt-2">Unchained Shop</h1>
                <CatagoriesList assortments={assortments} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="container my-5">
        <ProductList />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
