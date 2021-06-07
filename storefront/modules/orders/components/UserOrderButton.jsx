import Link from 'next/link';
import { useIntl } from 'react-intl';
import Icon from '../../common/components/Icon';

import useUserOrderOrderList from '../hooks/useUserOrderList';

const OrderButton = () => {
  const { orders } = useUserOrderOrderList();
  const intl = useIntl();
  if (orders.length === 0) return null;

  return (
    <Link href="/order">
      <a className="ml-3 d-flex align-items-center">
        <Icon className="icon--large mr-2" icon="receipt-slip" />
        {intl.formatMessage({ id: 'my_orders' })}
      </a>
    </Link>
  );
};

export default OrderButton;
