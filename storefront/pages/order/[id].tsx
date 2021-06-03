import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import LoadingItem from '../../modules/common/components/LoadingItem';
import MetaTags from '../../modules/common/components/MetaTags';
import ROUTES_CONFIG from '../../modules/common/utils/getRouteConfig';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';
import OrderDetailComponent from '../../modules/orders/components/OrderDetailComponent';
import useOrderDetail from '../../modules/orders/hooks/useOrderDetail';
import NotFound from '../404';

const OrderDetail = () => {
  const router = useRouter();
  const intl = useIntl();
  const { order, loading } = useOrderDetail({
    orderId: router.query?.id,
  });

  useEffect(() => {
    const actualRoute = `/${intl.formatMessage({
      id: ROUTES_CONFIG.order.slug,
    })}/${router.query?.id}`;
    if (router.asPath !== actualRoute) router.replace(actualRoute);
  }, []);

  if (!order && !loading)
    return <NotFound page={intl.formatMessage({ id: 'order' })} />;
  return (
    <>
      <MetaTags
        title={`${intl.formatMessage({ id: 'order' })}: ${order?.orderNumber}`}
      />
      <Header />
      {loading ? <LoadingItem /> : <OrderDetailComponent order={order} />}
      <Footer />
    </>
  );
};

export default OrderDetail;
