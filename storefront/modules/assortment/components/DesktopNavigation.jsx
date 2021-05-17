// TODO: Fix a11y stuff
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';

import DesktopNavigationContext from './DesktopNavigationContext';
import MegaDropdown from './MegaDropdown';
import useCatagoriesTree from '../hooks/useCatagoriesTree';

const DesktopNavigation = () => {
  const router = useRouter();
  const [hoverPath, setHoverPath] = useState([]);
  const [isTouching, setTouching] = useState(false);
  const navigatedPath = router.asPath.split('/').filter(Boolean);

  const { assortmentTree } = useCatagoriesTree({ root: 'shop' });

  const handleClick = () => () => {
    setHoverPath([]);
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
        navigatedPath,
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
              data-in-navigation-path={navigatedPath.includes(
                assortmentTree.slug,
              )}
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
              onClick={handleClick()}
            >
              shop
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
