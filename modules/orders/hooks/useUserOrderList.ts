import { useQuery, gql } from '@apollo/client';

import OrderFragment from '../fragments/OrderFragment';

const UserOrderListQuery = gql`
  {
    me {
      _id
      orders {
        ...OrderFragment
      }
    }
  }
  ${OrderFragment}
`;

const useOrderList = () => {
  const { data, loading, error } = useQuery(UserOrderListQuery);

  return {
    orders: data?.me?.orders || [],
    loading,
    error,
  };
};

export default useOrderList;
