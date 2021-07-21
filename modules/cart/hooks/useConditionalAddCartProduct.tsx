import useLoginAsGuestMutation from '../../auth/hooks/useLoginAsGuest';
import useUser from '../../auth/hooks/useUser';
import useAddCartProduct from './useAddCartProduct';

const useConditionalAddCartProduct = () => {
  const { loginAsGuest } = useLoginAsGuestMutation();
  const { addCartProduct } = useAddCartProduct();
  const { user } = useUser();

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
