import { useRouter } from 'next/router';

import useUserQuery from '../modules/auth/hooks/useUserQuery';
import getProductMediaUrl from '../modules/products/utils/getProductMediaUrl';
import renderPrice from '../modules/common/utils/renderPrice';
import useRemoveCartItemMutation from '../modules/cart/hooks/useRemoveCartItemMutation';

const Cart = () => {
  const router = useRouter();
  const { user, loading } = useUserQuery();
  const { removeCartItem } = useRemoveCartItemMutation();

  if (!user && !loading) router.push('/anmelden?next=warenkorb');

  const handleRemoveClick = (itemId) => () => removeCartItem({ itemId });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>Warenkorb</h1>
          <table>
            <tbody>
              {(user?.cart?.items || []).map((item) => (
                <tr key={item._id}>
                  <td>{item.quantity}</td>
                  {/* <td>
                    <img src={getProductMediaUrl(item.product)} />
                  </td> */}
                  <td>{item.product.texts.title}</td>
                  <td>{renderPrice(item.total)}</td>
                  <td>
                    <button onClick={handleRemoveClick(item._id)}>
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
        </div>
      </div>
    </div>
  );
};

export default Cart;
