import useUserQuery from '../hooks/useUserQuery';
import Link from 'next/link';

const LoginCart = () => {
  const { user } = useUserQuery();

  return user ? (
    <div>
      {user?.cart?.items.length} Produkte im Warenkorb für insgesamt{' '}
      {(user?.cart?.total?.amount / 100).toFixed(2)} CHF
    </div>
  ) : (
    <Link href="/anmelden">
      <a>Anmelden</a>
    </Link>
  );
};

export default LoginCart;
