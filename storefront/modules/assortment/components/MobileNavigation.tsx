import React, { useState } from 'react';
import Link from 'next/link';

import usecatagoriesTree from '../hooks/useCatagoriesTree';
import Icon from '../../common/components/Icon';
import OrderButton from '../../orders/components/UserOrderButton';
import Thumbnail from '../../common/components/thumbnail';

const createPathFromArray = (path = []) => {
  return `/${(path || []).join('/')}`;
};

const Subtree = ({
  pageId,
  children = {},
  navigationTitle,
  path,
  subtree,
  media = [],
}) => {
  const [showSubtree, setShowSubtree] = useState(false);

  const level = path.length - 2;

  const levelClassMap = [
    'font-dax-ot h3 p-3',
    'pl-3 h5 py-3',
    'pl-4 h5 py-3',
    'pl-5 h5 py-3',
  ];
  return Object.keys(children).length ? (
    <div key={pageId} className="border-top">
      <button
        aria-label="Expand"
        type="button"
        className="no-button w-100 d-flex justify-content-between align-items-center"
        onClick={() => setShowSubtree(!showSubtree)}
      >
        <div className={levelClassMap[level]}>
          <Thumbnail media={media} />
          {navigationTitle}
        </div>
        <Icon
          icon={showSubtree ? 'arrow-button-up' : 'arrow-button-down'}
          className="icon--xs mr-3"
        />
      </button>
      {showSubtree ? (
        <div>
          <Link href={createPathFromArray(path)}>
            <a
              className={`border-top d-block link ${levelClassMap[level + 1]}`}
            >
              Show all
            </a>
          </Link>

          {Object.entries(children)
            .sort(([, aNode], [, bNode]) => {
              return aNode.index - bNode.index;
            })
            .map(([subPageId, node]) => (
              <Subtree
                path={node?.path}
                navigationTitle={node?.navigationTitle}
                subtree={subtree}
                key={subPageId}
                pageId={subPageId}
                {...node}
              />
            ))}
        </div>
      ) : (
        ''
      )}
    </div>
  ) : (
    <Link href={createPathFromArray(path)}>
      <a className={`border-top d-block ${levelClassMap[level]}`}>
        <Thumbnail media={media} />
        {navigationTitle}
      </a>
    </Link>
  );
};

const MobileNavigation = ({ doClose, isNavOpen }) => {
  const { assortmentTree } = usecatagoriesTree({ root: 'shop' });

  return (
    <div className="mobile-menu-holder" data-is-open={isNavOpen}>
      <button
        aria-label="close"
        type="button"
        className="no-button mobile-menu-close"
        onClick={doClose}
      >
        <span className="d-none">close</span>
      </button>
      <nav id="menu" className="mobile-menu">
        <div>
          <button
            aria-label="close"
            type="button"
            className="no-button w-100 text-left p-3 d-flex align-items-center"
            onClick={doClose}
          >
            <Icon className="icon--small" icon="close" />
            <small className="ml-2">close</small>
          </button>

          {Object.entries(assortmentTree.children).map(([pageId, node]) => (
            <Subtree
              path={node?.path}
              navigationTitle={node?.navigationTitle}
              subtree={node?.children}
              key={pageId}
              pageId={pageId}
              {...node}
            />
          ))}
        </div>

        <div className="border-top pt-4 pl-3">
          <OrderButton />
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
