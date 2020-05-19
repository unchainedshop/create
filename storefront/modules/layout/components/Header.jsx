import Link from 'next/link';

import LoginCart from '../../auth/components/LoginCart';
import OrderButton from '../../orders/components/UserOrderButton';

const Header = () => {
  return (
    <header className="header sticky-top">
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        <Link href="/">
          <a className="color-brand">
            <h3 className="my-2 mr-2">Currybag™</h3>
          </a>
        </Link>
        <OrderButton />
        <LoginCart />
      </div>
    </header>
  );
};

export default Header;
