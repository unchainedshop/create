import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CheckOutCartMutation = gql`
  mutation CheckOutCart(
    $orderId: ID!
    $orderContext: JSON
    $paymentContext: JSON
    $deliveryContext: JSON
  ) {
    checkoutCart(
      orderId: $orderId
      orderContext: $orderContext
      paymentContext: $paymentContext
      deliveryContext: $deliveryContext
    ) {
      status
    }
  }
`;

const useCheckOutCartMutation = () => {
  const [checkOutCartMutation] = useMutation(CheckOutCartMutation, {
    refetchQueries: ['UserQuery'],
  });

  const checkOutCart = async ({
    orderId,
    orderContext,
    paymentContext,
    deliveryContext,
  }) => {
    await checkOutCartMutation({
      variables: { orderId, orderContext, paymentContext, deliveryContext },
    });
  };

  return {
    checkOutCart,
  };
};

export default useCheckOutCartMutation;
