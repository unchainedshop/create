import Link from 'next/link';
import { useIntl } from 'react-intl';

import useUserOrderOrderList from '../hooks/useUserOrderList';

const OrderButton = () => {
  const { orders } = useUserOrderOrderList();
  const intl = useIntl();
  if (orders.length === 0) return null;

  return (
    <Link href="/order">
      <a className="d-inline-block nav--main__item">
        {intl.formatMessage({ id: 'my_orders' })}
      </a>
    </Link>
  );
};

export default OrderButton;
