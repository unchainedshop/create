import React from 'react';
import Link from 'next/link';

import { useIntl } from 'react-intl';
import { useDesktopNavigationContext } from './DesktopNavigationContext';
import Thumbnail from '../../common/components/thumbnail';

export type Node = {
  slug: string;
  children: any[];
  path: string[];
  navigationTitle: string;
  type: 'default' | 'show_all';
  media: any[];
};

const MegaDropdownItem = ({
  slug,
  children,
  navigationTitle,
  type,
  path,
  media = [],
}: Node) => {
  const intl = useIntl();
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
          type === 'default' && Object.keys(children).length ? 'has-arrow' : ''
        }`}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        data-in-hover-path={type === 'default' && hoverPath.includes(slug)}
      >
        <div className="d-flex align-items-baseline">
          {type === 'default' ? (
            <>
              <Thumbnail media={media} />
              {navigationTitle}
            </>
          ) : (
            <b>
              {navigationTitle}
              &nbsp;
            </b>
          )}

          {type === 'show_all' ? (
            <small className="ml-2">
              {intl.formatMessage({ id: 'show_all' })}
            </small>
          ) : (
            ''
          )}
        </div>
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
