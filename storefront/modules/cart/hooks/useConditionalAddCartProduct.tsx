import useLoginAsGuestMutation from '../../auth/hooks/useLoginAsGuest';
import useUserQuery from '../../auth/hooks/useUser';
import useAddCartProduct from './useAddCartProduct';

const useConditionalAddCartProduct = () => {
  const { loginAsGuest } = useLoginAsGuestMutation();
  const { addCartProduct } = useAddCartProduct();
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

export default useConditionalAddCartProduct;
