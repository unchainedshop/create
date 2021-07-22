import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useOrderDetail from '../../orders/hooks/useOrderDetail';

export interface DatatransStatusGateProps {}

const getPercentage = (order, loading, status) => {
  return (order?.orderNumber ? 50 : 0) + (status === 'success' ? 50 : 0);
};

const DatatransStatusGate: React.FC<DatatransStatusGateProps> = ({
  children,
}) => {
  const { query, push } = useRouter();

  const { orderId, status, errorMessage, errorCode } = query ?? {}; // status might get passed from datatrans

  const { order, loading, refetch } = useOrderDetail({
    orderId,
  });

  const percentage = getPercentage(order, loading, status);

  useEffect(() => {
    if (status === 'success' && order?.orderNumber) {
      push(`/thank-you?orderId=${order._id}`);
    }
  }, [status, order]);

  useEffect(() => {
    if (order && !order.orderNumber && !loading) {
      setTimeout(() => {
        refetch();
      }, 3000);
    }
  }, [order, loading]);

  if (status === 'success') {
    return (
      <div>
        Verifying transaction
        <br />
        <progress max="100" value={percentage} />
      </div>
    );
  }
  return (
    <>
      {status && errorCode ? (
        <div className="col-lg-12 form-error">
          <h2 className="mt-0 mb-5">{status}:</h2>
          {errorMessage} ({errorCode})
        </div>
      ) : null}
      {children}
    </>
  );
};

export default React.memo(DatatransStatusGate);
