import useUserQuery from '../hooks/useUserQuery';
import Link from 'next/link';

const LoginCart = () => {
  const { user } = useUserQuery();

  return user ? (
    <div className="d-flex justify-content-end align-items-center">
      <Link href="/warenkorb">
        <a>
          {user?.cart?.items.length} Produkte im Warenkorb für insgesamt{' '}
          {(user?.cart?.total?.amount / 100).toFixed(2)} CHF
        </a>
      </Link>
      <Link href="/abmelden">
        <a className="button button--ghost ml-3">Abmelden</a>
      </Link>
    </div>
  ) : (
    <div className="d-flex justify-content-end">
      <Link href="/anmelden">
        <a className="button button--ghost">Anmelden</a>
      </Link>
      <Link href="/registrieren">
        <a className="button button--ghost ml-3">Registrieren</a>
      </Link>
    </div>
  );
};

export default LoginCart;
