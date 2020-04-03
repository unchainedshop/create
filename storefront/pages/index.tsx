import Head from 'next/head';

import ProductList from '../modules/products/components/ProductList';

const Home = () => (
  <div className="container">
    <Head>
      <title>Currybag - Innerhalb von 5 Minuten ready!</title>
    </Head>

    <header className="header text-center pt-3">
      <div className="font-heading">LOVING LANKA®</div>
      <h1 className="title color-brand">Currybag™</h1>
      <button role="button" className="button button--primary">
        primary button
      </button>
    </header>
    <main className="my-5">
      <ProductList />
    </main>
    <footer className="footer"></footer>
  </div>
);

export default Home;
