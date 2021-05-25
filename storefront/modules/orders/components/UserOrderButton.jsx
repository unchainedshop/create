import Link from 'next/link';

import useUserOrderOrderList from '../hooks/useUserOrderList';

const OrderButton = () => {
  const { orders } = useUserOrderOrderList();
  if (orders.length === 0) return null;

  return (
    <Link href="/order">
      <a className="d-inline-block nav--main__item">My Orders</a>
    </Link>
  );
};

export default OrderButton;
