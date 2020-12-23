import useLoginAsGuestMutation from '../../auth/hooks/useLoginAsGuestMutation';
import useUserQuery from '../../auth/hooks/useUserQuery';
import useAddCartProductMutation from './useAddCartProductMutation';

const useConditionalAddCartProductMutation = () => {
  const { loginAsGuest } = useLoginAsGuestMutation();
  const { addCartProduct } = useAddCartProductMutation();
  const { user } = useUserQuery();

  const conditionalAddCartProduct = async ({ productId }) => {
    if (!user?._id) {
      await loginAsGuest();
    }
    return addCartProduct({ productId });
  };

  return {
    conditionalAddCartProduct,
  };
};

export default useConditionalAddCartProductMutation;
