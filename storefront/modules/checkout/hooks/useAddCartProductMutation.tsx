import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const AddCartProductMutation = gql`
  mutation AddCartProduct($productId: ID!) {
    addCartProduct(productId: $productId) {
      total {
        amount
      }
    }
  }
`;

const useAddCartProductMutation = () => {
  const [addCartProductMutation] = useMutation(AddCartProductMutation);

  const addCartProduct = async ({ productId }) => {
    await addCartProductMutation({ variables: { productId } });
  };

  return {
    addCartProduct,
  };
};

export default useAddCartProductMutation;
