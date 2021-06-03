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

const useOrderDetail = ({ orderId }) => {
  const { data, loading, error, ...rest } = useQuery(OrderDetailQuery, {
    variables: { orderId },
    notifyOnNetworkStatusChange: true,
    ssr: false,
    fetchPolicy: 'no-cache',
  });

  return {
    order: data?.order,
    loading,
    error,
    ...rest,
  };
};

export default useOrderDetail;
