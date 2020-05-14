import Link from 'next/link';

import useOrderListQuery from '../hooks/useUserOrderListQuery';

const OrderList = () => {
  const { orders } = useOrderListQuery();

  return (
    <div className="container">
      <div className="row">
        {orders.map((order) => (
          <Link key={order._id} href="/order/[slug]" as={`/order/${order.id}`}>
            <code>{JSON.stringify(order)}</code>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
