import { useQuery, gql } from '@apollo/client';

import ProductFragment from '../../products/fragments/ProductFragment';

export const AssortmentsProductsQuery = gql`
  query AssortmentsProductsQuery(
    $includeLeaves: Boolean = true
    $slugs: [String!]
  ) {
    assortments(includeLeaves: $includeLeaves, slugs: $slugs) {
      _id
      texts {
        _id
        slug
      }
      assortmentPaths {
        links {
          link {
            _id
            parent {
              _id
              texts {
                _id
                title
              }
            }
            child {
              _id
              texts {
                _id
                title
              }
            }
          }
        }
      }
      productAssignments {
        product {
          ...ProductFragment
        }
      }
    }
  }
  ${ProductFragment}
`;

const useAssortmentsProducts = ({ includeLeaves = true, slugs = [] } = {}) => {
  const { data, loading, error } = useQuery(AssortmentsProductsQuery, {
    variables: {
      includeLeaves,
      slugs,
    },
  });

  const products =
    (data?.assortments || []).map(
      (assortment) => assortment.productAssignments,
    )?.[0] || [];

  return {
    loading,
    error,
    assortments: data?.assortments,
    products,
  };
};

export default useAssortmentsProducts;
