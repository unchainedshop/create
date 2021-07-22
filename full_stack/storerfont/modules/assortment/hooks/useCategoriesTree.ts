import { gql, useQuery } from '@apollo/client';
import { useIntl } from 'react-intl';

import AssortmentFragment from '../fragments/assortment';
import AssortmentMediaFragment from '../fragments/AssortmentMedia';
import childrenArrayToNavigationIdObject from '../utils/childrenArrayToNavigationIdObject';

const AssortmentTreeQuery = gql`
  query assortmentTree(
    $slugs: [String!]
    $includeLeaves: Boolean
    $forceLocale: String
  ) {
    assortments(slugs: $slugs, includeLeaves: $includeLeaves) {
      ...AssortmentFragment
      media {
        ...AssortmentMediaFragment
      }
      children {
        ...AssortmentFragment
        media {
          ...AssortmentMediaFragment
        }
        children {
          ...AssortmentFragment
          media {
            ...AssortmentMediaFragment
          }
        }
      }
    }
  }
  ${AssortmentFragment}
  ${AssortmentMediaFragment}
`;

const useCategoriesTree = ({
  slugs = [],
  includeLeaves = false,
  root = '',
}: {
  slugs?: string | string[];
  includeLeaves?: boolean;
  root?: string;
}) => {
  const intl = useIntl();
  const { loading, error, data } = useQuery(AssortmentTreeQuery, {
    variables: {
      includeLeaves,
      slugs,
      forceLocale: intl.locale,
    },
  });

  // TODO REFACTOR: This would be nicer with `walk`
  const assortments = childrenArrayToNavigationIdObject(
    (data?.assortments || []).map((assortment) => ({
      ...assortment,
      children: childrenArrayToNavigationIdObject(
        assortment.children.map((subAssortment) => ({
          ...subAssortment,
          children: childrenArrayToNavigationIdObject(subAssortment.children, [
            root,
            assortment.texts.slug,
            subAssortment.texts.slug,
          ]),
        })),
        [root, assortment.texts.slug],
      ),
    })),
  );
  const assortmentTree = {
    navigationTitle: root,
    slug: root,
    path: [root],
    children: assortments,
  };

  return { loading, error, assortmentTree };
};

export default useCategoriesTree;
