import { useRouter } from 'next/router';

import useOrderDetail from '../modules/orders/hooks/useOrderDetail';

import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import formatDate from '../modules/common/utils/formatDate';

const ThankYou = () => {
  const router = useRouter();
  if (!router.query.orderId) return '';
  const { order } = useOrderDetail({
    orderId: router.query?.orderId,
  });

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>Thank You for Placing this Order with Us!</h1>
            <p>
              It has reached us and an email with the order placement
              confirmation is on its way. To avoid any potential
              miscommunication, please check your spam, perhaps the email landed
              there.
            </p>
            <h4>Your Order Number is: {order?.orderNumber}</h4>
            <p>
              The Date you placed the order is: {formatDate(order?.created)}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ThankYou;
