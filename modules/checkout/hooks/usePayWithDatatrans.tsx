import getConfig from 'next/config';
import { useRouter } from 'next/router';
import useSignForCheckout from './useSignForCheckout';

const { publicRuntimeConfig } = getConfig() || { publicRuntimeConfig: {} };

const buildLink = ({ sign, amount, currency, orderId, refno }) => {
  const merchantId = publicRuntimeConfig.DATATRANS_MERCHANT;

  const baseUrl = process.browser
    ? `${window.location.protocol}//${window.location.host}${window.location.pathname}`
    : '';

  const params = new URLSearchParams({
    useAlias: 'no',
    orderId,
    merchantId,
    refno,
    amount: String(amount),
    currency,
    sign,
    reqtype: 'NOA',
    uppWebResponseMethod: 'GET',
    successUrl: baseUrl,
    cancelUrl: baseUrl,
    errorUrl: baseUrl,
  });

  return `${publicRuntimeConfig.DATATRANS_ENDPOINT}?${params.toString()}`;
};

const usePayWithDatatrans = () => {
  const { signForCheckout } = useSignForCheckout();
  const router = useRouter();

  return async (cart) => {
    const orderPaymentId = cart?.paymentInfo?._id;
    const { amount, currency } = cart?.total;
    const sign = await signForCheckout({
      orderPaymentId,
      transactionContext: {},
    });
    const href = buildLink({
      sign,
      amount,
      currency,
      orderId: cart._id,
      refno: orderPaymentId,
    });

    router.push(href);
  };
};

export default usePayWithDatatrans;
