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
    refetchQueries: ['user', 'cart'],
  });

  const updateCart = async ({
    orderId = undefined,
    contact = undefined,
    billingAddress = undefined,
  }) =>
    updateCartMutation({
      variables: { contact, billingAddress },
      optimisticResponse: {
        updateCart: {
          _id: orderId,
          __typename: 'Order',
          ...billingAddress,
        },
      },
    });

  return {
    updateCart,
  };
};

export default useUpdateCart;
