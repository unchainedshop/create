import Link from 'next/link';

import useOrderListQuery from '../hooks/useUserOrderListQuery';

const OrderList = () => {
  const { orders, loading } = useOrderListQuery();

  if (loading) return <p> loading .... </p>;

  return (
    <div className="container">
      <div className="row">
        {orders.map((order) => (
          <div className="col-sm-12" key={order._id}>
            <Link href="/order/[id]" as={`/order/${order._id}`}>
              <a className="card">
                <h5 className="card-header">
                  Order Number: {order.orderNumber}
                </h5>
                <div className="card-body">
                  <h5 className="card-title">
                    Created: {new Date(order.created).toISOString()}
                  </h5>
                  <dl>
                    <dt>Delivery type</dt>
                    <dd>{order.delivery.provider.type}</dd>
                    <dt>Payment type</dt>
                    <dd>{order.supportedPaymentProviders[0].type}</dd>

                    <dt>Payment status</dt>
                    <dd>{order.payment.status}</dd>
                    <dt>Total</dt>
                    <dd>
                      {order.total.amount} {order.total.currency}
                    </dd>
                    <dt>Country</dt>
                    <dd>
                      {order.country.name}
                      <span>{order.country.flagEmoji}</span>
                    </dd>
                  </dl>
                  <p className="color-brand">{order.status}</p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
