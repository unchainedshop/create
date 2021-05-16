import { useEffect, useState } from 'react';

import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';

const AboutUs = () => {
  const [currentUrl, setcurrentUrl] = useState('');
  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags title="About us" url={currentUrl} />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>about us</h1>
            <p>...</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
