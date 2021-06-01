import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import getMediaUrl from '../../common/utils/getMediaUrl';

import renderPrice from '../../common/utils/renderPrice';
import useRemoveCartItem from '../hooks/useRemoveCartItem';
import useUpdateCartItemMutation from '../hooks/useUpdateCartItem';

const CartItem = ({ _id, quantity, product, total }) => {
  const { updateCartItem } = useUpdateCartItemMutation();
  const { removeCartItem } = useRemoveCartItem();
  const [previousQuantity, setPreviousQuantity] = useState(quantity);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const intl = useIntl();

  const handleChange = (e) => {
    const amount = e.target.value;
    setCurrentQuantity(amount);
  };
  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity]);

  const handleBlur = (e) => {
    const amount = parseFloat(currentQuantity);
    let newValue = 0;
    if (Number.isNaN(amount) || amount < 0 || e.target.value === '0') {
      newValue = 1;
      setCurrentQuantity(1);
    } else {
      newValue = 0;
      const difference = Math.abs(amount - previousQuantity);
      if (previousQuantity < amount) {
        newValue = previousQuantity + difference;
      } else {
        newValue = previousQuantity - difference;
      }
    }
    if (previousQuantity !== newValue) {
      updateCartItem({
        itemId: _id,
        quantity: newValue,
      });

      setPreviousQuantity(amount);
    }
  };

  return (
    <div className="cart-item" key={_id}>
      <div className="item-img">
        <Image
          src={`${
            getMediaUrl(product) || '/static/img/sun-glass-placeholder.jpeg'
          }`}
          alt={product?.texts?.title}
          layout="responsive"
          objectFit="contain"
          quality={100}
          width="350px"
          height="350px"
        />
      </div>
      <div className="d-flex justify-content-between align-items-baseline">
        <Link
          href={`/${intl.formatMessage({ id: 'product' })}/${
            product?.texts?.slug
          }`}
        >
          <a>
            <div className="item-info">
              {product?.texts && product?.texts.title}
            </div>
          </a>
        </Link>
        <button
          className="no-button"
          type="button"
          aria-label="remove cart item"
          onClick={() => removeCartItem({ itemId: _id })}
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
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="item-quantity">
          <button
            type="button"
            className="no-button border-left-radius"
            aria-label="Increase cart item"
            disabled={currentQuantity === 1}
            onClick={() =>
              updateCartItem({
                itemId: _id,
                quantity: Math.max(quantity - 1, 1),
              })
            }
          >
            -
          </button>
          <input
            type="text"
            pattern="\d+"
            className="form-field"
            onBlur={handleBlur}
            onChange={handleChange}
            value={currentQuantity}
          />
          <button
            className="no-button border-right-radius"
            aria-label="Decrease cart item"
            type="button"
            onClick={() =>
              updateCartItem({
                itemId: _id,
                quantity: quantity + 1,
              })
            }
          >
            +
          </button>
        </div>
        <div className="item-price">
          <small className="d-block mt-2">{renderPrice(total)}</small>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
