import React, { useState } from 'react';
import getConfig from 'next/config';
import { useIntl } from 'react-intl';

import useCategoriesTree from '../hooks/useCategoriesTree';
import Icon from '../../common/components/Icon';
import Thumbnail from '../../common/components/thumbnail';
import changeLanguage from '../../common/utils/changeLanguage';
import LocalizedLink from '../../common/components/LocalizedLink';

const createPathFromArray = (path = []) => `/${(path || []).join('/')}`;

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const Subtree = ({
  pageId,
  children = {},
  navigationTitle,
  path,
  subtree,
  media = [],
}) => {
  const intl = useIntl();
  const [showSubtree, setShowSubtree] = useState(false);

  const level = path.length - 2;

  const levelClassMap = [
    'h3 p-3',
    'pl-3 h5 py-3',
    'pl-4 h5 py-3',
    'pl-5 h5 py-3',
  ];
  return Object.keys(children).length ? (
    <div key={pageId} className="border-top">
      <button
        aria-label="Expand"
        type="button"
        className="no-button w-100 d-flex justify-content-between align-items-center text-uppercase"
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
          <LocalizedLink href={createPathFromArray(path)}>
            <a
              className={`border-top d-block text-uppercase link ${
                levelClassMap[level + 1]
              }`}
            >
              {intl.formatMessage({ id: 'show_all' })}
            </a>
          </LocalizedLink>

          {Object.entries(children)
            .sort(([, aNode], [, bNode]) => aNode?.index - bNode.index)
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
    <LocalizedLink href={createPathFromArray(path)}>
      <a
        className={`border-top d-block text-uppercase ${levelClassMap[level]}`}
      >
        <Thumbnail media={media} />
        {navigationTitle}
      </a>
    </LocalizedLink>
  );
};

const MobileNavigation = ({ doClose, isNavOpen }) => {
  const intl = useIntl();
  const { assortmentTree } = useCategoriesTree({
    root: 'shop',
  });

  return (
    <div className="mobile-menu-holder" data-is-open={isNavOpen}>
      <button
        aria-label="close"
        type="button"
        className="no-button mobile-menu-close"
        onClick={doClose}
      >
        <span className="d-none">{intl.formatMessage({ id: 'close' })}</span>
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
            <small className="ml-2">
              {intl.formatMessage({ id: 'close' })}
            </small>
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

        <div className="pt-3 my-3 ml-3">
          {Object.entries(theme.locales)?.map(([lang]) => (
            <button
              aria-label={intl.formatMessage({ id: `language_${lang}` })}
              type="button"
              className="no-button d-block mb-3"
              onClick={() => changeLanguage(lang)}
            >
              {intl.formatMessage({ id: `language_${lang}` })}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
