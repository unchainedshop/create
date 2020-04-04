import Link from 'next/link';
import { useRouter } from 'next/router';

import useUserQuery from '../modules/auth/hooks/useUserQuery';
import LoginCart from '../modules/auth/components/LoginCart';
import ManageCart from '../modules/cart/components/ManageCart';
import Header from '../modules/layout/components/Header';

const Cart = () => {
  const router = useRouter();
  const { user, loading } = useUserQuery();

  if (!user && !loading) router.push('/anmelden?next=warenkorb');

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Warenkorb</h1>
          <ManageCart />

          <div className="mb-1">
            <Link
              href={
                user?.isGuest ?? true
                  ? '/registrieren?next=bezahlen'
                  : '/bezahlen'
              }
            >
              <a
                className="button button--primary button--big  text-uppercase"
                // onClick={handleClick}
              >
                Einmalig Bestellen
              </a>
            </Link>
          </div>

          <div>
            <button
              disabled
              type="button"
              className="button button--primary button--big  text-uppercase"
              // onClick={handleClick}
            >
              Im Abo Bestellen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
