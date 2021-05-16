import Link from 'next/link';
import { useContext } from 'react';

import { CartContext } from '../../cart/CartContext';
import useUser from '../hooks/useUser';

const LoginCart = () => {
  const { user } = useUser();
  const context = useContext(CartContext);

  return user ? (
    <div className="d-flex justify-content-end align-items-center flex-wrap">
      <a
        className="button button--secondary button--small ml-md-3"
        onClick={() => context.toggleCart(!context.isCartOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="16px"
        >
          <title>shopping-cart-1</title>
          <path d="M24,2.5a1.25,1.25,0,0,0-1.25-1.25H20.441A1.753,1.753,0,0,0,18.7,2.783l-.281,2.248a.25.25,0,0,1-.248.219H2.752A2.749,2.749,0,0,0,.129,8.825L2.19,15.318A2.735,2.735,0,0,0,4.815,17.25H17.142a2.238,2.238,0,0,0,2.224-1.908l.716-4.656a1.25,1.25,0,1,0-2.471-.38l-.651,4.232a.249.249,0,0,1-.247.212H4.815a.25.25,0,0,1-.241-.181l-2.061-6.5a.25.25,0,0,1,.239-.323H18.616A2.255,2.255,0,0,0,20.85,5.778l.226-1.809a.25.25,0,0,1,.248-.219H22.75A1.25,1.25,0,0,0,24,2.5Z" />
          <circle cx="6.752" cy="20.5" r="2.25" />
          <circle cx="16.5" cy="20.5" r="2.25" />
        </svg>
        <span className="cart-counter ml-2">
          {user?.cart?.items
            ? user?.cart?.items.reduce((acc, item) => acc + item.quantity, 0)
            : 0}
        </span>
      </a>
      {!user.isGuest ? (
        <>
          <Link href="/logout">
            <a className="button button--secondary ml-3 my-1">Sign out</a>
          </Link>
          <Link href="/account">
            <a className="button button--secondary ml-3 my-1">Account</a>
          </Link>
        </>
      ) : (
        <div className="d-flex justify-content-end flex-wrap">
          <Link href="/register">
            <a className="button button--secondary my-1">register</a>
          </Link>
        </div>
      )}
    </div>
  ) : (
    <div className="d-flex justify-content-end  flex-wrap">
      <Link href="/sign-up">
        <a className="button button--secondary my-1 mr-2">Sign Up</a>
      </Link>
      <Link href="/login">
        <a className="button button--secondary my-1">Log in</a>
      </Link>
    </div>
  );
};

export default LoginCart;
