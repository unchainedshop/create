import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useIntl } from 'react-intl';
import renderPrice from '../../common/utils/renderPrice';
import useUser from '../../auth/hooks/useUser';
import { CartContext } from '../CartContext';
import CartItem from './CartItem';

const SideCart = ({ isOpen }) => {
  const { user } = useUser();
  const intl = useIntl();
  const context = useContext(CartContext);
  const router = useRouter();

  const checkOut = () => {
    context.toggleCart(false);
    const path = user?.isGuest ?? true ? '/checkout?next=review' : '/checkout';
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
            className={`side-cart-container p-2 text-center ${
              isOpen ? 'open' : ''
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="24px"
              fill="currentColor"
              className="mt-4"
            >
              <title>{intl.formatMessage({ id: 'empty_cart' })}</title>
              <circle cx="14.531" cy="21.125" r="2.25" />
              <circle cx="4.531" cy="21.125" r="2.25" />
              <path d="M22.469.625H19.407a1.756,1.756,0,0,0-1.735,1.519L15.9,15.408a.251.251,0,0,1-.248.217H1.531a1.25,1.25,0,1,0,0,2.5h15a1.758,1.758,0,0,0,1.736-1.519L20.035,3.342a.249.249,0,0,1,.247-.217h2.187a1.25,1.25,0,0,0,0-2.5Z" />
            </svg>
            <p>
              {intl.formatMessage({ id: 'no_product_in_cart' })}{' '}
              <Link href="/shop">
                <a
                  onClick={() => context.toggleCart(false)}
                  className="link color-brand"
                >
                  {intl.formatMessage({ id: 'products' })}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="10px"
                    fill="currentColor"
                    opacity=".5"
                  >
                    <title>{intl.formatMessage({ id: 'close' })}</title>
                    <path d="M14.3,12.179a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.442L12.177,9.7a.25.25,0,0,1-.354,0L2.561.442A1.5,1.5,0,0,0,.439,2.563L9.7,11.825a.25.25,0,0,1,0,.354L.439,21.442a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,0,0,2.122-2.121Z" />
                  </svg>
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
                      className="link color-brand"
                      href="#"
                    >
                      {intl.formatMessage({ id: 'products' })}
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
                <div className="d-flex flex-wrap justify-content-between mr-3 align-items-center">
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
                {intl.formatMessage({ id: 'checkout_now' })}
              </a>
              <Link href={`${localStorage.getItem('lastVisitedCategory')}`}>
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
