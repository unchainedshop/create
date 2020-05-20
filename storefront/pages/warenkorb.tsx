import Link from 'next/link';
import { useRouter } from 'next/router';
import useUserQuery from '../modules/auth/hooks/useUserQuery';
import ManageCart from '../modules/cart/components/ManageCart';
import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import WebPayment from '../modules/products/components/WebPayment';

const Cart = () => {
  const router = useRouter();
  const { user, loading } = useUserQuery();

  if (!user && !loading) router.push('/anmelden?next=warenkorb');

  return (
    <div className="container">
      <Header />
      <h1>Warenkorb 🛒</h1>
      <ManageCart />

      <div className="button-group mt-5">
        <Link
          href={
            user?.isGuest ?? true ? '/registrieren?next=bezahlen' : '/bezahlen'
          }
        >
          <a
            className="button button--primary button--big text-uppercase"
            // onClick={handleClick}
          >
            Einmalig Bestellen
          </a>
        </Link>
        <button
          disabled
          type="button"
          className="button button--primary button--big text-uppercase"
          // onClick={handleClick}
        >
          Im Abo Bestellen bald verfügbar
        </button>

        <WebPayment onClick={() => {}} />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
