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
      refetchQueries: ['UserQuery'],
    },
  );

  const updateOrderDeliveryAddress = async ({
    orderDeliveryId,
    address,
    meta,
  }) => {
    await updateOrderDeliveryShipping({
      variables: { orderDeliveryId, address, meta },
    });
  };

  return {
    updateOrderDeliveryAddress,
  };
};

export default useUpdateOrderDeliveryShipping;
