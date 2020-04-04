import getProductMediaUrl from '../../products/utils/getProductMediaUrl';
import renderPrice from '../../common/utils/renderPrice';
import useRemoveCartItemMutation from '../../cart/hooks/useRemoveCartItemMutation';
import useUserQuery from '../../auth/hooks/useUserQuery';

const ManageCart = () => {
  const { user } = useUserQuery();
  const { removeCartItem } = useRemoveCartItemMutation();
  const handleRemoveClick = (itemId) => () => removeCartItem({ itemId });

  return (
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
  );
};

export default ManageCart;
