import Link from 'next/link';

import formatDate from '../../common/utils/formatDate';
import renderPrice from '../../common/utils/renderPrice';

const OrderList = ({ orders }) => {
  return (
    <div className="table-responsive container mt-5">
      <table className="table table-bordered table-hover text-center table-striped">
        <thead>
          <tr>
            <th>Order number</th>
            <th>Created</th>
            <th>Delivery method</th>
            <th>Payment method</th>
            <th>Payment status</th>
            <th>total</th>
            <th>Country</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Link href="/order/[id]" as={`/order/${order._id}`} key={order._id}>
              <tr>
                <td className="font-weight-bolder p-2">{order.orderNumber}</td>
                <td className="p-2"> {formatDate(order.created)} </td>
                <td className="p-2">{order.delivery.provider.type} </td>
                <td className="p-2">
                  {' '}
                  {order.supportedPaymentProviders[0].type}
                </td>
                <td
                  className={`p-2 font-weight-bolder ${
                    order?.payment?.status === 'PAID'
                      ? 'text-success'
                      : 'text-warning'
                  }`}
                >
                  {order.payment.status}{' '}
                </td>
                <td className="p-2"> {renderPrice(order.total)}</td>
                <td className="p-2">
                  {order.country.name}
                  <span>{order.country.flagEmoji}</span>
                </td>
                <td
                  className={`p-2 font-weight-bolder ${
                    order?.status === 'CONFIRMED'
                      ? 'text-success'
                      : 'text-warning'
                  }`}
                >
                  {order.status}{' '}
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
