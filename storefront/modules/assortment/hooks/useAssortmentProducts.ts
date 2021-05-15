import { useQuery, gql } from '@apollo/client';

import ProductFragment from '../../products/fragments/ProductFragment';
import AssortmentFragment from '../fragments/assortment';
import AssortmentPathFragment from '../fragments/AssortmentPath';

export const AssortmentsProductsQuery = gql`
  query AssortmentsProductsQuery($slugs: String!) {
    assortment(slug: $slugs) {
      ...AssortmentFragment
      assortmentPaths {
        ...AssortmentPathFragment
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
  ${AssortmentFragment}
  ${ProductFragment}
  ${AssortmentPathFragment}
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
