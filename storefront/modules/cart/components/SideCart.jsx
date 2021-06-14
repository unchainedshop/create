import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useIntl } from 'react-intl';
import renderPrice from '../../common/utils/renderPrice';
import useUser from '../../auth/hooks/useUser';
import { CartContext } from '../CartContext';
import Icon from '../../common/components/Icon';
import CartItem from './CartItem';

const SideCart = ({ isOpen }) => {
  const { user } = useUser();
  const intl = useIntl();
  const context = useContext(CartContext);
  const router = useRouter();

  const checkOut = () => {
    context.toggleCart(false);
    const path = user?.isGuest ?? true ? '/checkout?next=review' : '/review';
    router.push(path);
  };

  const subtotal = (user?.cart?.items || []).reduce(
    (acc, item) => {
      return {
        ...acc,
        amount: acc.amount + (item?.total?.amount || 0),
      };
    },
    {
      currency: user?.cart?.itemsTotal?.currency,
      amount: 0,
    },
  );
  return (
    <>
      <div
        className={`${isOpen ? 'overlay' : ''} `}
        onClick={() => context.toggleCart()}
      />
      {!user?.cart?.items.length ? (
        <>
          <div
            className={`side-cart-container py-3 px-2 text-center ${
              isOpen ? 'open' : ''
            }`}
          >
            <Icon icon="shopping-bag-sad" />
            <p>
              {intl.formatMessage({ id: 'no_product_in_cart' })}{' '}
              <Link href="/shop">
                <a onClick={() => context.toggleCart(false)} className="link">
                  {intl.formatMessage({ id: 'shop' })}
                </a>
              </Link>
            </p>
          </div>
        </>
      ) : (
        <>
          <div
            className={`side-cart-container d-flex flex-column px-1 ${
              isOpen ? 'open' : ''
            }`}
          >
            <div>
              <div className="position-relative">
                <button
                  aria-label={intl.formatMessage({ id: 'close' })}
                  type="button"
                  className="no-button p-2 position-absolute close-cart-button"
                  onClick={() => context.toggleCart()}
                >
                  <Icon className="icon--small" icon="close" />
                </button>
              </div>
              <h3 className="p-3 m-0 h4 text-center d-block">
                {intl.formatMessage({ id: 'in_cart' })}
              </h3>
            </div>
            <div className="px-2 cart-item-container">
              {user?.cart?.items.length === 0 ? (
                <p>
                  {intl.formatMessage({ id: 'no_product_in_cart' })}{' '}
                  <Link href="/shop">
                    <a
                      onClick={() => context.toggleCart(false)}
                      className="link"
                      href="#"
                    >
                      {intl.formatMessage({ id: 'shop' })}.
                    </a>
                  </Link>
                </p>
              ) : (
                (user?.cart?.items || []).map((item) => (
                  <CartItem key={item._id} {...item} />
                ))
              )}
            </div>
            <div className="text-center p-2">
              <div className="border-top border-bottom py-3 my-0 mb-3">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="mr-2">
                    {intl.formatMessage({ id: 'subtotal' })}{' '}
                  </div>
                  <div>{renderPrice(subtotal)}</div>
                </div>
              </div>
              <a
                className="button button--primary button--big text-uppercase w-75 mb-3"
                onClick={() => checkOut()}
              >
                {intl.formatMessage({ id: 'to_checkout' })}
              </a>
              <Link
                href={`${
                  localStorage.getItem('lastVisitedCategory') || '/shop'
                }`}
              >
                <a
                  className="button button--secondary text-uppercase w-75 mb-3"
                  onClick={() => context.toggleCart(false)}
                >
                  {intl.formatMessage({ id: 'continue_shopping' })}
                </a>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SideCart;
