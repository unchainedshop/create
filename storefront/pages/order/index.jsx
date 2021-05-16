import LoadingItem from '../../modules/common/components/LoadingItem';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import OrderList from '../../modules/orders/components/OrderList';
import useOrderList from '../../modules/orders/hooks/useUserOrderList';

const Order = () => {
  const { orders, loading } = useOrderList();

  return (
    <>
      <Header />
      {loading ? <LoadingItem /> : <OrderList orders={orders} />}
      <Footer />
    </>
  );
};

export default Order;
