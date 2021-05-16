import { useRouter } from 'next/router';

import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import OrderDetailComponent from '../../modules/orders/components/OrderDetailComponent';
import useOrderDetail from '../../modules/orders/hooks/useOrderDetail';

const OrderDetail = () => {
  const router = useRouter();
  const { order, loading } = useOrderDetail({
    orderId: router.query?.id,
  });
  if (loading) return <p>loading .... </p>;
  return (
    <>
      <Header />
      <OrderDetailComponent order={order} />
      <Footer />
    </>
  );
};

export default OrderDetail;
