import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import useOrderDetail from '../modules/orders/hooks/useOrderDetail';
import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import formatDate from '../modules/common/utils/formatDate';
import MetaTags from '../modules/common/components/MetaTags';

const ThankYou = () => {
  const router = useRouter();
  const intl = useIntl();

  if (!router.query.orderId) return '';
  const { order } = useOrderDetail({
    orderId: router.query?.orderId,
  });

  return (
    <>
      <MetaTags
        title={intl.formatMessage({ id: 'thank_you' })}
        description={intl.formatMessage({ id: 'thank_you_description' })}
      />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>{intl.formatMessage({ id: 'thank_you_header' })}</h1>
            <p>{intl.formatMessage({ id: 'thank_you_description' })}</p>
            <h4>
              {intl.formatMessage({ id: 'thank_you_order_number' })}
              {'  '}
              {order?.orderNumber}
            </h4>
            <p>
              {intl.formatMessage({ id: 'thank_you_order_date' })}
              {'  '}
              {formatDate(order?.created)}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ThankYou;
