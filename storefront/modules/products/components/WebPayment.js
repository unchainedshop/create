/* eslint-disable no-undef */
import usePaymentRequest from '../hooks/usePaymentRequest';

const WebPayment = ({ onClick, onSuccess = null }) => {
  const {
    isApplePayAvailable,
    isGeneralPaymentAvailable,
    showPaymentRequest,
  } = usePaymentRequest();

  const handlePayment = async () => {
    const onClickResult = await onClick();
    const result = await showPaymentRequest(onClickResult);
    return onSuccess?.(result);
  };

  try {
    if (isApplePayAvailable) {
      return (
        <button
          style={{
            webkitAppearance: '-apple-pay-button',
          }}
          onClick={handlePayment}
        />
      );
    }
    if (isGeneralPaymentAvailable) {
      return (
        <button
          type="button"
          className="button button--primary button--big text-uppercase"
          onClick={handlePayment}
        >
          Payment Request API
        </button>
      );
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};

export default WebPayment;
