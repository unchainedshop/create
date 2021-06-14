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
    contact = undefined,
    billingAddress = undefined,
  }) => {
    return updateCartMutation({
      variables: { contact, billingAddress },
    });
  };

  return {
    updateCart,
  };
};

export default useUpdateCart;
