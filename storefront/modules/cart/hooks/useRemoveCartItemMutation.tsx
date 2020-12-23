import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

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
