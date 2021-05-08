import Head from 'next/head';

import ProductList from '../modules/products/components/ProductList';
import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import useAssortmentsLinks from '../modules/assortment/hooks/useAssortmentsLinks';

const getRoute = (rootAssortments) => {
  const routes = [];
  let firstLevelIndex = 0;
  let secondLevelIndex = 0;
  let thridLevelIndex = 0;
  rootAssortments.forEach(({ texts, _id, linkedAssortments = [] }, index) => {
    firstLevelIndex = index;
    routes.push({
      texts,
      children: [],
    });
    linkedAssortments.forEach(({ child }, index) => {
      secondLevelIndex = index;

      routes[firstLevelIndex].children.push({
        texts: child.texts,
        children: [],
      });
      child.linkedAssortments.forEach(({ child }, index) => {
        thridLevelIndex = index;

        routes[firstLevelIndex].children[secondLevelIndex].children.push({
          texts: child.texts,
          children: [],
        });
      });
    });
  });

  return routes;
};

const Home = () => {
  const { assortments } = useAssortmentsLinks({ includeLeaves: false });
  const routes = getRoute(assortments);
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
                <ul>
                  {routes.map((r) => {
                    return (
                      <>
                        <li> {r.texts.title} </li>
                        <li>
                          <ul>
                            {r.children.map((c) => (
                              <>
                                <li> {c.texts.title}</li>
                                <li>
                                  <ul>
                                    {c.children.map((a) => (
                                      <li> {a.texts.title}</li>
                                    ))}
                                  </ul>
                                </li>
                              </>
                            ))}
                          </ul>
                        </li>
                      </>
                    );
                  })}
                </ul>
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
