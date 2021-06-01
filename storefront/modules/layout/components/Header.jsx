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
  return (
    <>
      <div className="color-bg-dark">
        <div className="container color-white py-1 text-center font-weight-bold">
          <p>{intl.formatMessage({ id: 'top_notification' })}</p>
        </div>
      </div>
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
          <div className="d-flex justify-content-start flex-grow-1 width-0">
            <DesktopNavigation />
          </div>
          <Link href="/">
            <a className="d-flex justify-content-center flex-grow-1 width-0">
              <img
                width="140px"
                src={theme.assets.logo}
                alt="Shop logo"
              />
            </a>
          </Link>
          <div className="d-flex justify-content-end flex-grow-1 width-0">
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
                  <img
                    width="100px"
                    src={theme.assets.logo}
                    alt="Shop logo"
                  />
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
