import React from 'react';

import Link from 'next/link';
import { useDesktopNavigationContext } from './DesktopNavigationContext';

const MegaDropdownItem = ({
  type,
  ...rest
}: {
  type: 'default' | 'show_all';
}) => {
  const {
    setHoverPath,
    navigatedPath,
    hoverPath,
    isTouching,
  } = useDesktopNavigationContext();

  const handleClick = (event) => {
    if (type === 'default' && isTouching && rest?.children) {
      setHoverPath(rest?.path);
    } else {
      setHoverPath([]);
    }
  };

  const handleMouseEnter = () => {
    setHoverPath(rest?.path);
  };

  const handleTouchStart = () => {
    setHoverPath(rest?.path);
  };

  return (
    <Link href={`/${rest?.path.join('/')}`}>
      <a
        className={`mega-link ${
          type === 'default' && rest?.children ? 'has-arrow' : ''
        }`}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        data-in-hover-path={
          type === 'default' && hoverPath.includes(rest?.slug)
        }
        data-in-navigation-path={
          type === 'default' && navigatedPath.includes(rest?.slug)
        }
      >
        {type === 'default' ? (
          rest?.navigationTitle
        ) : (
          <b>
            {rest?.navigationTitle}
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

const MegaDropdownColumn = ({ ...rest }) => {
  return (
    <div className="mega-col">
      <MegaDropdownItem {...rest} type="show_all" />

      {rest.children &&
        Object.entries(rest.children)
          .sort(([, aNode], [, bNode]) => {
            return aNode.index - bNode.index;
          })
          .map(([subPageId, subnode]) => (
            <MegaDropdownItem {...subnode} type="default" />
          ))}
    </div>
  );
};

export default MegaDropdownColumn;
