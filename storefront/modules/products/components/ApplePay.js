import Link from 'next/link';

import useConditionalAddCartProductMutation from '../../cart/hooks/useConditionalAddCartProductMutation';

import useProductListQuery from '../hooks/useProductListQuery';
import getProductMediaUrl from '../utils/getProductMediaUrl';

const ApplePay = ({ productId }) => {
  const { conditionalAddCartProduct } = useConditionalAddCartProductMutation();
  const handleClick = async (productId) => {
    conditionalAddCartProduct({ productId });

    const paymentDetails = {
      total: {
        label: 'Currybag',
        amount: { value: '27.50', currency: 'USD' },
      },
      displayItems: [
        // {
        //   label: 'Tax',
        //   amount: { value: '2.50', currency: 'USD' },
        // },
        // {
        //   label: 'Ground Shipping',
        //   amount: { value: '5.00', currency: 'USD' },
        // },
      ],
      shippingOptions: [
        //   {
        //     id: 'ground',
        //     label: 'Ground Shipping',
        //     amount: { value: '5.00', currency: 'USD' },
        //     selected: true,
        //   },
        //   // {
        //   //   id: 'express',
        //   //   label: 'Express Shipping',
        //   //   amount: { value: '10.00', currency: 'USD' },
        //   // },
      ],
    };
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
        version: 6,
        merchantIdentifier: 'merchant.rocks.unchained',
        merchantCapabilities: [
          'supports3DS',
          'supportsCredit',
          'supportsDebit',
        ],
        supportedNetworks: ['amex', 'discover', 'masterCard', 'visa'],
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
      // Compute new payment details based on the selected shipping option.
      // const detailsUpdatePromise = computeDetails();
      event.updateWith(/*detailsUpdatePromise*/);
    };

    request.onshippingaddresschange = function (event) {
      // Compute new payment details based on the selected shipping address.
      // const detailsUpdatePromise = computeDetails();
      event.updateWith(/*detailsUpdatePromise*/);
    };

    const response = await request.show();
    // https://webkit.org/blog/8182/introducing-the-payment-request-api-for-apple-pay/
    //const status = null; // processResponse(response);
    response.complete('failure');
  };

  try {
    const isApplePayAvailable =
      typeof window !== 'undefined' &&
      window.ApplePaySession &&
      ApplePaySession.canMakePayments();

    if (isApplePayAvailable) {
      return (
        <button
          style={{
            '-webkit-appearance': '-apple-pay-button',
          }}
          onClick={handleClick}
        ></button>
      );
    }
  } catch (e) {
    throw e;
    return null;
  }
  return null;
};

export default ApplePay;
