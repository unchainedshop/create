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
                  Bestellnummer: {order.orderNumber}
                </h5>
                <div className="card-body">
                  <h5 className="card-title">
                    Erstellt: {new Date(order.created).toISOString()}
                  </h5>
                  <dl>
                    <dt>Lieferart</dt>
                    <dd>{order.delivery.provider.type}</dd>
                    <dt>Zahlungsart</dt>
                    <dd>{order.supportedPaymentProviders[0].type}</dd>

                    <dt>Zahlungsstatus</dt>
                    <dd>{order.payment.status}</dd>
                    <dt>Gesamt</dt>
                    <dd>
                      {order.total.amount} {order.total.currency}
                    </dd>
                    <dt>Land</dt>
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
