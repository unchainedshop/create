import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import ProductFragment from '../fragments/ProductFragment';

const ProductDetailQuery = gql`
  query ProductDetailQuery($slug: String) {
    product(slug: $slug) {
      ...ProductFragment
    }
  }
  ${ProductFragment}
`;

const useProductDetailQuery = ({ slug }) => {
  const { data, loading, error } = useQuery(ProductDetailQuery, {
    variables: { slug },
  });

  return {
    product: data?.product,
    loading,
    error,
  };
};

export default useProductDetailQuery;
