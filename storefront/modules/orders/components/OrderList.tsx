import Link from 'next/link';

import formatDate from '../../common/utils/formatDate';
import renderPrice from '../../common/utils/renderPrice';
import useOrderListQuery from '../hooks/useUserOrderListQuery';

import styles from './order.module.css';

const OrderList = () => {
  const { orders, loading } = useOrderListQuery();

  if (loading) return <p> loading .... </p>;

  return (
    <div className="table-responsive container mt-5">
      <table className="table table-bordered table-hover text-center table-striped">
        <thead>
          <tr>
            <th>Bestellnummer</th>
            <th>Erstellt</th>
            <th>Lieferart</th>
            <th>Zahlungsart</th>
            <th>Zahlungsstatus</th>
            <th>Gesamt</th>
            <th>Land</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Link key={order._id} href="/order/[id]" as={`/order/${order._id}`}>
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
                    order?.payment?.status == 'PAID'
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
                    order?.status == 'CONFIRMED'
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
