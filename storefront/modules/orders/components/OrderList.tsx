import Link from 'next/link';

import useOrderListQuery from '../hooks/useUserOrderListQuery';
import styles from './order.module.css';
const OrderList = () => {
  const { orders, loading } = useOrderListQuery();

  if (loading) return <p> loading .... </p>;

  return (
    <div className="container">
      <div className="row">
        <table id={styles.order}>
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
              <Link href="/order/[id]" as={`/order/${order._id}`}>
                <tr>
                  <td className="font-weight-bolder">{order.orderNumber}</td>
                  <td> {new Date(order.created).toISOString()} </td>
                  <td>{order.delivery.provider.type} </td>
                  <td> {order.supportedPaymentProviders[0].type}</td>
                  <td
                    className={`font-weight-bolder ${
                      order.payment.status == 'PAID'
                        ? 'text-success'
                        : 'text-warning'
                    }`}
                  >
                    {order.payment.status}{' '}
                  </td>
                  <td>
                    {' '}
                    {order.total.amount} {order.total.currency}
                  </td>
                  <td>
                    {order.country.name}
                    <span>{order.country.flagEmoji}</span>
                  </td>
                  <td
                    className={`font-weight-bolder  ${
                      order.status == 'CONFIRMED'
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
    </div>
  );
};

export default OrderList;
