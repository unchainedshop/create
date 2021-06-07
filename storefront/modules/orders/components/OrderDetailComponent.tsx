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
        <div className="col-sm-12">
          <ListItem title="Order no." value={order?.orderNumber} />
          {order?.items.map((item) => (
            <div
              className="d-flex justify-content-between flex-wrap border-top py-2"
              key={item?._id}
            >
              <div className="d-flex">
                <div className="cart-img mr-2">
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
                  <div>
                    {item.quantity} x {item.product.texts.title}
                  </div>
                </div>
              </div>
              <div className="font-weight-bold my-2">
                {renderPrice(item.total)}
              </div>
            </div>
          ))}
          <div className="text-right">
            <div className="border-top py-3 mt-0">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="font-weight-bolder">
                  {intl.formatMessage({ id: 'delivery' })}
                </div>
                <div className="font-weight-bolder">
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
                <div className="font-weight-bolder">
                  {intl.formatMessage({ id: 'total' })}
                </div>
                <div className="font-weight-bolder font-heading">
                  {renderPrice(order?.total)}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap mt-5">
            <div className="w-100-for-mobile w-50">
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
              <ListItem
                title="Delivery status"
                value={order?.delivery?.status}
              />
            </div>
            <div className="w-100-for-mobile w-25">
              <ListItem
                title="Created"
                value={intl.formatDate(order?.created)}
              />
              <ListItem
                title="Ordered"
                value={intl.formatDate(order?.ordered)}
              />

              <ListItem
                title="Country"
                value={`${order?.country.name}
              ${order?.country.flagEmoji}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailComponent;
