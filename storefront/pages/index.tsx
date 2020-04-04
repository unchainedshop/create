import Head from 'next/head';

import ProductList from '../modules/products/components/ProductList';
import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';

const Home = () => (
  <div>
    <Head>
      <title>Currybag - Innerhalb von 5 Minuten ready!</title>
    </Head>

    <Header />
    <div className="color-bg-brand-lightest">
      <div className="container">
        <div className="text-center pt-5">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h3 className="font-heading my-0">LOVING LANKA®</h3>
              <h1 className="color-brand mt-2">Currybag™</h1>
              <p>
                Wir sind zu Hause im Homeoffice oder betreuen unsere Kinder. Der
                ganze Alltag steht Kopf. Die Zeiten sind schon hektisch genug.
              </p>
              <p>
                <b>
                  Wie soll man sich in einer wirtschaftlich schweren Zeit
                  genussvoll ernähren?
                </b>{' '}
                Teuere Lieferdienste mit langen Wartezeiten sind längerfristig
                nicht die Lösung.
              </p>
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
        </div>
      </div>
    </div>
    <main className="conntainer my-5">
      <ProductList />
    </main>
    <Footer />
  </div>
);

export default Home;
