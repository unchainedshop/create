import Link from 'next/link';

import useOrderListQuery from '../hooks/useUserOrderListQuery';
const orders = [
  {
    status: 'Active',
    created: new Date().toString(),
    orderNumber: '001',
    total: {
      amount: 100,
      currency: 'CHY',
    },
    payment: {
      status: 'PAID',
      paid: true,
      fee: {
        amount: 100,
        currency: 'CHY',
      },
    },
  },
  {
    status: 'Active',
    created: new Date().toString(),
    orderNumber: '002',
    total: {
      amount: 100,
      currency: 'CHY',
    },
    payment: {
      status: 'PAID',
      paid: true,
      fee: {
        amount: 100,
        currency: 'CHY',
      },
    },
  },
  {
    status: 'Active',
    created: new Date().toString(),
    orderNumber: '003',
    total: {
      amount: 100,
      currency: 'CHY',
    },
    payment: {
      status: 'PAID',
      paid: true,
      fee: {
        amount: 100,
        currency: 'CHY',
      },
    },
  },
  {
    status: 'Active',
    created: new Date().toString(),
    orderNumber: '004',
    total: {
      amount: 100,
      currency: 'CHY',
    },
    payment: {
      status: 'PAID',
      paid: true,
      fee: {
        amount: 100,
        currency: 'CHY',
      },
    },
  },
];

const OrderList = () => {
  /* const { orders } = useOrderListQuery(); */

  return (
    <div className="container">
      <div className="row">
        {orders.map((order) => (
          <div className="col-sm-6">
            <Link
              key={order.orderNumber}
              href="/order/[slug]"
              as={`/order/${order.orderNumber}`}
            >
              <div className="card">
                <h5 className="card-header">{order.orderNumber}</h5>
                <div className="card-body">
                  <h5 className="card-title">{order.created}</h5>
                  <p className="color-brand">{order.status}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
