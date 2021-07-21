import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import getMediaUrl from '../../common/utils/getMediaUrl';
import Icon from '../../common/components/Icon';
import renderPrice from '../../common/utils/renderPrice';
import useRemoveCartItem from '../hooks/useRemoveCartItem';
import useUpdateCartItemMutation from '../hooks/useUpdateCartItem';

const CartItem = ({ _id, quantity, product, total }) => {
  const { updateCartItem } = useUpdateCartItemMutation();
  const { removeCartItem } = useRemoveCartItem();
  const [previousQuantity, setPreviousQuantity] = useState(quantity);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

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
        <Link href={`/product/${product?.texts?.slug}`}>
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
          <Icon className="icon--small" icon="bin-2-alternate" />
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
