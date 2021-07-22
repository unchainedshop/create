import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';

const AboutUs = () => {
  const [currentUrl, setcurrentUrl] = useState('');
  const intl = useIntl();
  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'about' })} url={currentUrl} />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>{intl.formatMessage({ id: 'about' })}</h1>
            <p>{intl.formatMessage({ id: 'about_detail' })}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
