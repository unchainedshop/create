import { useQuery, gql } from '@apollo/client';

export const AssortmentPathsQuery = gql`
  query AssortmentPathsQuery($assortmentId: ID!) {
    assortment(assortmentId: $assortmentId) {
      _id
      texts {
        _id
        title
        slug
      }
      isBase
      isRoot
      assortmentPaths {
        links {
          link {
            parent {
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
    }
  }
`;

const useAssortmentPaths = ({ assortmentId }) => {
  const { data, loading, error } = useQuery(AssortmentPathsQuery, {
    variables: {
      assortmentId,
    },
  });

  return {
    loading,
    error,
    assortment: data?.assortment,
  };
};

export default useAssortmentPaths;
