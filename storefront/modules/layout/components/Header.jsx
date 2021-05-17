import Link from 'next/link';
import Head from 'next/head';
import getConfig from 'next/config';
import { useContext } from 'react';

import LoginCart from '../../auth/components/LoginCart';
import OrderButton from '../../orders/components/UserOrderButton';
import SideCart from '../../cart/components/SideCart';
import { CartContext } from '../../cart/CartContext';
import DesktopNavigation from '../../assortment/components/DesktopNavigation';

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const Header = () => {
  const context = useContext(CartContext);
  return (
    <>
      <header className="header sticky-top">
        <SideCart isOpen={context.isCartOpen} />
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={theme.icons['180x180']}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={theme.icons['32x32']}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={theme.icons['16x16']}
          />
        </Head>
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          <Link href="/">
            <a className="color-brand">
              <h3 className="my-2 mr-2">Unchained</h3>
            </a>
          </Link>
          <OrderButton />
          <LoginCart />
        </div>
        <DesktopNavigation />
      </header>
    </>
  );
};

export default Header;
