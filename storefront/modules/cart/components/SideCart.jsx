import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import renderPrice from '../../common/utils/renderPrice';
import useUserQuery from '../../auth/hooks/useUser';
import { CartContext } from '../CartContext';
import CartItem from './CartItem';

const SideCart = ({ isOpen }) => {
  const { user } = useUserQuery();
  const context = useContext(CartContext);
  const router = useRouter();

  const checkOut = () => {
    context.toggleCart(false);
    const path = user?.isGuest ?? true ? '/checkout?next=review' : '/review';
    router.push(path);
  };
  const liveAssistance = () => {
    window.fcWidget.open();
    window.fcWidget.show();
    context.toggleCart();
  };

  const subtotal = (user?.cart?.items || []).reduce(
    (acc, item) => {
      return {
        ...acc,
        amount: acc.amount + item?.total?.amount,
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
              <title>empty shopping cart</title>
              <circle cx="14.531" cy="21.125" r="2.25" />
              <circle cx="4.531" cy="21.125" r="2.25" />
              <path d="M22.469.625H19.407a1.756,1.756,0,0,0-1.735,1.519L15.9,15.408a.251.251,0,0,1-.248.217H1.531a1.25,1.25,0,1,0,0,2.5h15a1.758,1.758,0,0,0,1.736-1.519L20.035,3.342a.249.249,0,0,1,.247-.217h2.187a1.25,1.25,0,0,0,0-2.5Z" />
            </svg>
            <p>
              There are no products in your Cart. Browse our{' '}
              <Link href="/shop">
                <a
                  onClick={() => context.toggleCart(false)}
                  className="link color-brand"
                >
                  Products
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
                    <title>close</title>
                    <path d="M14.3,12.179a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.442L12.177,9.7a.25.25,0,0,1-.354,0L2.561.442A1.5,1.5,0,0,0,.439,2.563L9.7,11.825a.25.25,0,0,1,0,.354L.439,21.442a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,0,0,2.122-2.121Z" />
                  </svg>
                </button>
              </div>
              <h1 className="p-3 m-0 h4 text-center d-block">In Your Cart</h1>
            </div>
            <div className="px-2 cart-item-container">
              {user?.cart?.items.length === 0 ? (
                <p>
                  There are no products in your Cart. browse our{' '}
                  <Link href="/artworks">
                    <a
                      onClick={() => context.toggleCart(false)}
                      className="link color-brand"
                      href="#"
                    >
                      Artworks
                    </a>
                  </Link>
                </p>
              ) : (
                (user?.cart?.items || []).map((item) => (
                  <CartItem key={item._id} item={item} />
                ))
              )}
            </div>
            <div className="text-center p-2">
              <div className="border-top border-bottom py-3 my-0 mb-3">
                <div className="d-flex flex-wrap justify-content-between mr-3 align-items-center">
                  <div className="mr-2">
                    Subtotal {user?.cart?.total?.currency}
                  </div>
                  <div>{renderPrice(subtotal)}</div>
                </div>
              </div>
              <a
                className="button button--primary button--big text-uppercase w-75 mb-3"
                onClick={() => checkOut()}
              >
                Check out now
              </a>
              <Link href="/artworks">
                <a
                  className="button button--secondary text-uppercase w-75 mb-3"
                  onClick={() => context.toggleCart(false)}
                >
                  Continue shopping
                </a>
              </Link>
              <button
                type="button"
                className="button button--secondary w-75"
                onClick={() => liveAssistance()}
              >
                Live Assistance
              </button>
            </div>
            <small className="p-2">
              <div className="mt-2 mb-4 d-flex align-items-center">
                <img
                  className="payment-provider-logo"
                  src="/static/img/visa.svg"
                  alt="visa"
                />
                <img
                  className="payment-provider-logo"
                  src="/static/img/mastercard.svg"
                  alt="mastercard"
                />
                <img
                  className="payment-provider-logo"
                  src="/static/img/amex.svg"
                  alt="american express"
                />
                <img
                  className="payment-provider-logo"
                  src="/static/img/bitcoin.png"
                  alt="bitcoin"
                />
              </div>
              <h5 className="mb-0 mt-2">Please note</h5>
              <ul className="pl-2 ml-1">
                <li>Editions are shipped unframed, within 5 business days</li>
                <li className="mt-1">
                  International customers are responsible for applicable duties
                  and taxes
                </li>
              </ul>
            </small>
          </div>
        </>
      )}
    </>
  );
};

export default SideCart;
