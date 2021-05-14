import Link from 'next/link';
import { useRouter } from 'next/router';

import useUser from '../modules/auth/hooks/useUser';
import ManageCart from '../modules/cart/components/ManageCart';
import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';

const Cart = () => {
  const router = useRouter();
  const { user, loading } = useUser();

  if (!user && !loading) router.push('/login?next=cart');

  return (
    <div className="container">
      <Header />
      <h1>
        shopping cart{' '}
        <span role="img" aria-label="Cart Icon">
          🛒
        </span>
      </h1>
      <ManageCart />

      <div className="button-group mt-5">
        <Link
          href={user?.isGuest ?? true ? '/register?next=review' : '/review'}
        >
          <a className="button button--primary button--big text-uppercase">
            Complete Order
          </a>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
