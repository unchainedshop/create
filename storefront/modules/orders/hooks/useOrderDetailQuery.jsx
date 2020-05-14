import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import OrderFragment from '../fragments/OrderFragment';
import OrderItemFragment from '../fragments/OrderItemFragment';

const OrderDetailQuery = gql`
  query OrderDetailQuery($orderNumber: ID!) {
    order(orderId: $orderNumber) {
      ...OrderFragment
      ...OrderItemFragment
    }
  }
  ${OrderFragment}
  ${OrderItemFragment}
`;

const useOrderDetailQuery = ({ orderNumber }) => {
  const { data, loading, error } = useQuery(OrderDetailQuery, {
    variables: { orderNumber },
  });

  return {
    product: data?.product,
    loading,
    error,
  };
};

export default useOrderDetailQuery;
