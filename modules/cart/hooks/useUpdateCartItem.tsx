import { useMutation, gql } from '@apollo/client';

const UpdateCartItem = gql`
  mutation UpdateCartItem($itemId: ID!, $quantity: Int = 1) {
    updateCartItem(itemId: $itemId, quantity: $quantity) {
      total {
        amount
        currency
      }
    }
  }
`;

const useUpdateCartItem = () => {
  const [updateCartItemMutation] = useMutation(UpdateCartItem, {
    refetchQueries: ['user'],
  });

  const updateCartItem = async ({ itemId, quantity = 1 }) => {
    await updateCartItemMutation({ variables: { itemId, quantity } });
  };

  return {
    updateCartItem,
  };
};

export default useUpdateCartItem;
