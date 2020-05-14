import { useRouter } from 'next/router';

import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import useOrderDetailQuery from '../../modules/orders/hooks/useOrderDetailQuery';

const OrderDetail = () => {
  const router = useRouter();

  const { order } = useOrderDetailQuery({ orderNumber: router.query.id });

  return (
    <div>
      <Header />
      <h2>Order Detail</h2>
      <code>{JSON.stringify(order)}</code>
      <Footer />
    </div>
  );
};

export default OrderDetail;
