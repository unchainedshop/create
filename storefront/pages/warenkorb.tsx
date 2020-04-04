import { useRouter } from 'next/router';
import Link from 'next/link';

import useUserQuery from '../modules/auth/hooks/useUserQuery';
import getProductMediaUrl from '../modules/products/utils/getProductMediaUrl';
import renderPrice from '../modules/common/utils/renderPrice';
import useRemoveCartItemMutation from '../modules/cart/hooks/useRemoveCartItemMutation';
import Header from '../modules/layout/components/Header';

const Cart = () => {
  const router = useRouter();
  const { user, loading } = useUserQuery();
  const { removeCartItem } = useRemoveCartItemMutation();

  if (!user && !loading) router.push('/anmelden?next=warenkorb');

  const handleRemoveClick = (itemId) => () => removeCartItem({ itemId });

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Warenkorb</h1>
          <table>
            <tbody>
              {(user?.cart?.items || []).map((item) => (
                <tr key={item._id}>
                  <td>{item.quantity} x</td>
                  {/* <td>
                    <img src={getProductMediaUrl(item.product)} />
                  </td> */}
                  <td>{item.product.texts.title}</td>
                  <td>{renderPrice(item.total)}</td>
                  <td>
                    <button
                      className="button button--secondary button--small"
                      type="button"
                      onClick={handleRemoveClick(item._id)}
                    >
                      Entfernen
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="border-top">
                <td></td>
                <td></td>
                <td>
                  <b>{renderPrice(user?.cart?.total)}</b>
                </td>
              </tr>
            </tbody>
          </table>

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
