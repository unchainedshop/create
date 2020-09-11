import Link from 'next/link';

import useUserQuery from '../hooks/useUserQuery';

const LoginCart = () => {
  const { user } = useUserQuery();

  return user ? (
    <div className="d-flex justify-content-end align-items-center flex-wrap">
      <Link href="/warenkorb">
        <a className="button button--tertiary my-1">
          <span className="cart-counter">
            {user?.cart?.items.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
          Produkte im 🛒 für insgesamt
          <b className="ml-1">
            CHF
            {user?.cart?.total?.amount / 100}
            .-
          </b>
        </a>
      </Link>
      {!user.isGuest ? (
        <Link href="/abmelden">
          <a className="button button--secondary ml-3 my-1">Abmelden</a>
        </Link>
      ) : (
        ''
      )}
    </div>
  ) : (
    <div className="d-flex justify-content-end flex-wrap">
      <Link href="/anmelden">
        <a className="button button--secondary my-1">Anmelden</a>
      </Link>
    </div>
  );
};

export default LoginCart;
