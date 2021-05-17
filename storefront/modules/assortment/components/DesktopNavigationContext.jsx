import React, { useContext } from 'react';

const DesktopNavigationContext = React.createContext({
  setHoverPath: (i) => i,
  navigatedPath: [],
  hoverPath: [],
  isTouching: false,
});

export const useDesktopNavigationContext = () =>
  useContext(DesktopNavigationContext);

export default DesktopNavigationContext;
