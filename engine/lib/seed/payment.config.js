import { PaymentProviderType } from 'meteor/unchained:core-payment';

export default {
  paymentProviders: [
    {
      _id: 'wiretransfer',
      adapterKey: 'shop.unchained.invoice',
      type: PaymentProviderType.INVOICE,
    },
    {
      _id: 'stripe-payment-provider',
      adapterKey: 'shop.unchained.payment.stripe',
      type: PaymentProviderType.GENERIC,
    },
    {
      _id: 'bity-payment-provider',
      adapterKey: 'shop.unchained.payment.bity',
      type: PaymentProviderType.GENERIC,
    },
    // {
    //   _id: 'stripe-alipay-payment-provider',
    //   adapterKey: 'shop.unchained.payment.stripe-charges',
    //   type: PaymentProviderType.GENERIC,
    // },
  ],
};
