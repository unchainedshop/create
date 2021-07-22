import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import useCheckOutCart from '../../cart/hooks/useCheckOutCart';

const DatatransPayment = ({ cart, setBillingSameAsDelivery }) => {
  const intl = useIntl();
  const [isPaymentButtonDisabled, setPaymentButtonDisabled] = useState(false);
  const { checkOutCart } = useCheckOutCart();
  const router = useRouter();

  const checkout = async ({
    paymentContext = undefined,
    deliveryContext = undefined,
    orderContext = undefined,
  } = {}) => {
    if (cart?.deliveryInfo?.address === null) setBillingSameAsDelivery();
    await checkOutCart({
      orderId: cart._id,
      orderContext,
      paymentContext,
      deliveryContext,
    });

    router.replace({
      query: { orderId: cart._id, status: 'success' },
    });
  };

  return (
    <button
      type="button"
      role="link"
      disabled={isPaymentButtonDisabled}
      className="button button--primary button--big"
      onClick={async () => {
        setPaymentButtonDisabled(true);
        await checkout(cart);
        setPaymentButtonDisabled(false);
      }}
    >
      {intl.formatMessage({ id: 'confirm_purchase' })}
    </button>
  );
};

export default DatatransPayment;
