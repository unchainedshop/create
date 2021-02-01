import { PaymentProviderType } from 'meteor/unchained:core-payment';

export default {
  paymentProviders: [
    {
      _id: 'wiretransfer',
      adapterKey: 'shop.unchained.invoice',
      type: PaymentProviderType.INVOICE,
    },
  ],
};
