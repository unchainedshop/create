import { useIntl } from 'react-intl';
import { useEffect } from 'react';
import useUser from '../modules/auth/hooks/useUser';
import useSetOrderPaymentProvider from '../modules/orders/hooks/setPaymentOrderProvider';
import DatatransStatusGate from '../modules/checkout/components/DatatransStatusGate';
import BityPayment from '../modules/checkout/components/BityPayment';
import DatatransPayment from '../modules/checkout/components/DatatransPayment';
import WireTransferPayment from '../modules/checkout/components/WireTransferPayment';

import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import ManageCart from '../modules/cart/components/ManageCart';
import DeliveryAddressEditable from '../modules/checkout/components/DeliveryAddressEditable';
import BillingAddressEditable from '../modules/checkout/components/BillingAddressEditable';
import useUpdateOrderDeliveryShipping from '../modules/checkout/hooks/useUpdateDeliveryShipping';
import useUpdateCart from '../modules/checkout/hooks/useUpdateCart';
import MetaTags from '../modules/common/components/MetaTags';
import LoadingItem from '../modules/common/components/LoadingItem';

const Review = () => {
  const { user, loading, refetch } = useUser();
  const intl = useIntl();

  const { setOrderPaymentProvider } = useSetOrderPaymentProvider();
  const { updateOrderDeliveryAddress } = useUpdateOrderDeliveryShipping();
  const { updateCart } = useUpdateCart();

  const setBillingSameAsDelivery = () => {
    updateCart({
      orderId: user?.cart?._id,
      billingAddress: {
        firstName: user?.cart?.deliveryInfo?.address?.firstName,
        lastName: user?.cart?.deliveryInfo?.address?.lastName,
        company: user?.cart?.deliveryInfo?.address?.company,
        addressLine: user?.cart?.deliveryInfo?.address?.addressLine,
        postalCode: user?.cart?.deliveryInfo?.address?.postalCode,
        city: user?.cart?.deliveryInfo?.address?.city,
        countryCode: user?.cart?.deliveryInfo?.address?.countryCode,
      },
    });
  };

  const selectPayment = async (providerId) => {
    await setOrderPaymentProvider({
      orderId: user.cart._id,
      paymentProviderId: providerId,
    });
  };

  const sameAsDeliveryChange = (event) => {
    if (event.target.checked) {
      if (user?.cart?.billingAddress) {
        setBillingSameAsDelivery();
      }
      updateOrderDeliveryAddress({
        orderDeliveryId: user?.cart?.deliveryInfo?._id,
        address: null,
        meta: null,
      });
    } else {
      updateOrderDeliveryAddress({
        orderDeliveryId: user?.cart?.deliveryInfo?._id,
        address: {
          firstName: user?.cart?.billingAddress?.firstName,
          lastName: user?.cart?.billingAddress?.lastName,
          company: user?.cart?.billingAddress?.company,
          addressLine: user?.cart?.billingAddress?.addressLine,
          postalCode: user?.cart?.billingAddress?.postalCode,
          city: user?.cart?.billingAddress?.city,
          countryCode: user?.cart?.billingAddress?.countryCode,
        },
        meta: null,
      });
    }
  };
  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <MetaTags title={intl.formatMessage({ id: 'order_review' })} />
      <Header />
      <div className="container mt-5">
        <div className="row">
          <DatatransStatusGate>
            {loading ? (
              <LoadingItem />
            ) : (
              <div className="col-lg-8 mb-5">
                <h2 className="mt-0 mb-5">
                  {`${intl.formatMessage({
                    id: 'checkout',
                  })} - ${intl.formatMessage({ id: 'order_review' })}`}
                </h2>
                <h4>{intl.formatMessage({ id: 'delivery_address' })}</h4>
                <DeliveryAddressEditable key={user._id} user={user} />

                <h4 className="mt-5">
                  {intl.formatMessage({ id: 'billing_address' })}
                </h4>

                <div className="form-check my-3">
                  <label
                    className="form-check-label mb-5 d-flex align-items-center "
                    htmlFor="same"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="same"
                      defaultChecked={
                        user?.cart?.deliveryInfo?.address === null
                      }
                      name="same"
                      onChange={sameAsDeliveryChange}
                    />
                    <span className="ml-3">
                      {intl.formatMessage({ id: 'same_as_delivery' })}
                    </span>
                  </label>
                </div>
                <BillingAddressEditable user={user} />
                {!user?.cart?.billingAddress ? (
                  ''
                ) : (
                  <>
                    <h4 className="mt-5">
                      {intl.formatMessage({ id: 'payment_method' })}
                    </h4>
                    <section className="">
                      {user?.cart?.supportedPaymentProviders.map(
                        (pamentProvider) => (
                          <div
                            key={pamentProvider._id}
                            className="form-check my-2 my-lg-1"
                          >
                            <label className="form-check-label d-flex align-items-center">
                              <input
                                type="radio"
                                className="form-check-input"
                                name="paymentmethods"
                                value={pamentProvider._id}
                                checked={
                                  pamentProvider._id ===
                                  user?.cart?.paymentInfo?.provider?._id
                                }
                                onChange={(e) => {
                                  e.preventDefault();
                                  selectPayment(pamentProvider._id);
                                }}
                              />
                              <span className="ml-3">
                                {intl.formatMessage({
                                  id: pamentProvider.interface?._id,
                                })}
                              </span>
                            </label>
                          </div>
                        ),
                      )}
                    </section>

                    <div className="mt-5">
                      {user?.cart?.paymentInfo?.provider?.interface?._id ===
                      'shop.unchained.invoice' ? (
                        <WireTransferPayment
                          setBillingSameAsDelivery={setBillingSameAsDelivery}
                          cart={user?.cart}
                        />
                      ) : (
                        ''
                      )}
                      {user?.cart?.paymentInfo?.provider?.interface?._id ===
                      'shop.unchained.datatrans' ? (
                        <DatatransPayment cart={user?.cart} />
                      ) : (
                        ''
                      )}
                      {user?.cart?.paymentInfo?.provider?.interface?._id ===
                      'shop.unchained.payment.bity' ? (
                        <BityPayment order={user?.cart} />
                      ) : (
                        ''
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="col-lg-4">
              <h2 className="mt-0 mb-5">
                {intl.formatMessage({ id: 'order_summary' })}
              </h2>
              <ManageCart user={user} />
            </div>
          </DatatransStatusGate>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Review;
