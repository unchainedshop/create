import Link from 'next/link';

import useOrderListQuery from '../hooks/useUserOrderListQuery';

const OrderList = () => {
  const { orders } = useOrderListQuery();

  return (
    <div className="container">
      <div className="row">
        {orders.map((order) => (
          <div className="col-sm-6" key={order._id}>
            <Link href="/order/[id]" as={`/order/${order._id}`}>
              <a className="card">
                <h5 className="card-header">{order._id}</h5>
                <div className="card-body">
                  <h5 className="card-title">{order.created}</h5>
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
