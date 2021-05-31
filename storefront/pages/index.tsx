import { useEffect, useState } from 'react';
import getConfig from 'next/config';
import Link from 'next/link';

import CatagoryListItem from '../modules/assortment/components/CatagoryListItem';
import useAssortments from '../modules/assortment/hooks/useAssortments';
import LoadingItem from '../modules/common/components/LoadingItem';
import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';


const Home = () => {
  const { assortments, loading } = useAssortments();
  const [currentUrl, setcurrentUrl] = useState('');
  const {
    publicRuntimeConfig: { theme },
  } = getConfig();

  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags title="Product Catagories" url={currentUrl} />
      <Header />
      <div className="container">
        <img
            className="mb-2"
            src={theme.assets.hero}
            alt="Hero image"
          />

        {loading ? (
          <LoadingItem />
        ) : (
          <div className="row">
            {assortments.map((catagory) => (
              <CatagoryListItem
                key={catagory._id}
                catagory={catagory}
                className="mt-3 col-md-6 mx-auto"
              />
            ))}
          </div>
        )}

        <div className="row text-center border-top mt-5">
          <div className="col-md-6">
            <img
              className="my-2 mr-2"
              src={theme.assets.glassesAnimation}
              alt=""
            />
            <Link href="/shop">
              <a>
                <button className="button button--secondary button--big mr-3">Damen</button>
              </a>
            </Link>
            <Link href="/shop">
              <a>
                <button className="button button--secondary button--big">Herren</button>
              </a>
            </Link>
          </div>
          <div className="col-md-6">
            <img
              className="my-2 mr-2"
              src={theme.assets.sunglassesAnimation}
              alt=""
            />
            <Link href="/shop">
              <a>
                <button className="button button--secondary button--big mr-3">Damen</button>
              </a>
            </Link>
            <Link href="/shop">
              <a>
                <button className="button button--secondary button--big">Herren</button>
              </a>
            </Link>
          </div>
          <div className="col-12 mt-5 border-top pt-5">
            <div className="text-center">
              <h2 className="mt-0">Neue Modelle</h2>
            </div>
            <div className="row text-center">
              <div className="col-md-4">
                <img src="/static/img/category-image.jpg" />
                <h3 className="mb-1">newest Product</h3>
                <p className="mt-0">havanna shiny</p>
              </div>
              <div className="col-md-4">
                <img src="/static/img/category-image.jpg" />
                <h3 className="mb-1">newest Product</h3>
                <p className="mt-0">grey matt</p>
              </div>
              <div className="col-md-4">
                <img src="/static/img/category-image.jpg" />
                <h3 className="mb-1">newest Product</h3>
                <p className="mt-0">black matt</p>
              </div>
            </div>
          </div>
          <div className="col-12 mt-5 border-top pt-5">
            <div className="text-center">
              <h2 className="mt-0">Bestseller</h2>
            </div>
            <div className="row text-center">
              <div className="col-md-4">
                <img src="/static/img/category-image.jpg" />
                <h3 className="mb-1">Bestseller Product</h3>
                <p className="mt-0">havanna shiny</p>
              </div>
              <div className="col-md-4">
                <img src="/static/img/category-image.jpg" />
                <h3 className="mb-1">Bestseller Product</h3>
                <p className="mt-0">grey matt</p>
              </div>
              <div className="col-md-4">
                <img src="/static/img/category-image.jpg" />
                <h3 className="mb-1">Bestseller Product</h3>
                <p className="mt-0">black matt</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Home;
