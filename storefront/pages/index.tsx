import { useEffect, useState } from 'react';
import getConfig from 'next/config';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import CatagoryListItem from '../modules/assortment/components/CatagoryListItem';
import useAssortments from '../modules/assortment/hooks/useAssortments';
import LoadingItem from '../modules/common/components/LoadingItem';
import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const Home = () => {
  const { assortments, loading } = useAssortments();
  const [currentUrl, setcurrentUrl] = useState('');
  const intl = useIntl();

  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'home' })} url={currentUrl} />
      <Header />
      <div className="container">
        <img className="mb-2" src={theme.assets.hero} alt="Hero" />

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
      </div>
      <Footer />
    </>
  );
};

export default Home;
