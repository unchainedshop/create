import { useQuery, gql } from '@apollo/client';

import OrderFragment from '../fragments/OrderFragment';
import OrderItemFragment from '../fragments/OrderItemFragment';

const OrderDetailQuery = gql`
  query OrderDetailQuery($orderId: ID!) {
    order(orderId: $orderId) {
      ...OrderFragment
      items {
        ...OrderItemFragment
      }
    }
  }
  ${OrderFragment}
  ${OrderItemFragment}
`;

const useOrderDetailQuery = ({ orderId }) => {
  const { data, loading, error } = useQuery(OrderDetailQuery, {
    variables: { orderId },
  });

  return {
    order: data?.order,
    loading,
    error,
  };
};

export default useOrderDetailQuery;
