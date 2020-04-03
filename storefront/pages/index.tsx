import Head from 'next/head';

import ProductList from '../modules/products/components/ProductList';
import LoginCart from '../modules/auth/components/LoginCart';

const Home = () => (
  <div>
    <Head>
      <title>Currybag - Innerhalb von 5 Minuten ready!</title>
    </Head>

    <div className="container py-2">
      <LoginCart />
    </div>
    <div className="color-bg-brand-lightest">
      <div className="container">
        <header className="header text-center pt-5">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="font-heading">LOVING LANKA®</div>
              <h1 className="title color-brand">Currybag™</h1>
              <p>
                <b>Was ist ein Currybag?</b>
              </p>
              <p>
                Ganz einfach: Das ist ein Beutel und darin befindet sich ein
                hausgemachtes Curry aus dem Hause Loving Lanka.{' '}
                <a className="link" href="https://www.lovinglanka.ch">
                  www.lovinglanka.ch
                </a>
              </p>
              <img
                src="static/img/freigestellt-1494x2011.png"
                alt="karrotten curry"
              />
            </div>
          </div>
        </header>
      </div>
    </div>
    <main className="conntainer my-5">
      <ProductList />
    </main>
    <footer className="footer"></footer>
  </div>
);

export default Home;
