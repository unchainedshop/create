import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import OrderFragment from '../fragments/OrderFragment';

const UserOrderListQuery = gql`
  {
    me {
      orders {
        ...OrderFragment
      }
    }
  }
  ${OrderFragment}
`;

const useOrderListQuery = () => {
  const { data, loading, error } = useQuery(UserOrderListQuery);

  return {
    orders: data?.orders || [],
    loading,
    error,
  };
};

export default useOrderListQuery;
