import { useState } from 'react';
import { useIntl } from 'react-intl';
import usePayWithDatatrans from '../hooks/usePayWithDatatrans';

const DatatransPayment = ({ cart }) => {
  const intl = useIntl();
  const payWithDatatrans = usePayWithDatatrans();
  const [isPaymentButtonDisabled, setPaymentButtonDisabled] = useState(false);

  return (
    <button
      type="button"
      role="link"
      disabled={isPaymentButtonDisabled}
      className="button button--primary button--big w-100"
      onClick={async () => {
        setPaymentButtonDisabled(true);
        await payWithDatatrans(cart);
        setPaymentButtonDisabled(false);
      }}
    >
      {intl.formatMessage({ id: 'pay_now' })}
    </button>
  );
};

export default DatatransPayment;
