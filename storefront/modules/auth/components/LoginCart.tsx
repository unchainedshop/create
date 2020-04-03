import useUserQuery from '../hooks/useUserQuery';
import Link from 'next/link';

const LoginCart = () => {
  const { user } = useUserQuery();

  return user ? (
    <div className="d-flex justify-content-end">
      {user?.cart?.items.length} Produkte im Warenkorb für insgesamt{' '}
      {(user?.cart?.total?.amount / 100).toFixed(2)} CHF
      <Link href="/abmelden">
        <a>Abmelden</a>
      </Link>
    </div>
  ) : (
    <div className="d-flex justify-content-end">
      <Link href="/anmelden">
        <a className="button button--ghost">Anmelden</a>
      </Link>
    </div>
  );
};

export default LoginCart;
