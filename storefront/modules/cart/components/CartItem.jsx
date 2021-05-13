import { toast } from 'react-toastify';

import getProductMediaUrl from '../../products/utils/getProductMediaUrl';
import renderPrice from '../../common/utils/renderPrice';
import useRemoveCartItemMutation from '../hooks/useRemoveCartItem';
import useUpdateCartItemMutation from '../hooks/useUpdateCartItem';
import inStock from '../../products/utils/inStock';

const CartItem = ({ item }) => {
  const cartItemsSelect = [1, 2, 3, 4, 5];
  const { removeCartItem } = useRemoveCartItemMutation();
  const handleRemoveClick = (itemId) => () => removeCartItem({ itemId });
  const { updateCartItem } = useUpdateCartItemMutation();

  const handleClick = async (event, previous, itemId) => {
    const currentValue = parseInt(event.target.value, 2);
    const difference = Math.abs(currentValue - previous.quantity);
    let newValue = 0;
    if (previous.quantity < currentValue) {
      if ((inStock(previous.product.simulatedStocks), difference)) {
        newValue = previous.quantity + difference;
      } else {
        toast.warn('Not enough quantity available in stock');
      }
    } else {
      newValue = previous.quantity - difference;
    }

    await updateCartItem({
      itemId,
      quantity: newValue,
    });
  };

  return (
    <div
      className="d-flex justify-content-between align-items-start border-top py-2"
      key={item._id}
    >
      <div className="d-flex justify-content-between align-items-start flex-grow-1">
        <span className="cart-img mr-2">
          <img src={getProductMediaUrl(item.product)} />
        </span>
        <span className="w-100">
          <small>
            <div className="d-flex align-items-center">
              <div className="select-wrap">
                <select
                  onChange={(e) => handleClick(e, item, item._id)}
                  defaultValue={item.quantity}
                >
                  {cartItemsSelect.map((e) => (
                    <option value={e} key={item.product._id}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <span className="mx-1">x</span>
              <span className="text-uppercase">
                {item.product?.texts?.vendor}
              </span>
            </div>
            <div className="mt-1">
              <i>{item.product.texts.title},</i>{' '}
              {item?.product?.wengAttributes?.year}
            </div>
          </small>
          <div className="text-right">
            <small className="d-block mt-2">{renderPrice(item.total)}</small>
          </div>
        </span>
      </div>
      <button
        className="no-button align-self-start remove-button ml-1"
        type="button"
        onClick={handleRemoveClick(item._id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="16px"
          fill="currentColor"
        >
          <title>Remove item</title>
          <path d="M.249,12A11.751,11.751,0,1,0,12,.249,11.765,11.765,0,0,0,.249,12Zm21,0A9.251,9.251,0,1,1,12,2.749,9.262,9.262,0,0,1,21.251,12Z" />
          <path d="M8.833,7.066A1.25,1.25,0,1,0,7.065,8.834l2.99,2.989a.25.25,0,0,1,0,.354l-2.99,2.99a1.25,1.25,0,1,0,1.768,1.767l2.989-2.989a.249.249,0,0,1,.354,0l2.99,2.989a1.249,1.249,0,1,0,1.767-1.767l-2.989-2.99a.25.25,0,0,1,0-.354l2.989-2.989a1.25,1.25,0,1,0-1.767-1.768l-2.99,2.99a.251.251,0,0,1-.354,0Z" />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
