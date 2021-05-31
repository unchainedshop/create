import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';

import { ProductAssortmentPathFragment } from '../../assortment/fragments/AssortmentPath';
import ProductFragment from '../fragments/ProductFragment';

const ProductDetailQuery = gql`
  query ProductDetailQuery($slug: String, $forceLocale: String) {
    product(slug: $slug) {
      assortmentPaths {
        ...ProductAssortmentPathFragment
      }
      ...ProductFragment
    }
  }
  ${ProductFragment}
  ${ProductAssortmentPathFragment}
`;

const useProductDetail = ({ slug }) => {
  const intl = useIntl();
  const { data, loading, error } = useQuery(ProductDetailQuery, {
    variables: { slug, forceLocale: intl.locale },
  });

  const paths = (data?.product?.assortmentPaths || []).flat().pop()?.links;

  return {
    product: data?.product,
    paths,
    loading,
    error,
  };
};

export default useProductDetail;
