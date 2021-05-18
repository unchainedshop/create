import React, { useContext } from 'react';

const DesktopNavigationContext = React.createContext({
  setHoverPath: (i) => i,
  hoverPath: [],
  isTouching: false,
});

export const useDesktopNavigationContext = () =>
  useContext(DesktopNavigationContext);

export default DesktopNavigationContext;
