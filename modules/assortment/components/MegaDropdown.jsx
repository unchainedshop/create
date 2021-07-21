import React from 'react';

import MegaDropdownColumn from './MegaDropdownColumn';
import { useDesktopNavigationContext } from './DesktopNavigationContext';

const findChildBySlug = (node, slug) => {
  return (
    node.children &&
    Object.entries(node.children).find(
      ([, childNode]) => childNode.slug === slug,
    )
  );
};

const getColumn = (node, hoverPath, columnIndex) => {
  if (hoverPath.length <= columnIndex || !node) {
    return [null, null];
  }
  if (hoverPath.includes(node.slug)) {
    return findChildBySlug(node, hoverPath[columnIndex]) || [null, null];
  }
  return [null, null];
};

const MegaDropdown = ({ ...rest }) => {
  const { setHoverPath, isTouching, hoverPath } = useDesktopNavigationContext();

  const [, secondColumnNode] = getColumn(rest, hoverPath, 1);

  const [, thirdColumnNode] = getColumn(
    secondColumnNode,
    hoverPath,

    2,
  );

  return (
    <div
      className="nav--main__mega"
      onMouseEnter={() => {
        if (!isTouching) setHoverPath(rest?.path);
      }}
      onMouseLeave={() => {
        if (!isTouching) setHoverPath([]);
      }}
      onBlur={() => {
        if (!isTouching) setHoverPath([]);
      }}
    >
      <MegaDropdownColumn {...rest} key="mega-dropdown-column-1" />
      {secondColumnNode?.children ? (
        <MegaDropdownColumn
          {...secondColumnNode}
          key="mega-dropdown-column-2"
        />
      ) : (
        <div className="mega-col" />
      )}
      {thirdColumnNode?.children ? (
        <MegaDropdownColumn {...thirdColumnNode} key="mega-dropdown-column-3" />
      ) : (
        ''
      )}
    </div>
  );
};

export default MegaDropdown;
