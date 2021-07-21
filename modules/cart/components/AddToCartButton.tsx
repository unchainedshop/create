import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import useConditionalAddCartProduct from '../hooks/useConditionalAddCartProduct';
import useUser from '../../auth/hooks/useUser';
import useUpdateCartItem from '../hooks/useUpdateCartItem';
import useRemoveCartItem from '../hooks/useRemoveCartItem';

const AddToCartButton = ({ productId }) => {
  const { register, setValue } = useForm();
  const intl = useIntl();
  const { cart } = useUser();
  const { conditionalAddCartProduct } = useConditionalAddCartProduct();
  const { updateCartItem } = useUpdateCartItem();
  const { removeCartItem } = useRemoveCartItem();

  const cartEntry = cart?.items.find(
    ({ product }) => product._id === productId,
  );

  const quantity = cartEntry?.quantity || 0;

  useEffect(() => {
    setValue('quantity', quantity);
  }, [quantity]);

  const addToCart = () => {
    conditionalAddCartProduct({ productId });
  };

  const handleMinus = () => {
    const currentQuantity: number = cartEntry.quantity - 1;

    if (currentQuantity > 0) {
      updateCartItem({ itemId: cartEntry._id, quantity: currentQuantity });
    } else {
      removeCartItem({ itemId: cartEntry._id });
    }
  };

  const handleNumberInput = (event) => {
    if (event.currentTarget.value !== '') {
      const currentQuantity = parseInt(event.currentTarget.value, 10);

      if (currentQuantity > 0) {
        updateCartItem({
          itemId: cartEntry._id,
          quantity: currentQuantity,
        });
      } else {
        removeCartItem({ itemId: cartEntry._id });
      }
    }
  };

  return quantity > 0 ? (
    <div className="add-to-cart-wrapper add-to-cart-wrapper--with-counter add-to-cart-wrapper--fullwidth mb-3 mt-2">
      <div>
        <button
          type="button"
          className="button-icon-small minus"
          onClick={handleMinus}
        >
          <span className="icon icon--minus">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                fill="currentColor"
                d="M424 318.2c13.3 0 24-10.7 24-24v-76.4c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24v76.4c0 13.3 10.7 24 24 24h400z"
              />
            </svg>
          </span>
        </button>

        <button type="button" className="no-button" onClick={addToCart}>
          <input
            name="quantity"
            ref={register}
            type="number"
            className="add-to-cart-counter form-control"
            min="1"
            max="100000"
            onChange={handleNumberInput}
            onClick={(event) => event.stopPropagation()}
          />
          <span className="ml-1">In Cart</span>
          <span className="icon icon--check ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="16"
            >
              <path
                fill="currentColor"
                d="M23.146 5.4l-2.792-2.8a.5.5 0 00-.708 0L7.854 14.4a.5.5 0 01-.708 0l-2.792-2.8a.5.5 0 00-.708 0L.854 14.4a.5.5 0 000 .707L7.146 21.4a.5.5 0 00.708 0L23.146 6.1a.5.5 0 000-.7z"
              />
            </svg>
          </span>
        </button>

        <button
          type="button"
          className="button-icon-small plus"
          onClick={addToCart}
        >
          <span className="icon icon--plus">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                fill="currentColor"
                d="M448 294.2v-76.4c0-13.3-10.7-24-24-24H286.2V56c0-13.3-10.7-24-24-24h-76.4c-13.3 0-24 10.7-24 24v137.8H24c-13.3 0-24 10.7-24 24v76.4c0 13.3 10.7 24 24 24h137.8V456c0 13.3 10.7 24 24 24h76.4c13.3 0 24-10.7 24-24V318.2H424c13.3 0 24-10.7 24-24z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  ) : (
    <button
      type="button"
      className="button button--primary button-add-to-cart mt-2 mb-3"
      aria-label="In Cart"
      onClick={addToCart}
    >
      <span>{intl.formatMessage({ id: 'add_to_cart' })}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="18"
        className="ml-3"
      >
        <title>add-square-alternate</title>
        <path
          fill="currentColor"
          d="M21.545.25H2.455a2.206,2.206,0,0,0-2.2,2.2V21.546a2.207,2.207,0,0,0,2.205,2.2h19.09a2.207,2.207,0,0,0,2.2-2.2V2.454A2.206,2.206,0,0,0,21.545.25Zm-.3,21H2.75V2.75h18.5Z"
        />
        <path
          fill="currentColor"
          d="M6.273,13.25H10.5a.25.25,0,0,1,.25.25v4.227a1.25,1.25,0,0,0,2.5,0V13.5a.25.25,0,0,1,.25-.25h4.227a1.25,1.25,0,0,0,0-2.5H13.5a.25.25,0,0,1-.25-.25V6.272a1.25,1.25,0,1,0-2.5,0V10.5a.25.25,0,0,1-.25.25H6.273a1.25,1.25,0,0,0,0,2.5Z"
        />
      </svg>
    </button>
  );
};

export default AddToCartButton;
