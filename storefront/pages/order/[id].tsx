import { useRouter } from 'next/router';

import Footer from '../../modules/layout/components/Footer';
import getProductMediaUrl from '../../modules/products/utils/getProductMediaUrl';
import Header from '../../modules/layout/components/Header';
import useOrderDetailQuery from '../../modules/orders/hooks/useOrderDetailQuery';

const OrderDetail = () => {
  const router = useRouter();

  const { order, loading } = useOrderDetailQuery({ orderId: router.query.id });
  if (loading) return <p>loading .... </p>;
  console.log(order.items);

  return (
    <div>
      <Header />
      <h2 className="text-center">Order Detail</h2>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <dl>
              <dt>Order Number</dt>
              <dd>{order.orderNumber}</dd>
              <dt>Created</dt>
              <dd>{new Date(order.created).toISOString()}</dd>
              <dt>Ordered</dt>
              <dd>{new Date(order.ordered).toISOString()}</dd>
              <dt>Status</dt>
              <dd>{order.status}</dd>
              <dt>Payment type</dt>
              <dd>{order.supportedPaymentProviders[0].type}</dd>
              <dt>Payment Status</dt>
              <dd>{order.payment.status}</dd>
              <dt>Delivery type</dt>
              <dd>{order.supportedDeliveryProviders[0].type}</dd>
              <dt>Delivery Status</dt>
              <dd>{order.delivery.status}</dd>
              <dt>Total Amount</dt>
              <dd>{order.total.amount}</dd>
              <dt>Country</dt>
              <dd>
                {order.country.name}
                {order.country.flagEmoji}
              </dd>
            </dl>
          </div>
          <div className="col-sm-6">
            <div className="row">
              {order.items.map((item, i) => (
                <div className="col-sm-6" key={i}>
                  <h3 className="px-2 my-3">{item?.product?.texts?.title}</h3>
                  <img src={getProductMediaUrl(item.product)} />
                  <div className="p-2">
                    <h4 className="my-0">
                      {item?.total.currency}{' '}
                      {item?.total.amount * item?.quantity}
                    </h4>
                    <h4 className="mb-0">{item?.product?.texts?.subtitle}</h4>
                    <p>{item?.texts?.description?.split('\n')[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderDetail;
