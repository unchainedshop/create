import React from 'react';

const RoutesContext = React.createContext({
  isCartToggled: false,
  setCartToggled: (bool) => {},
  isClientChooserToggled: true,
  setUserToggled: (bool) => {},
  bodyOverflowHidden: false,
  setBodyOverflowHidden: () => {},
});

export default RoutesContext;
