import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import ProductFragment from '../fragments/ProductFragment';

const ProductsQuery = gql`
  {
    products {
      ...ProductFragment
    }
  }
  ${ProductFragment}
`;

const useProductsQuery = () => {
  const { data, loading, error } = useQuery(ProductsQuery);

  return {
    products: data?.products || [],
    loading,
    error,
  };
};

export default useProductsQuery;
