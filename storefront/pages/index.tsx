import Head from 'next/head';

import ProductList from '../modules/products/components/ProductList';
import Header from '../modules/layout/components/Header';
import Faq from '../modules/layout/components/Faq';
import Footer from '../modules/layout/components/Footer';

const Home = () => (
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
              <h1 className="color-brand mt-2">Hello</h1>
              <p>
                Have a look
              </p>
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

export default Home;
