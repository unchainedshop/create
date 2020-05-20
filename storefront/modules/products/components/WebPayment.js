import useConditionalAddCartProductMutation from '../../cart/hooks/useConditionalAddCartProductMutation';
import usePaymentRequest from '../hooks/usePaymentRequest';

const WebPayment = ({ productId }) => {
  const { conditionalAddCartProduct } = useConditionalAddCartProductMutation();
  const { isApplePayAvailable, showPaymentRequest } = usePaymentRequest();

  const handleClick = async () => {
    await conditionalAddCartProduct({ productId });
    const result = await showPaymentRequest();
    console.log(result);
    return;
  };

  try {
    if (isApplePayAvailable) {
      return (
        <button
          style={{
            '-webkit-appearance': '-apple-pay-button',
          }}
          onClick={handleClick}
        ></button>
      );
    } else {
      return <button onClick={handleClick}>Pay</button>;
    }
  } catch (e) {}
};

export default WebPayment;
