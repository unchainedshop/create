import Link from 'next/link';
import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
import useUser from '../modules/auth/hooks/useUser';
import ManageCart from '../modules/cart/components/ManageCart';
import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import LoadingItem from '../modules/common/components/LoadingItem';
import MetaTags from '../modules/common/components/MetaTags';

const Cart = () => {
  const router = useRouter();
  const intl = useIntl();
  const { user, loading } = useUser();

  if (!user && !loading) router.push('/login?next=cart');

  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'cart' })} />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-6 mx-auto">
            <h1>{intl.formatMessage({ id: 'cart' })}</h1>
            {loading ? (
              <LoadingItem />
            ) : (
              <>
                <ManageCart user={user} />
                <div className="button-group mt-5">
                  <Link
                    href={
                      user?.isGuest ?? true
                        ? '/register?next=review'
                        : '/review'
                    }
                  >
                    <a className="button button--primary button--big text-uppercase">
                      {intl.formatMessage({ id: 'to_checkout' })}
                    </a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
