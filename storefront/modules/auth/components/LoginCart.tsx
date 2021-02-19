import Link from 'next/link';

import useUserQuery from '../hooks/useUserQuery';

const LoginCart = () => {
  const { user } = useUserQuery();

  return user ? (
    <div className="d-flex justify-content-end align-items-center flex-wrap">
      <Link href="/cart">
        <a className="button button--tertiary my-1">
          <span className="cart-counter">
            {user?.cart?.items.reduce((acc, item) => acc + item.quantity, 0) ||
              0}
          </span>
          🛒
          {user?.cart && (
            <b className="ml-1">
              {user?.cart?.total?.currency}
              {user?.cart?.total?.amount / 100}
              .-
            </b>
          )}
        </a>
      </Link>
      {!user.isGuest ? (
        <>
          <Link href="/logout">
            <a className="button button--secondary ml-3 my-1">Sign out</a>
          </Link>
          <Link href="/customer-account">
            <a className="button button--secondary ml-3 my-1">Account</a>
          </Link>
        </>
      ) : (
        <div className="d-flex justify-content-end flex-wrap">
          <Link href="/login">
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
