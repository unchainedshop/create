import { useMutation, gql } from '@apollo/client';

const UpdateOrderDeliveryShippingMutation = gql`
  mutation UpdateOrderDeliveryShipping(
    $orderDeliveryId: ID!
    $address: AddressInput
    $meta: JSON
  ) {
    updateOrderDeliveryShipping(
      orderDeliveryId: $orderDeliveryId
      address: $address
      meta: $meta
    ) {
      _id
    }
  }
`;

const useUpdateOrderDeliveryShipping = () => {
  const [updateOrderDeliveryShipping] = useMutation(
    UpdateOrderDeliveryShippingMutation,
    {
      refetchQueries: ['user'],
    },
  );

  const updateOrderDeliveryAddress = async ({
    orderDeliveryId,
    address,
    meta,
  }) => {
    await updateOrderDeliveryShipping({
      variables: { orderDeliveryId, address, meta },
      refetchQueries: ['user'],
      optimisticResponse: {
        updateOrderDeliveryShipping: {
          _id: orderDeliveryId,
          __typename: 'OrderDeliveryShipping',
        },
      },
    });
  };

  return {
    updateOrderDeliveryAddress,
  };
};

export default useUpdateOrderDeliveryShipping;
