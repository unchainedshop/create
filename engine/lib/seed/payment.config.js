import { PaymentProviderType } from 'meteor/unchained:core-payment';

export default {
  paymentProviders: [
    {
      _id: 'invoice-dev',
      adapterKey: 'shop.unchained.invoice',
      type: PaymentProviderType.INVOICE,
    },
  ],
};
