import Link from 'next/link';
import Head from 'next/head';
import getConfig from 'next/config';
import { useContext, useState } from 'react';

import { useRouter } from 'next/router';
import LoginCart from '../../auth/components/LoginCart';
import SideCart from '../../cart/components/SideCart';
import { CartContext } from '../../cart/CartContext';
import DesktopNavigation from '../../assortment/components/DesktopNavigation';
import MobileNavigation from '../../assortment/components/MobileNavigation';
import RoutesContext from '../RoutesContext';
import Icon from '../../common/components/Icon';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const Header = () => {
  const context = useContext(CartContext);
  const router = useRouter();
  const [isNavOpen, setNavOpenState] = useState(false);
  const { setBodyOverflowHidden } = useContext(RoutesContext);

  const setNavOpen = (isOpen) => {
    setNavOpenState(isOpen);
    setBodyOverflowHidden(isOpen);
  };
  if (router?.events) {
    router.events.on('routeChangeStart', () => setNavOpen(false));
  }
  return (
    <>
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
        <div className="container d-flex justify-content-between align-items-center flex-wrap hide-on-mobile">
          <Link href="/">
            <a className="color-brand">
              <img
                className="my-2 mr-2"
                height="50px"
                width="100px"
                src={theme.assets.logo}
                alt="Shop Logo"
              />
            </a>
          </Link>
          <LoginCart />
        </div>
        <div className="container">
          <div className="mobile-header hide-on-not-mobile d-flex justify-content-start align-items-center">
            <button
              type="button"
              aria-label="menu"
              className="no-button mr-3 d-flex align-items-center py-1"
              onClick={() => setNavOpen(true)}
            >
              <Icon icon="navigation-menu" className="icon--medium mr-2" />
            </button>

            <MobileNavigation
              isNavOpen={isNavOpen}
              doClose={() => setNavOpen(false)}
            />

            <Link href="/">
              <a className="color-brand">
                <img
                  className="my-2 mr-2"
                  height="50px"
                  width="100px"
                  src={theme.assets.logo}
                  alt="Shop Logo"
                />
              </a>
            </Link>

            <LoginCart />
          </div>

          <DesktopNavigation />
        </div>
      </header>
    </>
  );
};

export default Header;
