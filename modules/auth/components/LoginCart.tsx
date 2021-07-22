import Link from 'next/link';
import { useContext } from 'react';
import { useIntl } from 'react-intl';

import OrderButton from '../../orders/components/UserOrderButton';
import { CartContext } from '../../cart/CartContext';
import Icon from '../../common/components/Icon';
import useUser from '../hooks/useUser';

const LoginCart = () => {
  const { user } = useUser();
  const intl = useIntl();
  const context = useContext(CartContext);

  return user ? (
    <div className="d-flex align-items-center">
      <a
        className="ml-md-3 d-flex align-items-center"
        onClick={() => context.toggleCart(!context.isCartOpen)}
      >
        <Icon className="mr-2" icon="shopping-cart-empty-1" />
        <span className="cart-counter mr-2">
          {user?.cart?.items
            ? user?.cart?.items.reduce((acc, item) => acc + item.quantity, 0)
            : 0}
        </span>
        <span className="hide-on-mobile">
          {intl.formatMessage({ id: 'cart' })}
        </span>
      </a>
      <div className="ml-2 ml-md-3">
        {user?.isGuest ? (
          <>
            <Link href="/sign-up">
              <a className="my-1 mr-3 ">
                {intl.formatMessage({ id: 'sign_up' })}
              </a>
            </Link>
            <Link href="/login">
              <a className="my-1">{intl.formatMessage({ id: 'log_in' })}</a>
            </Link>
          </>
        ) : (
          <OrderButton />
        )}
      </div>

      {!user.isGuest ? (
        <>
          <Link href="/account">
            <a className="ml-2 ml-md-3 d-flex align-items-center">
              <Icon className="mr-2" icon="single-neutral-home" />
              <span className="hide-on-mobile">
                {intl.formatMessage({ id: 'account' })}
              </span>
            </a>
          </Link>
          <Link href="/logout">
            <a className="ml-2 ml-md-3 d-flex align-items-center">
              <Icon className="mr-2" icon="logout-2" />
              <span className="hide-on-mobile">
                {intl.formatMessage({ id: 'log_out' })}
              </span>
            </a>
          </Link>
        </>
      ) : (
        ' '
      )}
    </div>
  ) : (
    <div>
      <Link href="/sign-up">
        <a className="my-1 mr-3 ">{intl.formatMessage({ id: 'sign_up' })}</a>
      </Link>
      <Link href="/login">
        <a className="my-1">{intl.formatMessage({ id: 'log_in' })}</a>
      </Link>
    </div>
  );
};

export default LoginCart;
