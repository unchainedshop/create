import React from 'react';

export const CartContext = React.createContext({
  isCartOpen: false,
  toggleCart: (val) => {
    return val;
  },
});

export default CartContext;
