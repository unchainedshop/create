import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import ProductFragment from '../../products/fragments/ProductFragment';
import AddressFragment from '../fragments/AddressFragment';

const UserQuery = gql`
  # Try to write your query here
  query UserQuery {
    me {
      _id
      isGuest
      cart {
        _id
        billingAddress {
          ...AddressFragment
        }
        contact {
          telNumber
          emailAddress
        }
        items {
          _id
          quantity
          total {
            amount
            currency
          }
          product {
            ...ProductFragment
          }
        }
        total {
          amount
          currency
        }
      }
    }
  }
  ${ProductFragment}
  ${AddressFragment}
`;

const useUserQuery = () => {
  const { data, loading, error } = useQuery(UserQuery);

  return {
    loading,
    error,
    user: data?.me,
  };
};

export default useUserQuery;
