import Link from 'next/link';

import useUserQuery from '../hooks/useUserQuery';

const LoginCart = () => {
  const { user } = useUserQuery();

  return user ? (
    <div className="d-flex justify-content-end align-items-center flex-wrap">
      <Link href="/warenkorb">
        <a className="button button--primary my-1">
          {user?.cart?.items.length} Produkte im Warenkorb für insgesamt CHF{' '}
          {user?.cart?.total?.amount / 100}.-
        </a>
      </Link>
      {!user.isGuest ? (
        <Link href="/abmelden">
          <a className="button button--ghost ml-3 my-1">Abmelden</a>
        </Link>
      ) : (
        ''
      )}
    </div>
  ) : (
    <div className="d-flex justify-content-end flex-wrap">
      <Link href="/anmelden">
        <a className="button button--ghost my-1">Anmelden</a>
      </Link>
    </div>
  );
};

export default LoginCart;
