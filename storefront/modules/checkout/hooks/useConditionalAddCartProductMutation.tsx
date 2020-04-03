import useLoginAsGuestMutation from '../../auth/hooks/useLoginAsGuestMutation';
import useAddCartProductMutation from './useAddCartProductMutation';

/**
 * If user is not logged in, create a guest user
 * TODO: This logic
 */
const useConditionalAddCartProductMutation = () => {
  const { loginAsGuest } = useLoginAsGuestMutation();
  const { addCartProduct } = useAddCartProductMutation();

  const conditionalAddCartProduct = async ({ productId }) => {
    if (window && !window.localStorage.getItem('token')) {
      await loginAsGuest();
    }

    return addCartProduct({ productId });
  };

  return {
    conditionalAddCartProduct,
  };
};

export default useConditionalAddCartProductMutation;
