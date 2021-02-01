import { DeliveryProviderType } from 'meteor/unchained:core-delivery';

export default {
  deliveryProviders: [
    {
      id: 'send-message',
      adapterKey: 'shop.unchained.delivery.send-message',
      type: DeliveryProviderType.SHIPPING,
    },
  ],
};
