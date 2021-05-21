import React, { useState } from 'react';
import Link from 'next/link';

import DesktopNavigationContext from './DesktopNavigationContext';
import MegaDropdown from './MegaDropdown';
import useCatagoriesTree from '../hooks/useCatagoriesTree';

const arrayEqual = (a, b) =>
  a.length === b.length &&
  a.reduce((acc, curr, index) => acc && curr === b[index], true);

const DesktopNavigation = () => {
  const [hoverPath, setHoverPath] = useState([]);
  const [isTouching, setTouching] = useState(false);

  const { assortmentTree } = useCatagoriesTree({ root: 'shop' });

  const handleClick = (node) => (event) => {
    if (isTouching && node.children) {
      // Special behaviour for touch devices: A tab opens the dropdown and the click (=navigation) is prevented
      event.preventDefault();
      if (hoverPath.length > 0 && arrayEqual(node.path, hoverPath)) {
        // This is the second tab on a top-navigation title: It closes the dropdown
        setHoverPath([]);
      } else {
        // This is the first tab on a top-navigation title: It opens the dropdown
        setHoverPath(node.path);
      }
    } else {
      // Default: Hover path is resetted and the user navigates because it was a click on a link
      setHoverPath([]);
    }
  };

  const handleTouchStart = () => {
    setTouching(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setTouching(false), 300);
  };

  return (
    <DesktopNavigationContext.Provider
      value={{
        setHoverPath,
        hoverPath,
        isTouching,
      }}
    >
      <nav
        className="nav nav--main"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div key="shop" className="d-inline-block font-size-0">
          <Link href="shop">
            <a
              className="nav--main__item"
              data-in-hover-path={hoverPath.includes(assortmentTree.slug)}
              onMouseEnter={() => {
                if (!isTouching) {
                  setHoverPath(assortmentTree.slug);
                }
              }}
              onMouseOut={() => {
                setHoverPath([]);
              }}
              onBlur={() => {
                if (!isTouching) setHoverPath([]);
              }}
              onClick={handleClick(assortmentTree)}
            >
              Shop
            </a>
          </Link>
          {hoverPath.includes(assortmentTree.slug) && (
            <MegaDropdown {...assortmentTree} />
          )}
        </div>
      </nav>
    </DesktopNavigationContext.Provider>
  );
};

export default DesktopNavigation;
