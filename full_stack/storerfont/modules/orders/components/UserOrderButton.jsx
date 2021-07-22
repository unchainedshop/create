import Link from 'next/link';
import { useIntl } from 'react-intl';
import Icon from '../../common/components/Icon';

import useUserOrderOrderList from '../hooks/useUserOrderList';

const OrderButton = () => {
  const { orders } = useUserOrderOrderList();
  const intl = useIntl();
  if (orders.length === 0) return null;

  return (
    <Link href="/orders">
      <a className="d-flex align-items-center">
        <Icon className="mr-2" icon="common-file-stack" />
        <span className="hide-on-mobile">
          {intl.formatMessage({ id: 'my_orders' })}
        </span>
      </a>
    </Link>
  );
};

export default OrderButton;
