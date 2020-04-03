import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const ProductsQuery = gql`
  {
    products {
      _id
    }
  }
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
