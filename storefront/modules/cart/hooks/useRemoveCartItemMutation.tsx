import { useMutation, gql } from '@apollo/client';

const RemoveCartItemMutation = gql`
  mutation RemoveCartItem($itemId: ID!) {
    removeCartItem(itemId: $itemId) {
      _id
    }
  }
`;

const useRemoveCartItemMutation = () => {
  const [removeCartItemMutation] = useMutation(RemoveCartItemMutation, {
    refetchQueries: ['UserQuery', 'cart'],
  });

  const removeCartItem = async ({ itemId }) => {
    await removeCartItemMutation({ variables: { itemId } });
  };

  return {
    removeCartItem,
  };
};

export default useRemoveCartItemMutation;
