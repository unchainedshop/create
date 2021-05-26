import React from 'react';

const RoutesContext = React.createContext({
  isCartToggled: false,
  setCartToggled: (bool) => bool,
  isClientChooserToggled: true,
  setUserToggled: (bool) => bool,
  bodyOverflowHidden: false,
  setBodyOverflowHidden: () => {},
});

export default RoutesContext;
