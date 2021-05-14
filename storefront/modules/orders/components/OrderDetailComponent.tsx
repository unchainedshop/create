import { useRouter } from 'next/router';
import Image from 'next/image';

import renderPrice from '../../common/utils/renderPrice';
import getProductMediaUrl from '../../products/utils/getProductMediaUrl';
import ListItem from '../../common/components/ListItem';
import formatDate from '../../common/utils/formatDate';
import useOrderDetail from '../hooks/useOrderDetail';

const OrderDetailComponent = () => {
  const router = useRouter();

  const { order, loading } = useOrderDetail({
    orderId: router.query.id,
  });
  if (loading) return <p>loading .... </p>;

  return (
    <div>
      <h2 className="text-center">Order details</h2>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <ListItem title="Bestellnummer" value={order.orderNumber} />
            {order.items.map((item) => (
              <div
                className="d-flex justify-content-between flex-wrap border-top py-2"
                key={item?._id}
              >
                <div className="cart-img mr-2">
                  <Image
                    src={`${
                      getProductMediaUrl(item.product) ||
                      '/static/img/sun-glass-placeholder.jpeg'
                    }`}
                    alt={item.product.texts.title}
                    layout="responsive"
                    objectFit="contain"
                    quality={100}
                    width="100px"
                    height="100px"
                  />
                </div>
                <div className="w-50 mr-2">
                  <div>
                    {item.quantity} x{item.product.texts.title}
                  </div>
                </div>
                <div className="font-weight-bold">
                  {renderPrice(item.total)}
                </div>
              </div>
            ))}
            <div className="text-right">
              <div className="border-top py-3 mt-0">
                <div className="d-flex flex-wrap justify-content-between">
                  <div className="font-weight-bolder">delivery</div>
                  <div className="font-weight-bolder">
                    {renderPrice(order.delivery.provider.simulatedPrice.price)}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="border-top py-3 mt-0">
                <div className="d-flex flex-wrap justify-content-between">
                  <div className="font-weight-bolder text-info">total</div>
                  <div className="font-weight-bolder font-heading text-info">
                    {renderPrice(order.total)}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="w-100-for-mobile w-50">
                <ListItem title="Status" value={order.status} />
                <ListItem
                  title="Zahlungsart"
                  value={order.supportedPaymentProviders[0].type}
                />
                <ListItem title="Zahlungsstatus" value={order.payment.status} />
                <ListItem
                  title="Lieferart"
                  value={order.supportedDeliveryProviders[0].type}
                />
                <ListItem title="Lieferstatus" value={order.delivery.status} />
              </div>
              <div className="w-100-for-mobile w-25">
                <ListItem title="Erstellt" value={formatDate(order.created)} />
                <ListItem title="Bestellt" value={formatDate(order.ordered)} />

                <ListItem
                  title="Land"
                  value={`${order.country.name}
                ${order.country.flagEmoji}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailComponent;
