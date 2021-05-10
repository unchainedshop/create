import Head from 'next/head';

import Link from 'next/link';

import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Your Webshop</title>
      </Head>
      <Header />
      <div className="color-bg-brand-lightest">
        <div className="container">
          <div className="d-flex">
            <Link href="/shop">
              <a>Shop</a>
            </Link>
          </div>
          <div className="text-center py-5">
            <div className="row d-flex align-items-center">
              <div className="col-lg-8">
                <h1 className="color-brand mt-2">Unchained Shop</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
