import Head from "next/head";

import ProductList from "../modules/products/components/ProductList";

const Home = () => (
  <div className="container">
    <Head>
      <title>Currybag</title>
    </Head>

    <main>
      <h1 className="title">Currybag!</h1>
      <button role="button" className="button button--primary">
        primary button
      </button>
      <ProductList />
    </main>
  </div>
);

export default Home;
