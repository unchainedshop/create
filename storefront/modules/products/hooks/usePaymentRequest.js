import { useApolloClient } from '@apollo/react-hooks';
import CartFragment from '../../cart/fragments/CartFragment';
import gql from 'graphql-tag';

const CART_QUERY = gql`
  query cart {
    me {
      _id
      cart {
        ...CartFragment
      }
    }
  }
  ${CartFragment}
`;

const moneyToAmount = (money) => {
  return {
    value: (money.amount / 100).toFixed(),
    currency: money.currency,
  };
};

const paymentAddressToUnchainedAddress = (paymentAddress) => ({
  firstName: paymentAddress.recipient,
  company: paymentAddress.organization,
  addressLine: paymentAddress.addressLine[0],
  addressLine2: paymentAddress.addressLine[1],
  postalCode: paymentAddress.postalCode,
  countryCode: paymentAddress.country,
  city: paymentAddress.city,
});

const queryCart = async (apolloClient) => {
  const { data } = await apolloClient.query({
    query: CART_QUERY,
  });
  return data?.me?.cart;
};

const buildPaymentDetailsFromCart = async (cart) => {
  return {
    total: {
      label: 'Total',
      amount: moneyToAmount(cart.total),
    },
    displayItems: [
      ...cart.items.map((item) => ({
        label: `${item.quantity}x ${item.product.texts.title}`,
        amount: moneyToAmount(item.total),
      })),
      {
        label: 'Liefergebühren',
        amount: moneyToAmount(cart.deliveryTotal),
      },
      {
        label: 'Zahlungsgebühren',
        amount: moneyToAmount(cart.paymentTotal),
      },
      {
        label: 'Davon MwSt.',
        amount: moneyToAmount(cart.taxesTotal),
      },
    ],
    shippingOptions: [
      {
        id: cart.delivery._id,
        label: 'Lieferung',
        amount: { value: '0.00', currency: 'CHF' },
        selected: true,
      },
    ],
  };
};

const createPaymentRequest = async ({ apolloClient, cart }) => {
  const paymentDetails = await buildPaymentDetailsFromCart(cart);
  const paymentOptions = {
    requestPayerName: true,
    requestPayerEmail: true,
    requestPayerPhone: true,
    requestShipping: true,
    shippingType: 'shipping',
  };
  const applePayMethod = {
    supportedMethods: 'https://apple.com/apple-pay',
    data: {
      version: 3,
      merchantIdentifier: 'merchant.rocks.unchained',
      merchantCapabilities: ['supports3DS', 'supportsCredit', 'supportsDebit'],
      supportedNetworks: ['mastercard', 'visa'],
      countryCode: 'CH',
    },
  };
  const request = new PaymentRequest(
    [applePayMethod],
    paymentDetails,
    paymentOptions,
  );

  request.onmerchantvalidation = function (event) {
    console.log(event);
    // https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/requesting_an_apple_pay_payment_session
    // const sessionPromise = fetchPaymentSession(event.validationURL);
    event.complete(/*sessionPromise*/);
  };

  request.onshippingoptionchange = function (event) {
    event.updateWith(async () => {
      const cart = await queryCart(apolloClient);
      return buildPaymentDetailsFromCart(cart);
    });
  };

  request.onshippingaddresschange = function (event) {
    event.updateWith(async () => {
      const cart = await queryCart(apolloClient);
      return buildPaymentDetailsFromCart(cart);
    });
  };
  return request;
};

const resolveIsApplePayAvailable = () => {
  try {
    return (
      typeof window !== 'undefined' &&
      window.ApplePaySession &&
      ApplePaySession.canMakePayments()
    );
  } catch (e) {
    return false;
  }
};

export default () => {
  const isApplePayAvailable = resolveIsApplePayAvailable();
  const apolloClient = useApolloClient();

  const showPaymentRequest = async () => {
    const cart = await queryCart(apolloClient);
    const request = await createPaymentRequest({
      cart,
      apolloClient,
    });
    const response = await request.show();
    console.log(response);

    try {
      await apolloClient.mutate({
        mutation: gql`
          mutation checkoutCart(
            $orderId: ID
            $orderDeliveryId: ID!
            $shippingAddress: AddressInput
            $billingAddress: AddressInput
            $contact: ContactInput
            $paymentContext: JSON
          ) {
            updateCart(
              orderId: $orderId
              billingAddress: $billingAddress
              contact: $contact
            ) {
              _id
            }
            updateOrderDeliveryShipping(
              orderDeliveryId: $orderDeliveryId
              address: $shippingAddress
            ) {
              _id
            }
            checkoutCart(paymentContext: $paymentContext) {
              ...CartFragment
            }
          }
          ${CartFragment}
        `,
        refetchQueries: ['cart'],
        awaitRefetchQueries: true,
        variables: {
          orderId: cart._id,
          orderDeliveryId: request.shippingOption,
          shippingAddress: paymentAddressToUnchainedAddress(
            request.shippingAddress,
          ),
          billingAddress: paymentAddressToUnchainedAddress(
            request.shippingAddress,
          ),
          paymentContext: response.details,
          contact: {
            emailAddress: response.payerEmail,
            telNumber: response.payerPhone,
          },
        },
      });
      // https://webkit.org/blog/8182/introducing-the-payment-request-api-for-apple-pay/
      //const status = null; // processResponse(response);
      response.complete('success');
    } catch (e) {
      console.error(e);
      response.complete('fail');
    }
  };

  return {
    isApplePayAvailable,
    showPaymentRequest,
    isGeneralPaymentAvailable: false,
  };
};
