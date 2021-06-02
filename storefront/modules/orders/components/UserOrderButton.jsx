import Link from 'next/link';
import { useIntl } from 'react-intl';
import ROUTES_CONFIG from '../../common/utils/getRouteConfig';

import useUserOrderOrderList from '../hooks/useUserOrderList';

const OrderButton = () => {
  const { orders } = useUserOrderOrderList();
  const intl = useIntl();
  if (orders.length === 0) return null;

  return (
    <Link
      href={`/${intl.formatMessage({
        id: ROUTES_CONFIG.order.slug,
      })}`}
    >
      <a className="ml-2 button button--secondary">
        {intl.formatMessage({ id: 'my_orders' })}
      </a>
    </Link>
  );
};

export default OrderButton;
