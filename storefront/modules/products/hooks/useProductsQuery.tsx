import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const ProductsQuery = gql`
  {
    products {
      _id
      texts {
        _id
        title
        subtitle
        description
      }
      media {
        _id
        file {
          _id
          url
        }
      }
      ... on SimpleProduct {
        dimensions {
          weight
        }
        simulatedPrice {
          price {
            amount
            currency
          }
        }
      }
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
