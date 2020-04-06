import Head from 'next/head';

import ProductList from '../modules/products/components/ProductList';
import Header from '../modules/layout/components/Header';
import Faq from '../modules/layout/components/Faq';
import Footer from '../modules/layout/components/Footer';

const Home = () => (
  <div>
    <Head>
      <title>Currybag - Innerhalb von 5 Minuten ready!</title>
    </Head>

    <Header />
    <div className="color-bg-brand-lightest">
      <div className="container">
        <div className="text-center py-5">
          <div className="row d-flex align-items-center">
            <div className="col-lg-8">
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
            </div>
            <div className="col-lg-4">
              <img
                src="static/img/freigestellt-1494x2011.png"
                alt="karrotten curry"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <main className="container my-5">
      <ProductList />
      <div className="my-5 py-5">
        <h1>Wie bereite ich einen Currybag zu?</h1>
        <ol>
          <li>Currybag 5 Minuten in kochendem Wasser aufwärmen</li>
          <li>Aufschneiden und mit Reis servieren</li>
        </ol>
        <p>
          Alternativ kannst du Couscous servieren. Oder Weissbrot. Oder einer
          andere Beilage, die dir schmeckt.
        </p>
        <div className="row">
          <div className="col-4">
            <img src="static/img/how to video.253.Standbild1.jpg" />
          </div>
          <div className="col-4">
            <img src="static/img/how to video.264.Standbild2.jpg" />
          </div>
          <div className="col-4">
            <img src="static/img/how to video.376.Standbild3.jpg" />
          </div>
        </div>
      </div>
    </main>
    <Faq />
    <Footer />
  </div>
);

export default Home;
