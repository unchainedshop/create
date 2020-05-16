import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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
    variables: { orderId: orderId },
  });

  return {
    product: data?.product,
    loading,
    error,
  };
};

export default useOrderDetailQuery;
