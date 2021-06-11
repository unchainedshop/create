import React, { useEffect, useState } from 'react';
import App from 'next/app';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '../public/static/css/all.css';

import IntlWrapper from '../modules/i18n/components/IntlWrapper';
import { CartContext } from '../modules/cart/CartContext';
import withApollo from '../modules/apollo/utils/withApollo';
import getMessages from '../modules/i18n/utils/getMessages';
import { ThemeContext, themes } from '../modules/layout/ThemeContext';
import ThemeBar from '../modules/layout/components/ThemeBar';

const UnchainedApp = ({ Component, pageProps, router }) => {
  const messages = getMessages(router.locale);
  const toggleCart = (val) => {
    // eslint-disable-next-line no-use-before-define
    setCartContext({
      isCartOpen: val,
      toggleCart,
    });
  };

  const [theme, setTheme] = useState(themes.light);
  const toggleTheme = () => {
    setTheme(theme === themes.dark ? themes.light : themes.dark);
  };

  const [cartContext, setCartContext] = useState({
    isCartOpen: false,
    toggleCart,
  });

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    body.style.background = theme.background;
    body.style.color = theme.color;
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
    <IntlWrapper locale={router.locale} messages={messages} key="intl-provider">
      <CartContext.Provider value={cartContext}>
        <ToastContainer position="top-center" autoClose={3000} newestOnTop />
        <ThemeBar changeTheme={toggleTheme} theme={theme} />
        <Component theme={theme} {...pageProps} />
      </CartContext.Provider>
    </IntlWrapper>
    </ThemeContext.Provider>
  );
};

UnchainedApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
  };
};

export default withApollo(UnchainedApp);
