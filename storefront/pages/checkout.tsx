import Link from 'next/link';
import { useRouter } from 'next/router';

import useUser from '../modules/auth/hooks/useUser';
import ManageCart from '../modules/cart/components/ManageCart';
import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import LoadingItem from '../modules/common/components/LoadingItem';
import MetaTags from '../modules/common/components/MetaTags';

const Cart = () => {
  const router = useRouter();

  const { user, loading } = useUser();

  if (!user && !loading) router.push('/login?next=cart');

  return (
    <>
      <MetaTags title="Checkout order" />
      <Header />
      <div className="container">
        <h1>Shopping cart</h1>
        {loading ? (
          <LoadingItem />
        ) : (
          <>
            <ManageCart user={user} />
            <div className="button-group mt-5">
              <Link
                href={
                  user?.isGuest ?? true ? '/register?next=review' : '/review'
                }
              >
                <a className="button button--primary button--big text-uppercase">
                  Complete Order
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
