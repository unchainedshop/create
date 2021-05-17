import { gql, useQuery } from '@apollo/client';

const AssortmentTreeQuery = gql`
  query assortmentTree {
    assortments {
      _id
      texts {
        _id
        title
        slug
      }
      children {
        _id

        texts {
          _id
          title
          slug
        }
        children {
          _id
          texts {
            _id
            title
            slug
          }
        }
      }
    }
  }
`;

const childrenArrayToNavigationIdObject = (children, path = ['shop']) =>
  children.reduce(
    (acc, curr, index) => ({
      ...acc,
      [curr._id]: {
        ...curr,
        path: [...path, curr.texts.slug],
        slug: curr.texts.slug,
        navigationTitle: curr.texts.title,
        index,
      },
    }),
    {},
  );

const useCatagoriesTree = ({ root }) => {
  const { loading, error, data } = useQuery(AssortmentTreeQuery);

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

export default useCatagoriesTree;
