import React from 'react';

import MegaDropdownColumn from './MegaDropdownColumn';
import { useDesktopNavigationContext } from './DesktopNavigationContext';

const MegaDropdown = ({ ...rest }) => {
  const { setHoverPath, isTouching } = useDesktopNavigationContext();

  return (
    <div
      className="nav--main__mega"
      onMouseEnter={() => {
        if (!isTouching) setHoverPath(rest?.texts?.slug);
      }}
      onMouseLeave={() => {
        if (!isTouching) setHoverPath([]);
      }}
      onBlur={() => {
        if (!isTouching) setHoverPath([]);
      }}
    >
      <MegaDropdownColumn {...rest} key="mega-dropdown-column-1" />
    </div>
  );
};

export default MegaDropdown;
