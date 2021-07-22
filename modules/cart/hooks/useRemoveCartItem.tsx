import { useMutation, gql } from '@apollo/client';

const RemoveCartItemMutation = gql`
  mutation removeCartItem($itemId: ID!) {
    removeCartItem(itemId: $itemId) {
      _id
    }
  }
`;

const useRemoveCartItem = () => {
  const [removeCartItemMutation] = useMutation(RemoveCartItemMutation, {
    refetchQueries: ['user', 'cart'],
  });

  const removeCartItem = async ({ itemId }) => {
    await removeCartItemMutation({ variables: { itemId } });
  };

  return {
    removeCartItem,
  };
};

export default useRemoveCartItem;
