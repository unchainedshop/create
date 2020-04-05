import { PaymentProviderType } from 'meteor/unchained:core-payment';

const { DATATRANS_MERCHANT_ID } = process.env;

export default {
  paymentProviders: [
    {
      _id: 'datatrans',
      adapterKey: 'shop.unchained.datatrans',
      type: PaymentProviderType.GENERIC,
      configuration: [
        { key: 'merchantId', value: DATATRANS_MERCHANT_ID },
        { key: 'paymentmethod', value: 'VIS' },
        { key: 'paymentmethod', value: 'ECA' },
        { key: 'paymentmethod', value: 'PAP' },
        { key: 'paymentmethod', value: 'TWI' },
        { key: 'paymentmethod', value: 'PFC' },
      ],
    },
  ],
};
