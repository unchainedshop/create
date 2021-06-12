import React from 'react';

export const CartContext = React.createContext({
  isCartOpen: false,
  toggleCart: (val) => val,
});

export default CartContext;
