import React from 'react';
import Link from 'next/link';

import { useDesktopNavigationContext } from './DesktopNavigationContext';

export type Node = {
  slug: string;
  children: any[];
  path: string[];
  navigationTitle: string;
  type: 'default' | 'show_all';
};

const MegaDropdownItem = ({
  slug,
  children,
  navigationTitle,
  type,
  path,
}: Node) => {
  const { setHoverPath, hoverPath, isTouching } = useDesktopNavigationContext();

  const handleClick = () => {
    if (type === 'default' && isTouching && children) {
      setHoverPath(path);
    } else {
      setHoverPath([]);
    }
  };

  const handleMouseEnter = () => {
    setHoverPath(path);
  };

  const handleTouchStart = () => {
    setHoverPath(path);
  };

  return (
    <Link href={`/${path.join('/')}`}>
      <a
        className={`mega-link ${
          type === 'default' && children ? 'has-arrow' : ''
        }`}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        data-in-hover-path={type === 'default' && hoverPath.includes(slug)}
      >
        {type === 'default' ? (
          navigationTitle
        ) : (
          <b>
            {navigationTitle}
            &nbsp;
          </b>
        )}

        {type === 'show_all' ? (
          <small className="ml-2 font-pt-sans">Show all</small>
        ) : (
          ''
        )}
      </a>
    </Link>
  );
};

const MegaDropdownColumn = ({ ...rest }: Node) => {
  return (
    <div className="mega-col">
      <MegaDropdownItem {...rest} type="show_all" />

      {rest.children &&
        Object.entries(rest.children)
          .sort(([, aNode], [, bNode]) => {
            return aNode.index - bNode.index;
          })
          .map(([, subnode]) => (
            <MegaDropdownItem key={subnode._id} {...subnode} type="default" />
          ))}
    </div>
  );
};

export default MegaDropdownColumn;