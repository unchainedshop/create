import React, { useState } from 'react';
import App from 'next/app';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '../public/static/css/all.css';

import { CartContext } from '../modules/cart/CartContext';
import withApollo from '../modules/apollo/utils/withApollo';

const UnchainedApp = ({ Component, pageProps }) => {
  const toggleCart = (val) => {
    // eslint-disable-next-line no-use-before-define
    setCartContext({
      isCartOpen: val,
      toggleCart,
    });
  };

  const [cartContext, setCartContext] = useState({
    isCartOpen: false,
    toggleCart,
  });

  return (
    <CartContext.Provider value={cartContext}>
      <ToastContainer position="top-center" autoClose={3000} newestOnTop />
      <Component {...pageProps} />
    </CartContext.Provider>
  );
};

UnchainedApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withApollo(UnchainedApp);
