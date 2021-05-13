import React, { useState } from 'react';
import App from 'next/app';

import { CartContext } from '../modules/cart/CartContext';
import '../public/static/css/all.css';
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
