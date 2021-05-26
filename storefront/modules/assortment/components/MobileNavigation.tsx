import React, { useState } from 'react';

import Link from 'next/link';
import usecatagoriesTree from '../hooks/useCatagoriesTree';

const Subtree = ({ pageId, children = {}, navigationTitle, path }) => {
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
        <div className={levelClassMap[level]}>{navigationTitle}</div>
      </button>
      {showSubtree ? (
        <div>
          <Link href="something">
            <a
              className={`border-top d-block link ${levelClassMap[level + 1]}`}
            >
              show all
            </a>
          </Link>

          {Object.entries(children)
            .sort(([, aNode], [, bNode]) => {
              return aNode.index - bNode.index;
            })
            .map(([subPageId, node]) => (
              <Subtree
                path="asdasd"
                navigationTitle="jjs"
                subtree={[]}
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
    <Link href="/nav">
      <a className={`border-top d-block ${levelClassMap[level]}`}>
        Navigation title
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
            x<small className="ml-2">close</small>
          </button>

          {Object.entries(assortmentTree.children).map(([pageId, node]) => (
            <Subtree
              path="asdasd"
              navigationTitle="jjs"
              subtree={[]}
              key={pageId}
              pageId={pageId}
              {...node}
            />
          ))}
        </div>

        <div className="border-top pt-4 pl-3">
          <Link href="/contact">
            <a className="d-block mb-3">Contact</a>
          </Link>

          <div className="my-3 float-right mr-4">
            <button
              aria-label="deutsch"
              type="button"
              className="no-button d-block mb-3"
            >
              deutsch
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
