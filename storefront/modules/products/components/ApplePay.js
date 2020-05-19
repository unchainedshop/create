import Link from 'next/link';

import useConditionalAddCartProductMutation from '../../cart/hooks/useConditionalAddCartProductMutation';

import useProductListQuery from '../hooks/useProductListQuery';
import getProductMediaUrl from '../utils/getProductMediaUrl';

const ApplePay = ({ productId }) => {
  const { conditionalAddCartProduct } = useConditionalAddCartProductMutation();
  const handleClick = (productId) => {
    conditionalAddCartProduct({ productId });
  };

  try {
    const isApplePayAvailable =
      typeof window !== 'undefined' &&
      window.ApplePaySession &&
      ApplePaySession.canMakePayments();

    if (isApplePayAvailable) {
      <button
        style={{
          '-webkit-appearance': '-apple-pay-button',
        }}
      ></button>;
    }
  } catch (e) {
    return null;
  }
};

export default ApplePay;
