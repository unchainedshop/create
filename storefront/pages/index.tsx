import { useEffect, useState } from 'react';
import getConfig from 'next/config';

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
      <div className="container mt-3">
        <img
            className="my-2 mr-2"
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
                className="mt-3 col-md-6"
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
