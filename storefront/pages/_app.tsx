import React, { useEffect, useState } from 'react';
import App from 'next/app';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '../public/static/css/all.css';

import IntlWrapper from '../modules/i18n/components/IntlWrapper';
import { CartContext } from '../modules/cart/CartContext';
import withApollo from '../modules/apollo/utils/withApollo';
import getMessages from '../modules/i18n/utils/getMessages';
import ROUTES_CONFIG from '../modules/common/utils/getRouteConfig';

const UnchainedApp = ({ Component, pageProps, router }) => {
  const messages = getMessages(router.locale);

  const toggleCart = (val) => {
    // eslint-disable-next-line no-use-before-define
    setCartContext({
      isCartOpen: val,
      toggleCart,
    });
  };
  /* change root pages slug for there localy 
  handles localization for routes /page | /page/1234
  where 1234 is either id or slug */
  useEffect(() => {
    const idOrSlug = router?.query?.id || router?.query?.slug || '';
    if (!Object.keys(router.query).length || idOrSlug) {
      const currentPage = router.route.split('/')[1];

      if (
        router.route !== '/' &&
        `${router.asPath}/` !==
          `/${messages[ROUTES_CONFIG[currentPage].slug]}/${idOrSlug}`
      ) {
        router.push(
          `/${messages[ROUTES_CONFIG[currentPage].slug]}/${idOrSlug}`,
        );
      }
    }
  }, [router]);

  const [cartContext, setCartContext] = useState({
    isCartOpen: false,
    toggleCart,
  });

  return (
    <IntlWrapper locale={router.locale} messages={messages} key="intl-provider">
      <CartContext.Provider value={cartContext}>
        <ToastContainer position="top-center" autoClose={3000} newestOnTop />
        <Component {...pageProps} />
      </CartContext.Provider>
    </IntlWrapper>
  );
};

UnchainedApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
  };
};

export default withApollo(UnchainedApp);
