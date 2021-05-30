import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';

import ProductFragment from '../../products/fragments/ProductFragment';
import AssortmentFragment from '../fragments/assortment';
import AssortmentMediaFragment from '../fragments/AssortmentMedia';
import AssortmentPathFragment from '../fragments/AssortmentPath';

export const AssortmentsProductsQuery = gql`
  query AssortmentsProductsQuery($slugs: String!, $forceLocale: String) {
    assortment(slug: $slugs) {
      ...AssortmentFragment
      assortmentPaths {
        ...AssortmentPathFragment
      }
      media {
        ...AssortmentMediaFragment
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
  ${AssortmentMediaFragment}
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
  const intl = useIntl();
  const { data, loading, error } = useQuery(AssortmentsProductsQuery, {
    variables: {
      includeLeaves,
      slugs,
      forceLocale: intl.locale,
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
