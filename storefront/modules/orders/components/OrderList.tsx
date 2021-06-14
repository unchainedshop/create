import Link from 'next/link';
import { useIntl } from 'react-intl';

import renderPrice from '../../common/utils/renderPrice';

const OrderList = ({ orders }) => {
  const intl = useIntl();
  return (
    <div className="table-responsive container mt-5">
      <h1>Orders</h1>
      <table className="table table-bordered table-hover text-center table-striped">
        <thead>
          <tr>
            <th className="p-3">
              {intl.formatMessage({ id: 'order_number' })}
            </th>
            <th className="p-3">{intl.formatMessage({ id: 'created' })}</th>
            <th className="p-3">
              {intl.formatMessage({ id: 'delivery_method' })}
            </th>
            <th className="p-3">
              {intl.formatMessage({ id: 'payment_method' })}
            </th>
            <th className="p-3">
              {intl.formatMessage({ id: 'payment_status' })}
            </th>
            <th className="p-3">{intl.formatMessage({ id: 'total' })}</th>
            <th className="p-3">{intl.formatMessage({ id: 'country' })}</th>
            <th className="p-3">{intl.formatMessage({ id: 'status' })}</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Link
              href="/orders/[_id]"
              as={`/orders/${order._id}`}
              key={order._id}
            >
              <tr>
                <td className="font-weight-bolder p-3">{order.orderNumber}</td>
                <td className="p-3"> {intl.formatDate(order.created)} </td>
                <td className="p-3">{order.delivery.provider.type} </td>
                <td className="p-3">
                  {' '}
                  {order.supportedPaymentProviders[0].type}
                </td>
                <td
                  className={`p-3 font-weight-bolder ${
                    order?.payment?.status === 'PAID'
                      ? 'pill-success'
                      : 'pill-warning'
                  }`}
                >
                  <span className="pill px-2 py-1">{order.payment.status}</span>
                </td>
                <td className="p-3"> {renderPrice(order.total)}</td>
                <td className="p-3">
                  {order.country.name}
                  <span>{order.country.flagEmoji}</span>
                </td>
                <td
                  className={`p-3 font-weight-bolder ${
                    order?.status === 'CONFIRMED'
                      ? 'pill-success'
                      : 'pill-warning'
                  }`}
                >
                  <span className="pill px-2 py-1">{order.status}</span>
                </td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
