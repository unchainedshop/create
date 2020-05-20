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
            '-webkit-appearance': '-apple-pay-button',
          }}
          onClick={handlePayment}
        ></button>
      );
    } else if (isGeneralPaymentAvailable) {
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
  } catch (e) {}
  return null;
};

export default WebPayment;
