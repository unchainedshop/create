import Link from 'next/link';

import LoginCart from '../../auth/components/LoginCart';

const Header = () => {
  return (
    <header className="header sticky-top">
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        <Link href="/">
          <a className="color-brand">
            <h3 className="my-2 mr-2">Currybag™</h3>
          </a>
        </Link>
        <Link href="/order">
          <a className="color-brand">
            <h3 className="my-2 mr-2">My orders</h3>
          </a>
        </Link>
        <LoginCart />
      </div>
    </header>
  );
};

export default Header;
