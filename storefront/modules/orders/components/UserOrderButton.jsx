import Link from 'next/link';

import useUserOrderOrderListQuery from '../hooks/useUserOrderListQuery';

const OrderButton = () => {
  const { orders } = useUserOrderOrderListQuery();
  if (orders.length === 0) return null;

  return (
    <Link href="/order">
      <a className="color-brand">
        <h3 className="my-2 mr-2">Meine Bestellungen</h3>
      </a>
    </Link>
  );
};

export default OrderButton;
