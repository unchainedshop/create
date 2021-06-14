import { useMutation, gql } from '@apollo/client';

const UpdateCartMutation = gql`
  mutation UpdateCart($billingAddress: AddressInput, $contact: ContactInput) {
    updateCart(billingAddress: $billingAddress, contact: $contact) {
      _id
    }
  }
`;

const useUpdateCart = () => {
  const [updateCartMutation] = useMutation(UpdateCartMutation, {
    refetchQueries: ['user'],
  });

  const updateCart = async ({
    orderId = undefined,
    contact = undefined,
    billingAddress = undefined,
  }) => {
    return updateCartMutation({
      variables: { contact, billingAddress },
      optimisticResponse: {
        updateCart: {
          _id: orderId,
          __typename: 'Order',
        },
      },
    });
  };

  return {
    updateCart,
  };
};

export default useUpdateCart;
