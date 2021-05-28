import React from 'react';
import Link from 'next/link';

import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import MetaTags from '../modules/common/components/MetaTags';

const NotFound = ({ page = '' }) => {
  return (
    <>
      <MetaTags title="404: Not Found" />
      <Header />
      <div className="container text-center text-danger p-3 p-md-5">
        <div className="p-lg-5 mb-4">
          <h1 className="font-weight-bolder font-dax-ot-regular">
            404: Requested {page || 'Page'} not found
          </h1>
          <div className="mb-5">
            <div className="text-center">
              <p>Sorry, the page you were looking for was not found! </p>
              <Link href="/">
                <a className="button button--primary">Back to home</a>
              </Link>
            </div>
          </div>
        </div>
        <div />
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
