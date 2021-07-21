import Link from 'next/link';
import Head from 'next/head';
import getConfig from 'next/config';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import LoginCart from '../../auth/components/LoginCart';
import SideCart from '../../cart/components/SideCart';
import { CartContext } from '../../cart/CartContext';
import DesktopNavigation from '../../assortment/components/DesktopNavigation';
import MobileNavigation from '../../assortment/components/MobileNavigation';
import Icon from '../../common/components/Icon';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const Header = () => {
  const context = useContext(CartContext);
  const router = useRouter();
  const [isNavOpen, setNavOpenState] = useState(false);
  const intl = useIntl();

  const setNavOpen = (isOpen) => {
    setNavOpenState(isOpen);
  };
  if (router?.events) {
    router.events.on('routeChangeStart', () => setNavOpen(false));
  }

  const topNavigationText = intl.formatMessage({ id: 'top_notification' });
  const showTopNav =
    !topNavigationText || topNavigationText !== 'top_notification';

  return (
    <>
      {showTopNav && (
        <div className="color-bg-dark">
          <div className="container color-white py-2 text-center font-weight-bold">
            <p className="my-0">{topNavigationText}</p>
          </div>
        </div>
      )}

      <header className="header sticky-top">
        <SideCart isOpen={context.isCartOpen} />
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={theme.assets['icon-180x180']}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={theme.assets['icon-32x32']}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={theme.assets['icon-16x16']}
          />
        </Head>
        <div className="container d-flex align-items-center justify-content-between flex-wrap hide-on-mobile py-2">
          <div className="d-flex justify-content-start align-items-center">
            <DesktopNavigation />
            <Link href="/">
              <a>
                <img
                  className="align-self-center ml-3"
                  width="140px"
                  src={theme.assets.logo}
                  alt="Shop logo"
                />
              </a>
            </Link>
          </div>
          <div className="d-flex justify-content-end">
            <LoginCart />
          </div>
        </div>
        <div className="container">
          <div className="mobile-header hide-on-not-mobile d-flex justify-content-between align-items-center py-2">
            <div className="d-flex align-items-center">
              <button
                type="button"
                aria-label="menu"
                className="no-button d-flex align-items-center py-1 mr-3"
                onClick={() => setNavOpen(true)}
              >
                <Icon icon="navigation-menu" className="icon--medium" />
              </button>

              <MobileNavigation
                isNavOpen={isNavOpen}
                doClose={() => setNavOpen(false)}
              />

              <Link href="/">
                <a>
                  <img width="100px" src={theme.assets.logo} alt="Shop logo" />
                </a>
              </Link>
            </div>
            <LoginCart />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
