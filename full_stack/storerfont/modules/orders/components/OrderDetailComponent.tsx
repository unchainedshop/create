import Image from 'next/image';
import { useIntl } from 'react-intl';

import renderPrice from '../../common/utils/renderPrice';
import ListItem from '../../common/components/ListItem';
import getMediaUrl from '../../common/utils/getMediaUrl';

const OrderDetailComponent = ({ order }) => {
  const intl = useIntl();
  return (
    <div className="container mt-5">
      <h1>{intl.formatMessage({ id: 'order_details' })}</h1>
      <div className="row">
        <div className="col-lg-6">
          <ListItem title="Order no." value={order?.orderNumber} />
          {order?.items.map((item) => (
            <div
              className="d-flex align-items-center justify-content-between flex-wrap border-top py-2"
              key={item?._id}
            >
              <div className="d-flex align-items-center">
                <div className="mr-2" style={{ width: 100 }}>
                  <Image
                    src={`${
                      getMediaUrl(item.product) ||
                      '/static/img/sun-glass-placeholder.jpeg'
                    }`}
                    alt={item.product.texts.title}
                    layout="responsive"
                    objectFit="contain"
                    quality={100}
                    width="350px"
                    height="350px"
                  />
                </div>
                <div className="m-2">
                  {item.quantity} x {item.product.texts.title}
                </div>
              </div>
              <div className="my-2">{renderPrice(item.total)}</div>
            </div>
          ))}
          <div className="text-right">
            <div className="border-top py-3 mt-0">
              <div className="d-flex flex-wrap justify-content-between">
                <div>{intl.formatMessage({ id: 'delivery' })}</div>
                <div>
                  {renderPrice(
                    order?.delivery?.provider?.simulatedPrice?.price,
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="border-top py-3 mt-0">
              <div className="d-flex flex-wrap justify-content-between">
                <div>{intl.formatMessage({ id: 'total' })}</div>
                <div>{renderPrice(order?.total)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <ListItem title="Status" value={order?.status} />
          <ListItem
            title="Payment method"
            value={order?.supportedPaymentProviders[0]?.type}
          />
          <ListItem title="Payment status" value={order?.payment?.status} />
          <ListItem
            title="Delivery method"
            value={order?.supportedDeliveryProviders[0]?.type}
          />
          <ListItem title="Delivery status" value={order?.delivery?.status} />
          <ListItem title="Created" value={intl.formatDate(order?.created)} />
          <ListItem title="Ordered" value={intl.formatDate(order?.ordered)} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailComponent;
