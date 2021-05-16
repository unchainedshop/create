import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import OrderList from '../../modules/orders/components/OrderList';
import useOrderList from '../../modules/orders/hooks/useUserOrderList';

const Order = () => {
  const { orders, loading } = useOrderList();

  if (loading) return <p> loading .... </p>;
  return (
    <div>
      <Header />
      <OrderList orders={orders} />
      <Footer />
    </div>
  );
};

export default Order;
