import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import OrderDetailComponent from '../../modules/orders/components/OrderDetailComponent';

const OrderDetail = () => {
  return (
    <div>
      <Header />
      <OrderDetailComponent />
      <Footer />
    </div>
  );
};

export default OrderDetail;
