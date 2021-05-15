import { useQuery, gql } from '@apollo/client';

import ProductFragment from '../fragments/ProductFragment';

const ProductDetailQuery = gql`
  query ProductDetailQuery($slug: String) {
    product(slug: $slug) {
      ...ProductFragment
    }
  }
  ${ProductFragment}
`;

const useProductDetail = ({ slug }) => {
  const { data, loading, error } = useQuery(ProductDetailQuery, {
    variables: { slug },
  });

  return {
    product: data?.product,
    loading,
    error,
  };
};

export default useProductDetail;
