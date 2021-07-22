import { useMutation, gql } from '@apollo/client';

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
    refetchQueries: ['user'],
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
