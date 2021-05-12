import { useQuery, gql } from '@apollo/client';

import ProductFragment from '../../products/fragments/ProductFragment';

export const AssortmentsProductsQuery = gql`
  query AssortmentsProductsQuery($slugs: String!) {
    assortment(slug: $slugs) {
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
                slug
                title
              }
            }
          }
        }
      }
      searchProducts {
        productsCount
        products {
          ...ProductFragment
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

const useAssortmentProducts = (
  {
    includeLeaves,
    slugs,
  }: { includeLeaves: boolean; slugs: string[] | string } = {
    includeLeaves: true,
    slugs: [],
  },
) => {
  const { data, loading, error } = useQuery(AssortmentsProductsQuery, {
    variables: {
      includeLeaves,
      slugs,
    },
  });
  const paths = (data?.assortment.assortmentPaths || []).flat().pop()?.links;
  const products = data?.assortment?.searchProducts.products || [];

  return {
    loading,
    error,
    assortment: data?.assortment,
    products,
    paths,
  };
};

export default useAssortmentProducts;
