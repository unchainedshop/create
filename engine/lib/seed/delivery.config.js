import { DeliveryProviderType } from 'meteor/unchained:core-delivery';

export default {
  deliveryProviders: [
    {
      id: 'manual',
      adapterKey: 'shop.unchained.manual',
      type: DeliveryProviderType.DELIVERY,
    },
  ],
};
