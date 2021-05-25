import { gql, useQuery } from '@apollo/client';
import AssortmentFragment from '../fragments/assortment';
import childrenArrayToNavigationIdObject from '../utils/childrenArrayToNavigationIdObject';

const AssortmentTreeQuery = gql`
  query assortmentTree($slugs: [String!], $includeLeaves: Boolean) {
    assortments(slugs: $slugs, includeLeaves: $includeLeaves) {
      ...AssortmentFragment
      children {
        ...AssortmentFragment
        children {
          ...AssortmentFragment
        }
      }
    }
  }
  ${AssortmentFragment}
`;

const usecatagoriesTree = ({
  slugs = [],
  includeLeaves = false,
  root = '',
}: {
  slugs?: string | string[];
  includeLeaves?: boolean;
  root?: string;
}) => {
  const { loading, error, data } = useQuery(AssortmentTreeQuery, {
    variables: {
      includeLeaves,
      slugs,
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

export default usecatagoriesTree;
